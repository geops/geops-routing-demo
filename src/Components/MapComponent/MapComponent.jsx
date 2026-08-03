import { Box, Snackbar } from '@mui/material';
import { MaplibreLayer } from 'mobility-toolbox-js/ol';
import { Feature, Map } from 'ol';
import { touchOnly } from 'ol/events/condition';
import { containsExtent } from 'ol/extent';
import GeoJSON from 'ol/format/GeoJSON';
import {
  defaults as defaultInteractions,
  Modify,
  Translate,
} from 'ol/interaction';
import { Group, Layer, Vector as VectorLayer } from 'ol/layer';
import { unByKey } from 'ol/Observable';
import { Vector as VectorSource } from 'ol/source';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import BasicMap from 'react-spatial/components/BasicMap';
import Copyright from 'react-spatial/components/Copyright';

import {
  lineStyleFunction,
  pointStyleFunction,
} from '../../config/styleConfig';
import {
  BARRIERFREE_SEARCH_MODE,
  DACH_EXTENT,
  EUROPE_EXTENT,
} from '../../constants';
import LevelLayer from '../../layers/LevelLayer';
import * as actions from '../../store/actions';
import {
  propTypeCoordinates,
  propTypeCurrentStops,
  propTypeCurrentStopsGeoJSON,
} from '../../store/prop-types';
import { getGeneralization, graphs, to4326 } from '../../utils';
import getViaStrings from '../../utils/getViaStrings';
import FloorSwitcher from '../FloorSwitcher';
import MapFloorSwitcher from '../MapFloorSwitcher';
import RoutingMenu from '../RoutingMenu';
import YamlSnippetDialog from '../YamlSnippetDialog';

import 'ol/ol.css';

/**
 * The map props
 * @typedef MapComponentProps
 * @type {props}
 * @property {string} routingUrl The API routing url to be used for navigation.
 * @property {string} currentMot The current selected mot by user, example 'bus'.
 * @property {Object} currentStopsGeoJSON The current stops defined by user in geojson format inside a dictionary, key is the stop index(order) and the value is the geoJSON itself.
 * @property {function} dispatchShowNotification A store action that can be dispatched, takes the notification message and type as arguments.
 * @property {function} dispatchSetClickLocation A store action that can be dispatched, takes the clicked location on map array of [long,lat] and stores it in the store.
 * @property {string} searchMode The current search mode, example 'barrier-free'.
 * @category Props
 */

let abortController = new AbortController();

/**
 * The only true map that shows inside the application.
 * @category Map
 */
