import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Feature } from 'ol';
import GeoJSON from 'ol/format/GeoJSON';
import nearestPointOnLine from '@turf/nearest-point-on-line';
import combine from '@turf/combine';
import { Point } from 'ol/geom';
import Dialog from '@geops/react-ui/components/Dialog';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Label,
  Tooltip,
  ReferenceDot,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { ReactComponent as InterpolatedSvg } from './interpolated_surface.svg';
import { ReactComponent as SurfaceSvg } from './surface_elevation.svg';
import { setIsRouteInfoOpen, setDialogPosition } from '../../store/actions/Map';
import './RouteInfosDialog.scss';

const propTypes = {
  routes: PropTypes.arrayOf(PropTypes.instanceOf(Feature)).isRequired,
  hoveredCoords: PropTypes.arrayOf(PropTypes.number),
  onHighlightPoint: PropTypes.func.isRequired,
  clearHighlightPoint: PropTypes.func.isRequired,
};

const defaultProps = {
  hoveredCoords: null,
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

function RouteInfosDialog({
  routes,
  hoveredCoords,
  onHighlightPoint,
  clearHighlightPoint,
}) {
  const dispatch = useDispatch();
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [length, setLength] = useState(null);
  const [minAltitude, setMinAltitude] = useState(0);
  const [maxAltitude, setMaxAltitude] = useState(null);
  const [routePoints, setRoutePoints] = useState([]);
  const [distanceUnit, setDistanceUnit] = useState(null);
  const [isMeter, setIsMeter] = useState(null);

  const dialogPosition = useSelector(state => state.MapReducer.dialogPosition);

  const onDragStop = useCallback(
    (evt, position) => {
      dispatch(
        setDialogPosition({
          x: position.lastX,
          y: position.lastY,
        }),
      );
    },
    [dispatch],
  );

  const renderPrograTooltip = useCallback(
    (hovCoords, linePoints, routeLine) => {
      const format = new GeoJSON();

      const line = combine(
        format.writeFeaturesObject(routeLine, {
          dataProjection: 'EPSG:4326',
          featureProjection: 'EPSG:3857',
        }),
      ).features[0];

      const hoveredFeat = new Feature({
        geometry: new Point(hovCoords),
      });
      const pt = format.writeFeatureObject(hoveredFeat, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      });

      const turfClosestPt = nearestPointOnLine(line, pt);
      const lineCoordinates = line.geometry.coordinates;
      const nearestPts = lineCoordinates.map(coords => {
        return coords[turfClosestPt.properties.index];
      });
      const nearestPt = nearestPts.reduce((prev, curr) => {
        const goal = turfClosestPt.geometry.coordinates[0];
        if (!prev) {
          return curr;
        }
        return curr &&
          prev &&
          Math.abs(curr[0] - goal) < Math.abs(prev[0] - goal)
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
      setHoveredPoint(point);

      if (!point) {
        return null;
      }
      return (
        <div className="rd-tootip-wrapper">
          <div>surface elevation: {point.surfaceElevation} m</div>
          <div>interpolated altitude: {point.alt} m</div>
          <div>
            distance: {tickFormatter(point.distance, isMeter)}
            {isMeter ? ' m' : ' km'}
          </div>
        </div>
      );
    },
    [isMeter],
  );

  const renderTooltip = useCallback(
    tooltipProps => {
      if (hoveredPoint) {
        setHoveredPoint(null);
      }
      if (!tooltipProps.payload.length) {
        return;
      }
      const {
        xVal,
        yVal,
        alt,
        surfaceElevation,
        distance,
      } = tooltipProps.payload[0].payload;

      onHighlightPoint([xVal, yVal]);
      // eslint-disable-next-line consistent-return
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
    [hoveredPoint, isMeter, onHighlightPoint],
  );

  useEffect(() => {
    const pointArray = [];
    const coords = [].concat(
      ...routes.map(r => r.getGeometry().getFlatCoordinates()),
    );
    const distances = [].concat(...routes.map(r => r.get('vertex_distances')));
    const lgth = routes
      .map(r => r.get('line_length'))
      .reduce((a, b) => a + b, 0);
    setLength(lgth);
    setDistanceUnit(lgth > 1000 ? 'km' : 'm');
    setIsMeter(distanceUnit === 'm');

    const xArray = everyNth(coords, 3, 0);
    const yArray = everyNth(coords, 3, 1);
    const altitudesArray = everyNth(coords, 3, 2).map(el => Math.round(el));
    const surfaceElevation = [].concat(
      ...routes.map(r => r.get('surface_elevations').map(el => Math.round(el))),
    );
    setMinAltitude(Math.min(...surfaceElevation.concat(altitudesArray)));
    setMaxAltitude(Math.max(...surfaceElevation.concat(altitudesArray)));

    altitudesArray.forEach((alt, idx) => {
      pointArray.push({
        alt,
        surfaceElevation: surfaceElevation.length
          ? surfaceElevation[idx]
          : null,
        xVal: xArray[idx],
        yVal: yArray[idx],
        distance: distances[idx],
      });
    });

    setRoutePoints(pointArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routes]);

  return (
    <Dialog
      isOpen
      title={<span>Route information</span>}
      isDraggable
      onDragStop={onDragStop}
      className="rd-dialog-container"
      classNameHeader="rd-dialog-header"
      classNameCloseBt="rd-dialog-close-bt"
      cancelDraggable=".tm-dialog-body"
      position={dialogPosition}
      onClose={() => dispatch(setIsRouteInfoOpen(false))}
    >
      <div className="rd-dialog-legend">
        <span>
          <SurfaceSvg /> surface elevation
        </span>
        <span>
          <InterpolatedSvg /> interpolated altitude
        </span>
      </div>
      <ResponsiveContainer width="90%" height="80%">
        <LineChart data={routePoints} onMouseLeave={clearHighlightPoint}>
          <YAxis
            type="number"
            axisLine={false}
            tickLine={false}
            domain={[minAltitude - 10, 'dataMax']}
          >
            <Label value="m" offset={10} position="top" />
          </YAxis>
          <XAxis
            type="number"
            dataKey="distance"
            tickFormatter={dist => tickFormatter(dist, isMeter)}
          >
            <Label value={distanceUnit} offset={10} position="right" />
          </XAxis>
          <CartesianGrid vertical={false} />
          <Line
            type="monotone"
            dataKey="alt"
            name="interpolated altitude"
            dot={false}
            stroke="#ff7f50"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="surfaceElevation"
            name="surface elevation"
            dot={false}
            stroke="#3f51b5"
            strokeWidth={2}
          />
          {hoveredCoords && hoveredPoint && (
            <ReferenceLine x={hoveredPoint.distance} stroke="lightgrey" />
          )}
          {hoveredCoords && hoveredPoint && (
            <ReferenceDot
              r={4}
              x={hoveredPoint.distance}
              y={hoveredPoint.alt}
              fill="#3f51b5"
              stroke="white"
            />
          )}
          <Tooltip
            cursor={hoveredPoint ? true : 'auto'}
            position={
              hoveredPoint
                ? {
                    x: getTooltipX(hoveredPoint.distance, length),
                    y: getTooltipY(hoveredPoint.alt, maxAltitude),
                  }
                : 'auto'
            }
            content={content =>
              hoveredCoords
                ? renderPrograTooltip(hoveredCoords, routePoints, routes)
                : renderTooltip(content)
            }
          />
        </LineChart>
      </ResponsiveContainer>
    </Dialog>
  );
}

RouteInfosDialog.propTypes = propTypes;
RouteInfosDialog.defaultProps = defaultProps;

export default React.memo(RouteInfosDialog);
