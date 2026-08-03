import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Paper, Tooltip, useMediaQuery } from '@mui/material';
import { Feature } from 'ol';
import { LineString, Point } from 'ol/geom';
import { Translate } from 'ol/interaction';
import { RegularShape, Stroke, Style } from 'ol/style';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BARRIERFREE_SEARCH_MODE } from '../../constants';
import { setYamlSnippetDialogOpen } from '../../store/actions/Map';
import { to4326 } from '../../utils';
import getViaStrings from '../../utils/getViaStrings';
import JiraMailLink from '../JiraMailLink';

const expectedViaPointStyle = new Style({
  image: new RegularShape({
    angle: Math.PI / 4,
    points: 4,
    radius: 10,
    radius2: 0,
    stroke: new Stroke({ color: '#000000', width: 4 }),
  }),
});

function sortByFraction(featA, featB) {
  const fractionA = featA.get('fraction');
  const fractionB = featB.get('fraction');
  return fractionA - fractionB;
}

function getExpectedViaString(source) {
  return source
    .getFeatures()
    .sort(sortByFraction)
    .map((feat) => {
      return to4326(feat.getGeometry().getCoordinates().slice(0, 2)).join(',');
    });
}

function YamlSnippetDialog() {
  const dispatch = useDispatch();
  const {
    currentMot,
    currentStopsGeoJSON,
    debugLayer,
    floorInfo,
    generalizationGraph,
    olMap: map,
    routingLayer,
    searchMode,
    selectedRoutes,
    tracks,
  } = useSelector((state) => {
    return state.MapReducer;
  });
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [debugPointCoords, setDebugPointCoords] = useState([]);
  const isFootRouting = currentMot === 'foot';

  const viaString = useMemo(() => {
    return getViaStrings(currentStopsGeoJSON, currentMot, tracks).join('|');
  }, [currentStopsGeoJSON, currentMot, tracks]);

  const levelsString = useMemo(() => {
    return floorInfo.join('|');
  }, [floorInfo]);

  const expectedViaPoints = useMemo(() => {
    if (!selectedRoutes.length) {
      return [];
    }
    // Combine all route geometries to one LineString
    const concatCoords = selectedRoutes.reduce(
      (finalCoords, currentRoute, idx) => {
        const routeCoords = currentRoute.getGeometry().getCoordinates();
        return finalCoords.concat(
          idx === 0
            ? routeCoords
            : routeCoords.slice(1, routeCoords.length - 1),
        );
      },
      [],
    );
    const concatGeom = new LineString(concatCoords);
    // Create 5 default expected via points at a set of fraction coordinates on the line
    const features = [0.1, 0.3, 0.5, 0.7, 0.9].reduce(
      (finalPoints, fraction) => {
        const coord = concatGeom.getCoordinateAt(fraction);
        const pointFeature = new Feature({
          geometry: new Point(coord),
        });
        const closestRoute = routingLayer
          .getSource()
          .getClosestFeatureToCoordinate(
            pointFeature.getGeometry().getCoordinates(),
          );
        pointFeature.set(
          'floor',
          parseInt(closestRoute?.get('floor') || 0, 10),
        );
        pointFeature.set('fraction', fraction);
        pointFeature.setStyle(expectedViaPointStyle);
        return [...finalPoints, pointFeature];
      },
      [],
    );

    return features;
  }, [selectedRoutes, routingLayer]);

  const distance = useMemo(() => {
    return selectedRoutes.reduce((total, currentRoute) => {
      return total + currentRoute.get('line_length');
    }, 0);
  }, [selectedRoutes]);

  useEffect(() => {
    const translate = new Translate({
      hitTolerance: 6,
      layers: [debugLayer],
    });
    translate.on('translateend', () => {
      setDebugPointCoords(getExpectedViaString(debugLayer.getSource()));
    });
    map?.addInteraction(translate);
    return () => {
      map?.removeInteraction(translate);
      debugLayer.getSource().clear();
    };
  }, [map, debugLayer]);

  useEffect(() => {
    debugLayer.getSource().clear();
    debugLayer.getSource().addFeatures(expectedViaPoints);
    setDebugPointCoords(getExpectedViaString(debugLayer.getSource()));
  }, [expectedViaPoints, map, debugLayer]);

  if (!isDesktop) {
    return null;
  }

  return (
    <div
      style={{
        left: 710,
        position: 'absolute',
        top: 10,
      }}
    >
      <Paper elevation={3} square>
        <Tooltip title="Close">
          <IconButton
            onClick={() => {
              return dispatch(setYamlSnippetDialogOpen(false));
            }}
            size="small"
            sx={{ position: 'absolute', right: 5, top: 5 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <div
          style={{
            minHeight: 195,
            minWidth: 250,
            padding: 20,
          }}
        >
          <div
            style={{
              backgroundColor: '#eeeeee',
              fontFamily:
                'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
              fontSize: 14,
              marginTop: 15,
              maxWidth: 400,
              overflowX: 'auto',
              padding: '15px 10px',
              whiteSpace: 'pre',
            }}
          >
            <div>
              <b data-testid="header">{`${currentMot}-xx:`}</b>
            </div>
            <div>
              {'  '}
              <b>description:</b> <span>Fill out</span>
            </div>
            <div>
              {'  '}
              <b>mot:</b> <span data-testid="mot">{currentMot}</span>
            </div>
            <div>
              {'  '}
              <b>via:</b>{' '}
              <span data-testid="viaString">&apos;{viaString}&apos;</span>
            </div>
            {isFootRouting && levelsString && (
              <div>
                {'  '}
                <b>levels:</b>{' '}
                <span data-testid="levels">&apos;{levelsString}&apos;</span>
              </div>
            )}
            {isFootRouting && searchMode === BARRIERFREE_SEARCH_MODE && (
              <div>
                {'  '}
                <b>barrierefrei:</b>{' '}
                <span data-testid="barrier-free">true</span>
              </div>
            )}
            <div>
              {'  '}
              <b>expect_via:</b>{' '}
              <span>
                {debugPointCoords.map((coord, idx) => {
                  return (
                    <div data-testid={`expected-viastring-${idx}`} key={coord}>
                      {'    '}- {`${coord}`}
                    </div>
                  );
                })}
              </span>
            </div>
            {isFootRouting ? (
              <div>
                {'  '}
                <b>expect_levels:</b>{' '}
                <span>
                  {expectedViaPoints.map((feat, idx) => {
                    return (
                      <div
                        data-testid={`expected-level-${idx}`}
                        key={feat.ol_uid}
                      >
                        {'    '}- {feat.get('floor').toFixed(0)}
                      </div>
                    );
                  })}
                </span>
              </div>
            ) : null}
            <div>
              {'  '}
              <b>min_km:</b>{' '}
              <span data-testid="min_km">
                {(distance / 1.03 / 1000).toFixed(3)}
              </span>
            </div>
            <div>
              {'  '}
              <b>max_km:</b>{' '}
              <span data-testid="max_km">
                {((distance * 1.03) / 1000).toFixed(3)}
              </span>
            </div>
            {isFootRouting ? (
              <div>
                {'  '}
                <b>max_via_distance:</b>{' '}
                <span data-testid="max_via_distance">2.0</span>
              </div>
            ) : null}
            {generalizationGraph ? (
              <div>
                {'  '}
                <b>graph:</b>{' '}
                <span data-testid="gen_graph">{generalizationGraph}</span>
              </div>
            ) : null}
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'end' }}>
            <JiraMailLink
              barrierFree={
                isFootRouting && searchMode === BARRIERFREE_SEARCH_MODE
              }
              expectedLevels={
                isFootRouting
                  ? expectedViaPoints.map((feat) => {
                      return feat.get('floor').toFixed(0);
                    })
                  : []
              }
              expectedVias={debugPointCoords}
              generalizationGraph={generalizationGraph}
              levels={isFootRouting ? levelsString : undefined}
              maxKm={((distance * 1.03) / 1000).toFixed(3)}
              maxViaDistance={isFootRouting ? '2.0' : undefined}
              minKm={(distance / 1.03 / 1000).toFixed(3)}
              mot={currentMot}
              via={viaString}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default YamlSnippetDialog;