class MapComponent extends PureComponent {
  /**
   * Default constructor, gets called automatically upon initialization.
   * @param {...MapComponentProps} props Props received so that the component can function properly.
   * @category Map
   */
  constructor(props) {
    super(props);
    const { dispatchSetClickLocation, markerLayer, olMap, routingLayer } =
      this.props;
    this.map = olMap;
    this.hoveredRoute = null;
    this.initialRouteDrag = null;
    this.state = {
      hoveredPoint: null,
      hoveredStationName: null,
      isActiveRoute: false,
    };
    this.drawNewRoute = this.drawNewRoute.bind(this);
    this.loadBaseLayers = this.loadBaseLayers.bind(this);

    this.projection = 'EPSG:3857';
    this.format = new GeoJSON();
    this.formatFromLonLat = new GeoJSON({
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });
    this.routeVectorSource = routingLayer.getSource();
    this.markerVectorSource = markerLayer.getSource();
    routingLayer.setStyle((feature) => {
      const { activeFloor, currentMot } = this.props;
      return lineStyleFunction(
        currentMot,
        this.hoveredRoute === feature,
        feature.get('floor'),
        activeFloor,
        feature.get('graph'),
      );
    });

    this.loadBaseLayers();

    this.translateInteraction = new Translate({
      hitTolerance: 3,
      layers: [markerLayer],
    });

    this.translateInteraction.on('translatestart', (evt) => {
      [this.initialNodeDrag] = evt.features.getArray();
    });

    this.translateInteraction.on('translateend', (evt) => {
      const {
        currentStops,
        currentStopsGeoJSON,
        dispatchSetCurrentStops,
        dispatchSetCurrentStopsGeoJSON,
        dispatchSetTracks,
        tracks,
      } = this.props;

      const { id, name } = evt.features.getArray()[0].getProperties();
      let featureIndex;
      if (name) {
        // It's a station
        featureIndex = currentStops.indexOf(name);
      } else {
        // It's a coordinate
        featureIndex = currentStops.findIndex((element) => {
          return element.toString() === id;
        });
      }

      if (featureIndex === -1) {
        return;
      }

      currentStops[featureIndex] = evt.coordinate;

      tracks[featureIndex] = '';
      // Dont' set floor here, let FloorSelect the responsability to change it if the current floors is not in the avalbleLevels
      // floorInfo[featureIndex] = '0';
      currentStopsGeoJSON[featureIndex] = {
        geometry: {
          coordinates: evt.coordinate,
          type: 'Point',
        },
        properties: {
          id: evt.coordinate.toString(),
          type: 'coordinates',
        },
        type: 'Feature',
      };
      this.initialNodeDrag = null;
      dispatchSetTracks([...tracks]);
      // dispatchSetFloorInfo([...floorInfo]);
      dispatchSetCurrentStops([...currentStops]);
      dispatchSetCurrentStopsGeoJSON([...currentStopsGeoJSON]);
    });

    this.modifyInteraction = new Modify({
      pixelTolerance: 4,
      source: this.routeVectorSource,
      style: () => {
        const { currentMot } = this.props;
        return pointStyleFunction(currentMot);
      },
    });

    this.modifyInteraction.on('modifystart', (evt) => {
      // save start point to find where to add the new HOP!
      this.initialRouteDrag = {
        coordinate: evt.mapBrowserEvent.coordinate,
        features: evt.features.getArray(),
      };
      this.map.getTargetElement().style.cursor = 'grabbing';
    });

    this.modifyInteraction.on('modifyend', (evt) => {
      const {
        currentStops,
        currentStopsGeoJSON,
        dispatchSetCurrentStops,
        dispatchSetCurrentStopsGeoJSON,
        dispatchSetFloorInfo,
        dispatchSetTracks,
        floorInfo,
        tracks,
      } = this.props;
      let newHopIdx = -1;
      const { features } = this.initialRouteDrag;
      const { currentMot } = this.props;

      // In the case of the foot routing we can receive multiple line string between 2 hops (ex: one line string pro floor).
      // So we have to recreate the segment between 2 hops to be able to find the segment where to add the new hop.
      if (currentMot === 'foot') {
        // foot routing segments contain the start and end hop coordinates, we use them to find the hop index
        const closestSegmentStartCoord = features[0].get('src');
        const hop = this.markerVectorSource
          .getFeatures()
          .sort((a, b) => {
            return a.get('idx') - b.get('idx');
          })
          .findIndex((f) => {
            return (
              to4326(f.getGeometry().getCoordinates()).join() ===
              [
                parseFloat(closestSegmentStartCoord[0].toFixed(5)),
                parseFloat(closestSegmentStartCoord[1].toFixed(5)),
              ].join()
            );
          });
        if (hop >= 0) {
          newHopIdx = hop + 1;
        }
      } else {
        const flatCoords = features
          .map((f) => {
            return f.getGeometry();
          })
          .map((geom) => {
            return [...geom.getFirstCoordinate(), ...geom.getLastCoordinate()];
          });

        const multiLineSource = new VectorSource({
          features,
        });
        const closestSegment = multiLineSource
          .getClosestFeatureToCoordinate(this.initialRouteDrag.coordinate)
          .getGeometry();

        const closestEdges = [
          ...closestSegment.getFirstCoordinate(),
          ...closestSegment.getLastCoordinate(),
        ];

        flatCoords.forEach((segment, idx) => {
          if (
            segment.length === closestEdges.length &&
            segment.every((value, index) => {
              return value === closestEdges[index];
            })
          ) {
            newHopIdx = idx + 1;
          }
        });
      }

      if (newHopIdx >= 0) {
        tracks.splice(newHopIdx, 0, '');
        floorInfo.splice(newHopIdx, 0, '0');
        currentStops.splice(newHopIdx, 0, evt.mapBrowserEvent.coordinate);
        currentStopsGeoJSON.splice(newHopIdx, 0, {
          geometry: {
            coordinates: evt.mapBrowserEvent.coordinate,
            type: 'Point',
          },
          properties: {
            id: evt.mapBrowserEvent.coordinate.toString(),
            type: 'coordinates',
          },
          type: 'Feature',
        });

        dispatchSetTracks([...tracks]);
        dispatchSetFloorInfo([...floorInfo]);
        dispatchSetCurrentStops([...currentStops]);
        dispatchSetCurrentStopsGeoJSON([...currentStopsGeoJSON]);
      }
      this.initialRouteDrag = null;
      this.map.getTargetElement().style.cursor = 'auto';
    });

    const interactions = defaultInteractions().extend([
      this.modifyInteraction,
      this.translateInteraction,
    ]);
    interactions.getArray().forEach((interaction) => {
      this.map.addInteraction(interaction);
    });

    this.onZoomRouteClick = () => {
      let featExtent;
      if (this.routeVectorSource.getFeatures().length) {
        featExtent = this.routeVectorSource.getExtent();
      }

      if (
        featExtent.filter((f) => {
          return Number.isFinite(f);
        }).length === 4
      ) {
        this.map.getView().fit(this.routeVectorSource.getExtent(), {
          duration: 500,
          padding: [50, 50, 50, 50],
          size: this.map.getSize(),
        });
      }
    };

    this.onPanViaClick = this.onPanViaClick.bind(this);

    this.map.on('singleclick', (evt) => {
      const { currentStops, isFieldFocused } = this.props;
      // if one field empty or if a field is focused
      if (currentStops.includes('') || isFieldFocused) {
        dispatchSetClickLocation(evt.coordinate);
      }
    });
    this.initialize();
  }

