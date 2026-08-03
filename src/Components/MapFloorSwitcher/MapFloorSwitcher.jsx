import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Feature } from 'ol';
import { containsCoordinate } from 'ol/extent';
import { Point } from 'ol/geom';
import { unByKey } from 'ol/Observable';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'react-spatial/components/Popup';

import { setActiveFloor } from '../../store/actions/Map';

import './MapFloorSwitcher.scss';

const propTypes = {
  nextRoute: PropTypes.instanceOf(Feature).isRequired,
  route: PropTypes.instanceOf(Feature).isRequired,
};

const shouldDisplayButton = (map, coord) => {
  return (
    map.getView().getZoom() >= 16 &&
    containsCoordinate(map.getView().calculateExtent(), coord)
  );
};

function MapFloorSwitcher({ nextRoute, route }) {
  const dispatch = useDispatch();
  const map = useSelector((state) => {
    return state.MapReducer.olMap;
  });
  const activeFloor = useSelector((state) => {
    return state.MapReducer.activeFloor;
  });
  const coord = route.getGeometry().getLastCoordinate();
  const [isInExtent, setInExtent] = useState(shouldDisplayButton(map, coord));

  const feature = new Feature(new Point(coord));

  useEffect(() => {
    const key = map.on('moveend', () => {
      setInExtent(shouldDisplayButton(map, coord));
    });
    return () => {
      unByKey(key);
    };
  }, [coord, map]);

  if (!nextRoute || !isInExtent) {
    return null;
  }

  const { floor } = route.getProperties();
  const { floor: nextFloor } = nextRoute.getProperties();

  // Make sure we compare integer.
  let intFloor = parseInt(floor, 10);
  let intNextFloor = parseInt(nextFloor, 10);
  const intActiveFloor = parseInt(activeFloor, 10);

  if (activeFloor !== '2D') {
    if (intFloor !== intActiveFloor && intNextFloor !== intActiveFloor) {
      return null;
    }

    if (intNextFloor === intActiveFloor) {
      intNextFloor = intFloor;
      intFloor = activeFloor;
    }
  }

  const up = intFloor < intNextFloor;

  const directionIcon = up ? (
    <KeyboardArrowUpIcon />
  ) : (
    <KeyboardArrowDownIcon />
  );

  return (
    <Popup className="map-floor-switcher" feature={feature} map={map}>
      <div>
        <Typography variant="body2">{intNextFloor}</Typography>
      </div>
      <div>
        <IconButton
          onClick={() => {
            dispatch(setActiveFloor(`${intNextFloor}`));
          }}
          sx={{
            padding: 0,
          }}
        >
          {directionIcon}
        </IconButton>
      </div>
    </Popup>
  );
}

MapFloorSwitcher.propTypes = propTypes;

export default React.memo(MapFloorSwitcher);
