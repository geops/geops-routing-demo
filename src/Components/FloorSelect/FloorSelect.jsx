import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { WALKING_BASE_URL } from '../../constants';
import { setFloorInfo, showNotification } from '../../store/actions/Map';
import { to4326 } from '../../utils';

const propTypes = {
  disabled: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  singleStop: PropTypes.oneOfType([PropTypes.string, PropTypes.array]), // array for an array  of coordinate, string for a station name
};

/**
 * The component that displays the floor selector
 */
function FloorSelect({ disabled, index, singleStop = null }) {
  const dispatch = useDispatch();
  const floorInfo = useSelector((state) => {
    return state.MapReducer.floorInfo;
  });
  const activeFloor = useSelector((state) => {
    return state.MapReducer.activeFloor;
  });
  const floor = useMemo(() => {
    return floorInfo[index];
  }, [index, floorInfo]);
  const [floors, setFloors] = useState([floor || '0']);

  useEffect(() => {
    const abortController = new AbortController();
    // Coordinate
    if (Array.isArray(singleStop)) {
      const { signal } = abortController;

      const reqUrl = `${WALKING_BASE_URL}availableLevels?point=${to4326(
        singleStop,
      )
        .reverse()
        .join(',')}&distance=0.03`;

      fetch(reqUrl, { signal })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.error) {
            dispatch(
              showNotification("Couldn't find available levels", 'warning'),
            );
            return;
          }
          let { availableLevels } = response.properties;
          if (!availableLevels) {
            dispatch(
              showNotification("Couldn't find available levels", 'warning'),
            );
            return;
          }

          // Use String levels
          if (!availableLevels.length) {
            // if the array is empty we replace it by ['0'] to avoid warnings.
            availableLevels = ['0'];
          }

          // Convert to string
          const newFloors = availableLevels.join().split(',');
          const stringActiveFloor = `${activeFloor}`;

          // If the old floor doesn't exist at the new coordinate try to pick one.
          if (floor && !newFloors.includes(floor)) {
            // We pick the current activer floor if it exists.
            if (newFloors.includes(stringActiveFloor)) {
              floorInfo[index] = stringActiveFloor;
              // Or we pick the floor 0 if it exsits.
            } else if (floor !== '0' && newFloors.includes('0')) {
              floorInfo[index] = '0';
            } else {
              // If the level 0 doesn't exist pick the one in the middle
              floorInfo[index] = newFloors[Math.floor(newFloors.length / 2)];
            }
            dispatch(setFloorInfo([...floorInfo]));
          }

          setFloors(newFloors);
        })
        .catch((err) => {
          if (err.name === 'AbortError') {
            // eslint-disable-next-line no-console
            console.warn(`Abort ${reqUrl}`);
            return;
          }
          // It's important to rethrow all other errors so you don't silence them!
          // For example, any error thrown by setState(), will pass through here.
          throw err;
        });
    }
    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleStop]);

  // Don't display the select box if the floor is not in the list
  if (floor && floors && !floors.includes(floor)) {
    return null;
  }

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="rd-floor-select-label" shrink>
        Floor
      </InputLabel>
      <Select
        disabled={disabled || !floors.length}
        displayEmpty
        labelId="rd-floor-select-label"
        onChange={(evt) => {
          const newFloorInfo = [...floorInfo];
          const { value } = evt.target;
          newFloorInfo[index] = value;
          dispatch(setFloorInfo(newFloorInfo));
        }}
        renderValue={(val) => {
          return !val || val === '' ? '0' : val;
        }}
        style={{ textAlign: 'center' }}
        value={floor}
      >
        {floors.reverse().map((fl) => {
          return (
            <MenuItem key={`floor-${fl}`} value={fl}>
              {fl === '' ? '0' : fl}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

FloorSelect.propTypes = propTypes;

export default React.memo(FloorSelect);
