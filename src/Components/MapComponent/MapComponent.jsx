import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Map, View } from 'ol';
import { toLonLat } from 'ol/proj';
import { Layer, Vector as VectorLayer } from 'ol/layer';
import mapboxgl from 'mapbox-gl';
import _ from 'lodash/core';
import GeoJSON from 'ol/format/GeoJSON';
import { Vector as VectorSource } from 'ol/source';
import { defaults as defaultInteractions, Translate } from 'ol/interaction';
import axios from 'axios';
import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import {
  lineStyleFunction,
  pointStyleFunction,
} from '../../config/styleConfig';
import { to4326 } from '../../utils';
import './MapComponent.css';
import * as actions from '../../store/actions';

/**
 * The map props
 * @typedef MapComponentProps
 * @type {props}
 * @property {string} APIKey key obtained from geOps that enables you to used the previous API services.
 * @property {string} routingUrl The API routing url to be used for navigation.
 * @property {string} currentMot The current selected mot by user, example 'bus'.
 * @property {Object} currentStopsGeoJSON The current stops defined by user in geojson format inside a dictionary, key is the stop index(order) and the value is the geoJSON itself.
 * @property {function} onShowNotification A store action that can be dispatched, takes the notification message and type as arguments.
 * @property {function} onSetClickLocation A store action that can be dispatched, takes the clicked location on map array of [long,lat] and stores it in the store.
 * @category Props
 */

/**
 * The only true map that shows inside the application.
 * @category Map
 */
class MapComponent extends Component {
  /**
   * Default constructor, gets called automatically upon initialization.
   * @param {...MapComponentProps} props Props received so that the component can function properly.
   * @category Map
   */
  constructor(props) {
    super(props);
    this.FindRouteCancelToken = axios.CancelToken;
    this.findRouteCancel = null;
    this.hoveredFeature = null;
    this.state = {
      hoveredStationOpen: false,
      hoveredStationName: '',
    };
  }