  /**
   * Perform the necessary actions when receiving updated props.
   * If new stops are received, then remove any existing stops/routes and draw those stops/routes.
   * @category Map
   */
  componentDidUpdate(prevProps) {
    const {
      activeFloor,
      currentMot,
      currentStopsGeoJSON,
      dispatchSetActiveFloor,
      dispatchSetMaxExtent,
      floorInfo,
      generalizationActive,
      generalizationEnabled,
      generalizationGraph,
      geschosseLayer,
      searchMode,
      style,
      tracks,
      zoom,
    } = this.props;
    const currentMotChanged = currentMot && currentMot !== prevProps.currentMot;
    const tracksChanged = tracks !== prevProps.tracks;
    const floorInfoChanged = floorInfo !== prevProps.floorInfo;
    const searchModeChanged = searchMode !== prevProps.searchMode;
    const currentStopsGeoJSONChanged =
      currentStopsGeoJSON &&
      currentStopsGeoJSON !== prevProps.currentStopsGeoJSON;
    const activeFloorChanged = activeFloor !== prevProps.activeFloor;
    const zoomChanged = zoom !== prevProps.zoom;
    const generalizationGraphChanged =
      generalizationGraph !== prevProps.generalizationGraph;
    const generalizationStateChanged =
      generalizationActive !== prevProps.generalizationActive ||
      generalizationEnabled !== prevProps.generalizationEnabled;

    const styleChanged = style !== prevProps.style;

    if (generalizationStateChanged || styleChanged) {
      this.loadBaseLayers();
    }

    if (zoomChanged || currentMotChanged || generalizationStateChanged) {
      this.updateGeneralization();
    }

    if (generalizationGraphChanged) {
      this.drawNewRoute();
    }

    if (
      floorInfoChanged ||
      currentMotChanged ||
      currentStopsGeoJSONChanged ||
      searchModeChanged ||
      tracksChanged ||
      activeFloorChanged
    ) {
      this.markerVectorSource.clear();
      currentStopsGeoJSON.forEach((val) => {
        if (!val) {
          return;
        }
        const features = this.format.readFeatures(val);
        this.markerVectorSource.addFeatures(
          features.map((f) => {
            // We add the index when recreating the via array so we can find the index of the hop when drag-modifying
            f.set('idx', this.getHopIndex(f));
            return f;
          }),
        );
        if (currentMot === 'foot') {
          this.markerVectorSource.getFeatures().forEach((feature, idx) => {
            feature.setStyle(
              pointStyleFunction(currentMot, floorInfo[idx], activeFloor),
            );
          });
        } else {
          this.markerVectorSource.getFeatures().forEach((f) => {
            const pointStyle = pointStyleFunction(currentMot);
            f.setStyle(pointStyle);
          });
        }
      });
      // Remove the old route if exists
      this.routeVectorSource.clear();
      this.setIsActiveRoute(false);

      // Draw a new route if more than 1 stop is defined
      if (currentStopsGeoJSON.length > 1) {
        this.drawNewRoute();
      }

      if (currentMotChanged) {
        const isDev =
          new URL(window.location.href)?.searchParams?.get('api') === 'dev';
        dispatchSetMaxExtent(
          currentMot === 'foot' && !isDev ? DACH_EXTENT : EUROPE_EXTENT,
        );
      }

      if (
        currentMot &&
        currentMot !== prevProps.currentMot &&
        !geschosseLayer
          .getLayers()
          .getArray()
          .find((layer) => {
            return layer.name === `ch.sbb.geschosse2D`;
          }).visible
      ) {
        dispatchSetActiveFloor('2D');
      }
    }

    if (activeFloorChanged) {
      geschosseLayer.getLayers().forEach((layer) => {
        layer.visible = false;
      });
      const layer = geschosseLayer
        .getLayers()
        .getArray()
        .find((l) => {
          return l.name === `ch.sbb.geschosse${activeFloor}`;
        });
      if (layer) {
        layer.visible = true;
      }
    }
  }

