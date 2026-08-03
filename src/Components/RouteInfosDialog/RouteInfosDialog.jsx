import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import combine from '@turf/combine';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import { Feature } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import { Point } from 'ol/geom';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { pointStyleFunction } from '../../config/styleConfig';

import InterpolatedSurface from './InterpolatedSurface';
import SurfaceElevation from './SurfaceElevation';

import './RouteInfosDialog.scss';

const propTypes = {
  closeInfo: PropTypes.func.isRequired,
  hoveredCoords: PropTypes.arrayOf(PropTypes.number),
  routes: PropTypes.arrayOf(PropTypes.instanceOf(Feature)).isRequired,
};

const tickFormatter = (length, isMeter) => {
  let output;
  if (!isMeter) {
    output = `${Math.round((length / 1000) * 100) / 100}`;
  } else {
    output = `${Math.round(length * 100) / 100}`;
  }
  return output;
};

const everyNth = (arr, interval, start) => {
  const result = [];
  for (let i = start || 0; i < arr.length; i += interval || 1) {
    result.push(arr[i]);
  }
  return result;
};

const getTooltipX = (dist, length) => {
  const xPosition = (dist / length) * 300;
  return xPosition >= 80 ? xPosition : 80;
};

const getTooltipY = (alt, maxAlt) => {
  return alt / maxAlt > 0.5 ? 110 : 20;
};

const format = new GeoJSON({
  dataProjection: 'EPSG:4326',
  featureProjection: 'EPSG:3857',
});

const getHoveredPointFromHoveredCoords = (hovCoords, linePoints, routeLine) => {
  const line = combine(format.writeFeaturesObject(routeLine)).features[0];

  const hoveredFeat = new Feature({
    geometry: new Point(hovCoords),
  });

  const pt = format.writeFeatureObject(hoveredFeat);

  const turfClosestPt = nearestPointOnLine(line, pt);
  const lineCoordinates = line.geometry.coordinates;
  const nearestPts = lineCoordinates.map((coords) => {
    return coords[turfClosestPt.properties.index];
  });
  const nearestPt = nearestPts.reduce((prev, curr) => {
    const goal = turfClosestPt.geometry.coordinates[0];
    if (!prev) {
      return curr;
    }
    return curr && prev && Math.abs(curr[0] - goal) < Math.abs(prev[0] - goal)
      ? curr
      : prev;
  });

  const hoveredLineIdx = nearestPts.indexOf(nearestPt);
  // Turf only return the index within the closest feature.
  // We need to add the length of each preceding feature to have the correct index.
  let nearestPtIndex = turfClosestPt.properties.index;
  for (let i = 0; i < hoveredLineIdx; i += 1) {
    nearestPtIndex += lineCoordinates[i].length;
  }

  const point = linePoints[nearestPtIndex];
  return point;
};

