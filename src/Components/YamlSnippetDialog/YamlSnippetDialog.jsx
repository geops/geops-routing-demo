import React, { useMemo, useEffect, useState } from 'react';
import { IconButton, Paper, Tooltip, useMediaQuery } from '@mui/material';
import { Translate } from 'ol/interaction';
import { LineString, Point } from 'ol/geom';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector, useDispatch } from 'react-redux';
import { Feature } from 'ol';
import { Style, Stroke, RegularShape } from 'ol/style';
import { to4326 } from '../../utils';
import { setYamlSnippetDialogOpen } from '../../store/actions/Map';
import getViaStrings from '../../utils/getViaStrings';

const expectedViaPointStyle = new Style({
  image: new RegularShape({
    stroke: new Stroke({ color: '#000000', width: 4 }),
    points: 4,
    radius: 10,
    radius2: 0,
    angle: Math.PI / 4,
  }),
});

function sortByFraction(featA, featB) {
  const fractionA = featA.get('fraction');
  const fractionB = featB.get('fraction');
  return fractionA - fractionB;
}

function YamlSnippetDialog() {
  const dispatch = useDispatch();
  const {
    selectedRoutes,
    currentStopsGeoJSON,
    currentMot,
    tracks,
    olMap: map,
    generalizationGraph,
    debugLayer,
    routingLayer,
  } = useSelector((state) => state.MapReducer);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [debugPointCoords, setDebugPointCoords] = useState([]);

  const viaString = useMemo(() => {
    return getViaStrings(currentStopsGeoJSON, currentMot, tracks).join('|');
  }, [currentStopsGeoJSON, currentMot, tracks]);

  const expectedViaPoints = useMemo(() => {
    if (!selectedRoutes.length) return [];
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
      layers: [debugLayer],
      hitTolerance: 6,
    });
    translate.on('translateend', () => {
      setDebugPointCoords(
        debugLayer
          .getSource()
          .getFeatures()
          .sort(sortByFraction)
          .map((feat) => feat.getGeometry().getCoordinates()),
      );
    });
    map?.addInteraction(translate);
    return () => {
      map?.removeInteraction(translate);
    };
  }, [map, debugLayer]);

  useEffect(() => {
    debugLayer.getSource().clear();
    debugLayer.getSource().addFeatures(expectedViaPoints);
    setDebugPointCoords(
      debugLayer
        .getSource()
        .getFeatures()
        .sort(sortByFraction)
        .map((feat) => feat.getGeometry().getCoordinates()),
    );
  }, [expectedViaPoints, map, debugLayer]);

  useEffect(() => {
    return () => debugLayer.getSource().clear();
  }, [debugLayer]);

  if (!isDesktop) return null;

  return (
    <div
      style={{
        position: 'absolute',
        left: 710,
        top: 10,
      }}
    >
      <Paper elevation={3} square>
        <Tooltip title="Close">
          <IconButton
            sx={{ position: 'absolute', right: 5, top: 5 }}
            size="small"
            onClick={() => dispatch(setYamlSnippetDialogOpen(false))}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <div
          style={{
            padding: 20,
            minHeight: 195,
            minWidth: 250,
          }}
        >
          <div
            style={{
              marginTop: 15,
              padding: '15px 10px',
              backgroundColor: '#eeeeee',
              fontSize: 14,
              whiteSpace: 'pre',
              maxWidth: 400,
              overflowX: 'auto',
              fontFamily:
                'Consolas,Monaco,Lucida Console,Liberation Mono,DejaVu Sans Mono,Bitstream Vera Sans Mono,Courier New',
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
            <div>
              {'  '}
              <b>expect_via:</b>{' '}
              <span>
                {debugPointCoords.map((coord, idx) => {
                  const transformedCoord = to4326(coord).join(',');
                  return (
                    <div
                      key={transformedCoord}
                      data-testid={`expected-viastring-${idx}`}
                    >
                      {'    '}- {`${transformedCoord}`}
                    </div>
                  );
                })}
              </span>
            </div>
            {currentMot === 'foot' ? (
              <div>
                {'  '}
                <b>expect_levels:</b>{' '}
                <span>
                  {expectedViaPoints.map((feat, idx) => {
                    return (
                      <div
                        key={feat.ol_uid}
                        data-testid={`expected-level-${idx}`}
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
            {generalizationGraph ? (
              <div>
                {'  '}
                <b>graph:</b>{' '}
                <span data-testid="gen_graph">{generalizationGraph}</span>
              </div>
            ) : null}
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default YamlSnippetDialog;