  componentWillUnmount() {
    unByKey(this.modifyOverlayListener);
  }

  /**
   * After receiving the updated stops, send a call to the routingAPI to find a suitable route between
   * two points/stations, if a route is found, it's returned and drawn to the map.
   * @category Map
   */
  drawNewRoute(useElevation) {
    const {
      apiKey,
      currentMot,
      currentStopsGeoJSON,
      dispatchSetSelectedRoutes,
      dispatchShowLoadingBar,
      dispatchShowNotification,
      floorInfo,
      generalizationGraph,
      isRouteInfoOpen,
      resolveHops,
      routingUrl,
      searchMode,
      tracks,
    } = this.props;

    const hops = getViaStrings(currentStopsGeoJSON, currentMot, tracks);

    abortController.abort();
    abortController = new AbortController();

    if (hops.length < 2) {
      dispatchShowLoadingBar(false);
      dispatchSetSelectedRoutes([]);
      return Promise.resolve();
    }

    dispatchShowLoadingBar(true);
    this.routeVectorSource.clear();

    const fetchRoute = (graph, multi) => {
      const { signal } = abortController;
      const calculateElevation = !!(isRouteInfoOpen || useElevation);
      let reqUrl =
        `${routingUrl}` +
        `?via=${hops.join(
          '|',
        )}&mot=${currentMot}&resolve-hops=${resolveHops}&key=${apiKey}` +
        `&elevation=${calculateElevation ? 1 : 0}` +
        `&interpolate_elevation=${calculateElevation}` +
        `&length=true&coord-radius=100.0&coord-punish=1000.0` +
        `&barrierefrei=${searchMode === BARRIERFREE_SEARCH_MODE ? 'true' : 'false'}`;
      if (graph) {
        reqUrl += `&graph=${graph}`;
      }
      if (currentMot === 'foot') {
        reqUrl += `&levels=${floorInfo.join('|')}`;
      }
      return fetch(reqUrl, { signal })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          const { maxExtent } = this.props;
          dispatchShowLoadingBar(false);
          if (response.error) {
            dispatchShowNotification("Couldn't find route", 'error');
            dispatchSetSelectedRoutes([]);
            return;
          }
          // A route was found, prepare to draw it.
          const feats = this.formatFromLonLat.readFeatures(response);
          if (multi && feats.length === 1) {
            feats[0].set('graph', graph || 'osm');
            if (!graph) {
              // Set the ungeneralized toute for the route info profile
              dispatchSetSelectedRoutes(feats);
            }
          } else {
            dispatchSetSelectedRoutes(feats);
          }
          this.routeVectorSource.addFeatures(feats);

          if (!containsExtent(maxExtent, this.routeVectorSource.getExtent())) {
            // Throw error message, clear route and abort if the route is outside map max extent (e.g. when switching to foot routing)
            this.routeVectorSource.clear();
            dispatchShowNotification(
              'Defined route is outside map extent',
              'error',
            );
            return;
          }

          this.setIsActiveRoute(!!this.routeVectorSource.getFeatures().length);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            // eslint-disable-next-line no-console
            console.warn(`Abort ${reqUrl}`);
            return;
          }
          dispatchShowLoadingBar(false);
          dispatchSetSelectedRoutes([]);
          // It's important to rethrow all other errors so you don't silence them!
          // For example, any error thrown by setState(), will pass through here.
          throw err;
        });
    };

    if (generalizationGraph === 'all') {
      const allRoutes = (graphs[currentMot] || [null]).map((grph) => {
        return fetchRoute(grph, true);
      });

      return Promise.all(allRoutes);
    }

    return fetchRoute(generalizationGraph);
  }

  getHopIndex(markerFeature) {
    const { currentStops } = this.props;
    return currentStops.findIndex((element) => {
      const props = markerFeature.getProperties();
      return element.toString() === (props.name ? props.name : props.id);
    });
  }

  initialize() {
    const { routingLayer } = this.props;
    this.map.on('pointermove', (evt) => {
      if (
        touchOnly(evt) ||
        this.map.getView().getAnimating() ||
        this.map.getView().getInteracting()
      ) {
        return;
      }
      let hoveredRoute = null;
      let name = null;

      const hoveredFeatures = this.map.getFeaturesAtPixel(evt.pixel, {
        hitTolerance: 2,
        layerFilter: (layer) => {
          return /routeLayer|markerLayer/.test(layer.get('name'));
        },
      });
      hoveredFeatures.forEach((feature) => {
        // if the feature is a via point or a route point to modify.
        if (feature.getGeometry().getType() === 'Point') {
          name = feature.get('name');
          if (name) {
            const featCountryCode = feature.get('country_code');
            name = `${name}${featCountryCode ? ` - ${featCountryCode}` : ''}`;
          }
          this.setState({
            // Display the name of a station or the coordinate of the point
            hoveredStationName:
              name || `${to4326(feature.getGeometry().getCoordinates())}`,
          });
        }
        // if the feature is a route
        if (
          ['LineString', 'MultiLineString'].includes(
            feature.getGeometry().getType(),
          )
        ) {
          hoveredRoute = feature;

          this.setState({
            // Update the tooltip in route info dialog
            hoveredPoint: evt.coordinate,

            // Display the coordinate on the route or the name of a via point
            hoveredStationName: name || `${to4326(evt.coordinate)}`,
          });
        }
      });

      if (hoveredFeatures.length === 0) {
        this.setState({ hoveredStationName: null });
      }

      if (hoveredFeatures.length && !evt.dragging) {
        this.map.getTargetElement().style.cursor = 'grab';
      } else if (
        evt.dragging &&
        (this.initialNodeDrag || this.initialRouteDrag)
      ) {
        this.map.getTargetElement().style.cursor = 'grabbing';
      } else {
        this.map.getTargetElement().style.cursor = '';
      }

      // If the hovered route has changed we update the hover effect
      if (this.hoveredRoute !== hoveredRoute) {
        this.hoveredRoute = hoveredRoute;

        // Update the style
        routingLayer.changed();

        if (!this.hoveredRoute) {
          this.setState({
            hoveredPoint: null,
            hoveredStationName: null,
          });
        }
      }
    });

    this.modifyOverlayListener = this.map
      .getViewport()
      .addEventListener('mouseleave', () => {
        const overlaySource = this.modifyInteraction.getOverlay().getSource();
        overlaySource.clear();
      });
  }

  loadBaseLayers() {
    const { baseLayer, generalizationActive, generalizationEnabled, style } =
      this.props;

    baseLayer.style = `${style || 'travic_v2'}${
      generalizationEnabled && generalizationActive ? '_generalized' : ''
    }`;
  }

  onMapMoved(evt) {
    const { center, dispatchSetCenter, dispatchSetZoom, zoom } = this.props;
    const newCenter = evt.map.getView().getCenter();
    const newZoom = evt.map.getView().getZoom();
    if (zoom !== newZoom) {
      dispatchSetZoom(newZoom);
    }

    if (center[0] !== newCenter[0] || center[1] !== newCenter[1]) {
      dispatchSetCenter(newCenter);
    }
  }

  onPanViaClick(item, idx) {
    const { currentStopsGeoJSON } = this.props;
    if (currentStopsGeoJSON && currentStopsGeoJSON[idx]) {
      const featureCoord = currentStopsGeoJSON[idx].geometry.coordinates;

      this.map.getView().animate({
        center: featureCoord,
        duration: 500,
        padding: [100, 100, 100, 100],
      });
    }
  }

  /**
   * Render the map component to the dom
   * @category Map
   */
  render() {
    const {
      apiKey,
      center,
      currentMot,
      layers,
      mode,
      mots,
      selectedRoutes,
      stationSearchUrl,
      yamlSnippetDialogOpen,
      zoom,
    } = this.props;

    const { hoveredPoint, hoveredStationName, isActiveRoute } = this.state;

    return (
      <Box sx={{ '& .rs-map': { inset: '0 0 0', position: 'absolute' } }}>
        <RoutingMenu
          APIKey={apiKey}
          hoveredCoords={hoveredPoint}
          isActiveRoute={isActiveRoute}
          mots={mots}
          onDrawNewRoute={this.drawNewRoute}
          onPanViaClick={this.onPanViaClick}
          onZoomRouteClick={this.onZoomRouteClick}
          routes={selectedRoutes}
          stationSearchUrl={stationSearchUrl}
        />
        <Snackbar
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          message={hoveredStationName}
          open={!!hoveredStationName}
        />
        <BasicMap
          center={center}
          layers={layers}
          map={this.map}
          onMapMoved={(evt) => {
            return this.onMapMoved(evt);
          }}
          tabIndex={null}
          viewOptions={{
            extent: EUROPE_EXTENT,
            maxZoom: 23,
            projection: this.projection,
          }}
          zoom={zoom}
        />
        {currentMot === 'foot' && this.map.getView().getZoom() >= 14 ? (
          <FloorSwitcher />
        ) : null}
        {currentMot === 'foot'
          ? (() => {
              const dialogs = [];
              let previousFloor = null;
              selectedRoutes.forEach((route, idx) => {
                const previousRoute = selectedRoutes[idx - 1];
                if (previousRoute) {
                  previousFloor = previousRoute.get('floor');
                }
                const floor = route.get('floor');
                if (previousFloor && floor !== previousFloor) {
                  dialogs.push(
                    <MapFloorSwitcher
                      key={route.ol_uid}
                      nextRoute={route}
                      route={previousRoute}
                    />,
                  );
                }
              });
              return dialogs;
            })()
          : null}
        {yamlSnippetDialogOpen && mode === 'dev' ? <YamlSnippetDialog /> : null}
        <Box
          sx={(theme) => {
            return {
              '& .rs-copyright': {
                '& a': {
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                  color: '#555',
                },
                bottom: 28,
                color: '#555',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontSize: '0.8em',
                left: 5,
                position: 'absolute',
              },
            };
          }}
        >
          <Copyright map={this.map} />
        </Box>
      </Box>
    );
  }

  setIsActiveRoute(isActiveRoute) {
    this.setState({ isActiveRoute });
  }

  updateGeneralization() {
    const {
      currentMot,
      dispatchSetGeneralizationGraph,
      generalizationActive,
      zoom,
    } = this.props;
    const graphParam = new URLSearchParams(window.location.search).get('graph');
    if (graphParam) {
      dispatchSetGeneralizationGraph(graphParam);
      return;
    }
    if (!generalizationActive) {
      dispatchSetGeneralizationGraph(null);
      return;
    }
    dispatchSetGeneralizationGraph(getGeneralization(currentMot, zoom));
  }
}

