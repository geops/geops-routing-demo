import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import { setTracks } from '../../store/actions/Map';

const propTypes = {
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool.isRequired,
};

const useStyles = makeStyles(() => ({
  wrapper: {
    width: '20%',
    padding: '0 20px 4px 20px',
  },
}));

const tracksValues = ['1', '2', '3', '4', ''];
/**
 * The component that displays the track selector
 */
function TrackSelect({ index, disabled }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const tracks = useSelector(state => state.MapReducer.tracks);
  const track = useMemo(() => tracks[index], [index, tracks]);

  return (
    <FormControl className={classes.wrapper}>
      <Select
        renderValue={val => (val === '' ? 'No Track' : val)}
        labelId="rd-track-select-label"
        value={track}
        displayEmpty
        disabled={disabled}
        onChange={evt => {
          const newTracks = [...tracks];
          const { value } = evt.target;
          newTracks[index] = value;
          dispatch(setTracks(newTracks));
        }}
      >
        {tracksValues.map(t => {
          return (
            <MenuItem value={t} key={`track-${t}`}>
              {t === '' ? 'No Track' : t}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
}

TrackSelect.propTypes = propTypes;

export default TrackSelect;
