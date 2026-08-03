import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setTracks } from '../../store/actions/Map';

const propTypes = {
  disabled: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
};

/**
 * The component that displays the track selector
 */
function TrackSelect({ disabled, index }) {
  const dispatch = useDispatch();
  const tracks = useSelector((state) => {
    return state.MapReducer.tracks;
  });
  const currentMot = useSelector((state) => {
    return state.MapReducer.currentMot;
  });
  const currentStopsGeoJSON = useSelector((state) => {
    return state.MapReducer.currentStopsGeoJSON;
  });
  const track = useMemo(() => {
    return tracks[index];
  }, [index, tracks]);

  const tracksValues = useMemo(() => {
    return currentStopsGeoJSON[index] &&
      currentStopsGeoJSON[index].properties &&
      currentStopsGeoJSON[index].properties.platforms &&
      currentStopsGeoJSON[index].properties.platforms[currentMot]
      ? [
          '',
          ...currentStopsGeoJSON[index].properties.platforms[currentMot].sort(
            (a, b) => {
              return parseInt(a, 10) - parseInt(b, 10);
            },
          ),
        ]
      : [];
  }, [index, currentMot, currentStopsGeoJSON]);

  return (
    <FormControl fullWidth variant="standard">
      <InputLabel id="rd-track-select-label" shrink>
        Track
      </InputLabel>
      <Select
        disabled={disabled || !tracksValues.length}
        displayEmpty
        labelId="rd-track-select-label"
        onChange={(evt) => {
          const newTracks = [...tracks];
          const { value } = evt.target;
          newTracks[index] = value;
          dispatch(setTracks(newTracks));
        }}
        renderValue={(val) => {
          return val === '' ? '-' : val;
        }}
        style={{ textAlign: 'center' }}
        value={track || ''}
      >
        {tracksValues.map((t) => {
          return (
            <MenuItem key={`track-${t}`} value={t}>
              {t === '' ? '-' : t}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

TrackSelect.propTypes = propTypes;

export default TrackSelect;