const mapStateToProps = (state) => {
  return {
    activeFloor: state.MapReducer.activeFloor,
    apiKey: state.MapReducer.apiKey,
    baseLayer: state.MapReducer.baseLayer,
    center: state.MapReducer.center,
    currentMot: state.MapReducer.currentMot,
    currentStops: state.MapReducer.currentStops,
    currentStopsGeoJSON: state.MapReducer.currentStopsGeoJSON,
    floorInfo: state.MapReducer.floorInfo,
    generalizationActive: state.MapReducer.generalizationActive,
    generalizationEnabled: state.MapReducer.generalizationEnabled,
    generalizationGraph: state.MapReducer.generalizationGraph,
    geschosseLayer: state.MapReducer.geschosseLayer,
    highlightLayer: state.MapReducer.highlightLayer,
    isFieldFocused: state.MapReducer.isFieldFocused,
    isRouteInfoOpen: state.MapReducer.isRouteInfoOpen,
    layers: state.MapReducer.layers,
    markerLayer: state.MapReducer.markerLayer,
    maxExtent: state.MapReducer.maxExtent,
    mode: state.MapReducer.mode,
    olMap: state.MapReducer.olMap,
    resolveHops: state.MapReducer.resolveHops,
    routingLayer: state.MapReducer.routingLayer,
    searchMode: state.MapReducer.searchMode,
    selectedRoute: state.MapReducer.selectedRoute,
    selectedRoutes: state.MapReducer.selectedRoutes,
    style: state.MapReducer.style,
    tracks: state.MapReducer.tracks,
    yamlSnippetDialogOpen: state.MapReducer.yamlSnippetDialogOpen,
    zoom: state.MapReducer.zoom,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetActiveFloor: (activeFloor) => {
      return dispatch(actions.setActiveFloor(activeFloor));
    },
    dispatchSetCenter: (center) => {
      return dispatch(actions.setCenter(center));
    },
    dispatchSetClickLocation: (clickLocation) => {
      return dispatch(actions.setClickLocation(clickLocation));
    },
    dispatchSetCurrentStops: (currentStops) => {
      return dispatch(actions.setCurrentStops(currentStops));
    },
    dispatchSetCurrentStopsGeoJSON: (currentStopsGeoJSON) => {
      return dispatch(actions.setCurrentStopsGeoJSON(currentStopsGeoJSON));
    },
    dispatchSetFloorInfo: (floorInfo) => {
      return dispatch(actions.setFloorInfo(floorInfo));
    },
    dispatchSetGeneralizationGraph: (graph) => {
      return dispatch(actions.setGeneralizationGraph(graph));
    },
    dispatchSetMaxExtent: (extent) => {
      return dispatch(actions.setMaxExtent(extent));
    },
    dispatchSetSelectedRoutes: (selectedRoutes) => {
      return dispatch(actions.setSelectedRoutes(selectedRoutes));
    },
    dispatchSetTracks: (tracks) => {
      return dispatch(actions.setTracks(tracks));
    },
    dispatchSetZoom: (zoom) => {
      return dispatch(actions.setZoom(zoom));
    },
    dispatchShowLoadingBar: (showLoadingBar) => {
      return dispatch(actions.setShowLoadingBar(showLoadingBar));
    },
    dispatchShowNotification: (notificationMessage, notificationType) => {
      return dispatch(
        actions.showNotification(notificationMessage, notificationType),
      );
    },
  };
};