  /**
   * Create Openlayers map (source, view, layer, etc...).
   * Add event listener onClick to handle location selection from map.
   * @category Map
   */
  componentDidMount() {
    const { APIKey, onSetClickLocation } = this.props;
    const center = [949042.143189, 5899715.591163];

    // Define stop vectorLayer.
    this.markerVectorSource = new VectorSource({});
    this.markerVectorLayer = new VectorLayer({
      zIndex: 1,
      source: this.markerVectorSource,
    });
    // Define route vectorLayer.
    this.routeVectorSource = new VectorSource({});
    this.routeVectorLayer = new VectorLayer({
      zIndex: 0,
      source: this.routeVectorSource,
    });

    const translate = new Translate({
      layers: [this.markerVectorLayer],
    });

    const isItemInArray = (array, item) => {
      for (let i = 0; i < array.length; i += 1) {
        if (array[i][0] === item[0] && array[i][1] === item[1]) {
          return i;
        }
      }
      return -1;
    };

    translate.on('translateend', evt => {
      const {
        currentStops,
        currentStopsGeoJSON,
        onSetCurrentStops,
        onSetCurrentStopsGeoJSON,
      } = this.props;
      const newCurrentStops = _.clone(currentStops);
      const newCurentStopsGeoJSON = _.clone(currentStopsGeoJSON);

      const { name, id } = evt.features.getArray()[0].getProperties();
      let featureIndex;
      if (name) {
        featureIndex = currentStops.indexOf(name);
      } else {
        featureIndex = isItemInArray(currentStops, id.slice().reverse());
      }
      newCurrentStops[featureIndex] = evt.coordinate;
      newCurentStopsGeoJSON[featureIndex] = {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              id: evt.coordinate.slice().reverse(),
              type: 'coordinates',
            },
            geometry: {
              type: 'Point',
              coordinates: evt.coordinate,
            },
          },
        ],
      };
      onSetCurrentStops(newCurrentStops);
      onSetCurrentStopsGeoJSON(newCurentStopsGeoJSON);
    });

    this.map = new Map({
      target: 'map',
      interactions: defaultInteractions().extend([translate]),
      view: new View({
        projection: 'EPSG:3857',
        center,
        zoom: 6,
      }),
    });

    const mbMap = new mapboxgl.Map({
      style: `https://maps.geops.io/styles/travic/style.json?key=${APIKey}`,
      attributionControl: false,
      boxZoom: false,
      center: toLonLat(center),
      container: this.map.getTargetElement(),
      doubleClickZoom: false,
      dragPan: false,
      dragRotate: false,
      interactive: false,
      keyboard: false,
      pitchWithRotate: false,
      scrollZoom: false,
      touchZoomRotate: false,
    });

    /* eslint-disable no-underscore-dangle */
    const mbLayer = new Layer({
      render: frameState => {
        const canvas = mbMap.getCanvas();
        const { viewState } = frameState;

        const visible = mbLayer.getVisible();
        canvas.style.display = visible ? 'block' : 'none';

        const opacity = mbLayer.getOpacity();
        canvas.style.opacity = opacity;

        // adjust view parameters in mapbox
        const { rotation } = viewState;
        if (rotation) {
          mbMap.rotateTo((-rotation * 180) / Math.PI, {
            animate: false,
          });
        }
        mbMap.jumpTo({
          center: toLonLat(viewState.center),
          zoom: viewState.zoom - 1,
          animate: false,
        });

        if (mbMap._frame) {
          mbMap._frame.cancel();
          mbMap._frame = null;
        }
        mbMap._render();

        return canvas;
      },
    });

    [mbLayer, this.markerVectorLayer, this.routeVectorLayer].forEach(l =>
      this.map.addLayer(l),
    );

    this.map.on('singleclick', evt => {
      const { isFieldFocused, currentStopsGeoJSON } = this.props;
      // if one field empty or if a field is focused
      if (
        !currentStopsGeoJSON['0'] ||
        !currentStopsGeoJSON['1'] ||
        isFieldFocused
      ) {
        onSetClickLocation(evt.coordinate);
      }
    });
    this.map.on('pointermove', evt => {
      if (this.hoveredFeature) {
        this.hoveredFeature = null;
        this.setState({ hoveredStationOpen: false, hoveredStationName: '' });
      }
      this.map.forEachFeatureAtPixel(evt.pixel, feature => {
        if (feature.getGeometry().getType() === 'Point') {
          this.hoveredFeature = feature;
          let name = '';
          if (feature.get('name'))
            name = `${feature.get('name')} - ${feature.get('country_code')}`;
          else name = `${feature.get('id')[0]}, ${feature.get('id')[1]}`;
          this.setState({
            hoveredStationOpen: true,
            hoveredStationName: name,
          });
        }
        return true;
      });
    });
  }

  /**
   * Perform the necessary actions when receiving updated props.
   * If new stops are received, then remove any existing stops/routes and draw those stops/routes.
   * @category Map
   */
  componentDidUpdate(prevProps) {
    const { currentStopsGeoJSON, currentMot } = this.props;
    const currentMotChanged = currentMot && currentMot !== prevProps.currentMot;
    const currentStopsGeoJSONChanged =
      currentStopsGeoJSON &&
      currentStopsGeoJSON !== prevProps.currentStopsGeoJSON;

    if (currentMotChanged || currentStopsGeoJSONChanged) {
      this.markerVectorSource.clear();
      Object.keys(currentStopsGeoJSON).forEach(key => {
        this.markerVectorSource.addFeatures(
          new GeoJSON().readFeatures(currentStopsGeoJSON[key]),
        );
        this.markerVectorSource
          .getFeatures()
          .forEach(f => f.setStyle(pointStyleFunction(currentMot)));

        const coordinate = this.markerVectorSource
          .getFeatures()[0]
          .getGeometry()
          .getCoordinates();
        this.map.getView().animate({
          center: coordinate,
          duration: 500,
        });
      });
      // Remove the old route if exists
      this.routeVectorSource.clear();
      // Draw a new route if more than 1 stop is defined
      if (Object.keys(currentStopsGeoJSON).length > 1) {
        this.drawNewRoute();
      }
    }
  }

  /**
   * After receiving the updated stops, send a call to the routingAPI to find a suitable route between
   * two points/stations, if a route is found, it's returned and drawn to the map.
   * @category Map
   */
  drawNewRoute = () => {
    if (this.findRouteCancel) this.findRouteCancel();
    const hops = [];
    const {
      currentStopsGeoJSON,
      routingUrl,
      currentMot,
      APIKey,
      onShowNotification,
    } = this.props;
    Object.keys(currentStopsGeoJSON).forEach(key => {
      if (currentStopsGeoJSON[key].features) {
        // If the current item is a point selected on the map, not a station.
        hops.push(
          `@${to4326(currentStopsGeoJSON[key].features[0].properties.id)}`,
        );
      } else {
        // The item selected is a station from the stations API.
        hops.push(`!${to4326(currentStopsGeoJSON[key].properties.id)}`);
      }
    });
    axios
      .get(routingUrl, {
        params: {
          via: hops.join('|'),
          mot: currentMot,
          key: APIKey,
          srs: '3857',
        },
        cancelToken: new this.FindRouteCancelToken(cancel => {
          this.findRouteCancel = cancel;
        }),
      })
      .then(
        response => {
          // A route was found, prepare to draw it.
          this.routeVectorSource.clear();
          this.routeVectorSource.addFeatures(
            new GeoJSON().readFeatures(response.data),
          );
          this.routeVectorSource
            .getFeatures()
            .forEach(f => f.setStyle(lineStyleFunction(currentMot)));

          this.map.getView().fit(this.routeVectorSource.getExtent(), {
            size: this.map.getSize(),
            duration: 500,
            padding: [50, 50, 50, 50],
          });
        },
        error => {
          // No route was found.
          if (error) onShowNotification("Couldn't find route", 'error');
        },
      );
  };

  /**
   * Render the map component to the dom
   * @category Map
   */
  render() {
    const { hoveredStationOpen, hoveredStationName } = this.state;
    return (
      <>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={hoveredStationOpen}
          message={hoveredStationName}
        />
        <div id="map" className="MapComponent" />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentMot: state.MapReducer.currentMot,
    currentStops: state.MapReducer.currentStops,
    currentStopsGeoJSON: state.MapReducer.currentStopsGeoJSON,
    isFieldFocused: state.MapReducer.isFieldFocused,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetCurrentStops: currentStops =>
      dispatch(actions.setCurrentStops(currentStops)),
    onSetCurrentStopsGeoJSON: currentStopsGeoJSON =>
      dispatch(actions.setCurrentStopsGeoJSON(currentStopsGeoJSON)),
    onSetClickLocation: clickLocation =>
      dispatch(actions.setClickLocation(clickLocation)),
    onShowNotification: (notificationMessage, notificationType) =>
      dispatch(actions.showNotification(notificationMessage, notificationType)),
  };
};

MapComponent.propTypes = {
  onSetClickLocation: PropTypes.func.isRequired,
  onShowNotification: PropTypes.func.isRequired,
  onSetCurrentStops: PropTypes.func.isRequired,
  onSetCurrentStopsGeoJSON: PropTypes.func.isRequired,
  currentStops: PropTypes.array.isRequired,
  currentStopsGeoJSON: PropTypes.object.isRequired,
  isFieldFocused: PropTypes.bool.isRequired,
  APIKey: PropTypes.string.isRequired,
  routingUrl: PropTypes.string.isRequired,
  currentMot: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