function RouteInfosDialog({ closeInfo, hoveredCoords = null, routes }) {
  const highlightLayer = useSelector((state) => {
    return state.MapReducer.highlightLayer;
  });
  const currentMot = useSelector((state) => {
    return state.MapReducer.currentMot;
  });
  const containerRef = useRef();
  const [length, setLength] = useState(1);
  const [minAltitude, setMinAltitude] = useState(0);
  const [maxAltitude, setMaxAltitude] = useState(100);
  const [routePoints, setRoutePoints] = useState([]);
  const [distanceUnit, setDistanceUnit] = useState(null);
  const [isMeter, setIsMeter] = useState(null);
  const highlightSource = useMemo(() => {
    return highlightLayer.getSource();
  }, [highlightLayer]);

  const renderTooltip = useCallback(
    ({ alt, distance, surfaceElevation }) => {
      return (
        <div className="rd-tootip-wrapper">
          <div>surface elevation: {surfaceElevation} m</div>
          <div>interpolated altitude: {alt} m</div>
          <div>
            distance: {tickFormatter(distance, isMeter)}
            {isMeter ? ' m' : ' km'}
          </div>
        </div>
      );
    },
    [isMeter],
  );

  useEffect(() => {
    const pointArray = [];
    const coords = [].concat(
      ...routes.map((r) => {
        return r.getGeometry().getFlatCoordinates();
      }),
    );
    const distances = [].concat(
      ...routes.map((r) => {
        return r.get('vertex_distances');
      }),
    );
    const lgth = routes
      .map((r) => {
        return r.get('line_length');
      })
      .reduce((a, b) => {
        return a + b;
      }, 0);
    setLength(lgth);
    setDistanceUnit(lgth > 1000 ? 'km' : 'm');
    const isMeterValue = lgth <= 1000;
    setIsMeter(isMeterValue);

    const xArray = everyNth(coords, 3, 0);
    const yArray = everyNth(coords, 3, 1);
    const altitudesArray = everyNth(coords, 3, 2).map((el) => {
      return Math.round(el);
    });
    const surfaceElevation = [].concat(
      ...routes.map((r) => {
        return (r.get('surface_elevations') || []).map((el) => {
          return Math.round(el);
        });
      }),
    );
    setMinAltitude(Math.min(...surfaceElevation.concat(altitudesArray)));
    setMaxAltitude(Math.max(...surfaceElevation.concat(altitudesArray)));

    altitudesArray.forEach((alt, idx) => {
      pointArray.push({
        alt,
        distance: distances[idx],
        surfaceElevation: surfaceElevation.length
          ? surfaceElevation[idx]
          : null,
        xVal: xArray[idx],
        yVal: yArray[idx],
      });
    });

    setRoutePoints(pointArray);
  }, [routes]);

  const hoveredPoint = useMemo(() => {
    if (hoveredCoords && routePoints && routes) {
      const point = getHoveredPointFromHoveredCoords(
        hoveredCoords,
        routePoints,
        routes,
      );
      return point;
    }
    return null;
  }, [hoveredCoords, routePoints, routes]);

  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <div className="rd-info-dialog" ref={containerRef}>
      <div className="rd-info-close-button">
        <IconButton aria-label="close" onClick={closeInfo} size="small">
          <CloseIcon fontSize="small" />
        </IconButton>
      </div>
      <div className="rd-info-dialog-header">Route information</div>
      <div className="rd-info-dialog-legend">
        <span>
          <SurfaceElevation /> surface elevation
        </span>
        <span>
          <InterpolatedSurface /> interpolated altitude
        </span>
      </div>
      <ResponsiveContainer height="80%" width="98%">
        <LineChart
          data={routePoints}
          onMouseLeave={() => {
            return highlightSource.clear();
          }}
        >
          <YAxis
            axisLine={false}
            domain={[minAltitude - 10, 'dataMax']}
            tickLine={false}
            type="number"
          >
            <Label offset={10} position="top" value="m" />
          </YAxis>
          <XAxis
            dataKey="distance"
            tickFormatter={(dist) => {
              return tickFormatter(dist, isMeter);
            }}
            type="number"
          >
            <Label offset={10} position="right" value={distanceUnit} />
          </XAxis>
          <CartesianGrid vertical={false} />
          <Line
            dataKey="alt"
            dot={false}
            name="interpolated altitude"
            stroke="#ff7f50"
            strokeWidth={2}
            type="monotone"
          />
          <Line
            dataKey="surfaceElevation"
            dot={false}
            name="surface elevation"
            stroke="#3f51b5"
            strokeWidth={2}
            type="monotone"
          />
          {hoveredCoords && hoveredPoint && (
            <ReferenceLine stroke="lightgrey" x={hoveredPoint.distance} />
          )}
          {hoveredCoords && hoveredPoint && (
            <ReferenceDot
              fill="#3f51b5"
              r={4}
              stroke="white"
              x={hoveredPoint.distance}
              y={hoveredPoint.alt}
            />
          )}
          <Tooltip
            content={(content) => {
              if (hoveredPoint) {
                // Render toltip is we are hovering the route
                return renderTooltip(hoveredPoint);
              }
              if (!content.payload.length) {
                return null;
              }
              const point = content.payload[0].payload;
              const { xVal, yVal } = point;

              const feat = new Feature({
                geometry: new Point([xVal, yVal]),
              });
              feat.setStyle(pointStyleFunction(currentMot));
              highlightSource.clear();
              highlightSource.addFeatures([feat]);
              // Render tooltip is we are hovering  the graph
              return renderTooltip(point);
            }}
            cursor={!!hoveredPoint}
            position={
              hoveredPoint
                ? {
                    x: getTooltipX(hoveredPoint.distance, length),
                    y: getTooltipY(hoveredPoint.alt, maxAltitude),
                  }
                : null
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

RouteInfosDialog.propTypes = propTypes;

export default React.memo(RouteInfosDialog);