MapComponent.defaultProps = {
  center: [47.99822, 7.84049],
  generalizationGraph: null,
  mode: null,
  style: 'travic_v2',
  yamlSnippetDialogOpen: false,
};

MapComponent.propTypes = {
  activeFloor: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  baseLayer: PropTypes.instanceOf(MaplibreLayer).isRequired,
  center: propTypeCoordinates,
  currentMot: PropTypes.string.isRequired,
  currentStops: propTypeCurrentStops.isRequired,
  currentStopsGeoJSON: propTypeCurrentStopsGeoJSON.isRequired,
  dispatchSetActiveFloor: PropTypes.func.isRequired,
  dispatchSetCenter: PropTypes.func.isRequired,
  dispatchSetClickLocation: PropTypes.func.isRequired,
  dispatchSetCurrentStops: PropTypes.func.isRequired,
  dispatchSetCurrentStopsGeoJSON: PropTypes.func.isRequired,
  dispatchSetFloorInfo: PropTypes.func.isRequired,
  dispatchSetGeneralizationGraph: PropTypes.func.isRequired,
  dispatchSetMaxExtent: PropTypes.func.isRequired,
  dispatchSetSelectedRoutes: PropTypes.func.isRequired,
  dispatchSetTracks: PropTypes.func.isRequired,
  dispatchSetZoom: PropTypes.func.isRequired,
  dispatchShowLoadingBar: PropTypes.func.isRequired,
  dispatchShowNotification: PropTypes.func.isRequired,
  floorInfo: PropTypes.arrayOf(PropTypes.string).isRequired,
  generalizationActive: PropTypes.bool.isRequired,
  generalizationEnabled: PropTypes.bool.isRequired,
  generalizationGraph: PropTypes.string,
  geschosseLayer: PropTypes.instanceOf(Group).isRequired,
  isFieldFocused: PropTypes.bool.isRequired,
  isRouteInfoOpen: PropTypes.bool.isRequired,
  layers: PropTypes.arrayOf(
    PropTypes.instanceOf(
      PropTypes.oneOfType([MaplibreLayer, VectorLayer, LevelLayer, Layer]),
    ),
  ).isRequired,
  markerLayer: PropTypes.instanceOf(VectorLayer).isRequired,
  maxExtent: PropTypes.arrayOf(PropTypes.number).isRequired,
  mode: PropTypes.string,
  mots: PropTypes.arrayOf(PropTypes.string).isRequired,
  olMap: PropTypes.instanceOf(Map).isRequired,
  resolveHops: PropTypes.bool.isRequired,
  routingLayer: PropTypes.instanceOf(VectorLayer).isRequired,
  routingUrl: PropTypes.string.isRequired,
  searchMode: PropTypes.string.isRequired,
  selectedRoutes: PropTypes.arrayOf(PropTypes.instanceOf(Feature)).isRequired,
  stationSearchUrl: PropTypes.string.isRequired,
  style: PropTypes.string,
  tracks: PropTypes.arrayOf(PropTypes.string).isRequired,
  yamlSnippetDialogOpen: PropTypes.bool,
  zoom: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
