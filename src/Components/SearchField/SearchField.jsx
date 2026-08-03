import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Adjust from '@mui/icons-material/Adjust';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Room from '@mui/icons-material/Room';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setIsFieldFocused, setIsRouteInfoOpen } from '../../store/actions/Map';
import { propTypeCurrentStops } from '../../store/prop-types';
import { to4326 } from '../../utils';
import FloorSelect from '../FloorSelect';
import TrackSelect from '../TrackSelect';

/**
 * The component that displays the search field(s)
 * @category RoutingMenu
 */
function SearchField({
  addNewSearchFieldHandler,
  currentMot,
  currentStops = [],
  index,
  inputReference,
  onFieldFocusHandler,
  onPanViaClick,
  processHighlightedResultSelectHandler,
  removeSearchFieldHandler,
  searchStopsHandler,
  singleStop = '',
}) {
  const dispatch = useDispatch();
  const showLoadingBar = useSelector((state) => {
    return state.MapReducer.showLoadingBar;
  });
  let fieldLeftIcon = null;
  let searchFieldLabel = '';

  const formatSingleStop = (val) => {
    return Array.isArray(val) ? to4326(val) : val;
  };
  const isStationName = useMemo(() => {
    return typeof singleStop === 'string' && singleStop !== '';
  }, [singleStop]);

  const addNextHopDisabled =
    currentStops[index] === '' ||
    (currentStops.length > 2 && currentStops[index + 1] === '');
  if (index === 0) {
    // Start station field
    fieldLeftIcon = <RadioButtonCheckedIcon color="primary" fontSize="small" />;
    searchFieldLabel = 'Start';
  } else if (index === currentStops.length - 1) {
    fieldLeftIcon = <Room color="primary" />;
    searchFieldLabel = 'End';
  } else {
    fieldLeftIcon = <Adjust color="primary" fontSize="small" />;
    searchFieldLabel = 'Hop';
  }
  return (
    <Grid
      alignItems="flex-end"
      container
      spacing={1}
      style={{ flexWrap: 'nowrap', padding: '2px 0px 2px 0px' }}
    >
      <Grid size={{ xs: 1 }} style={{ minWidth: 35, textAlign: 'right' }}>
        <Tooltip title="Change order of the via points">
          <span>
            <IconButton aria-label="dragHop" disabled size="small">
              <DragIndicatorIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
      <Grid
        size={{ xs: 1 }}
        style={{ minWidth: 30, paddingLeft: 0, textAlign: 'center' }}
      >
        <Tooltip title="Pan to the feature">
          <span>
            <IconButton
              onClick={() => {
                return onPanViaClick(singleStop, index);
              }}
              size="small"
            >
              {fieldLeftIcon}
            </IconButton>
          </span>
        </Tooltip>
      </Grid>
      <Grid size={{ xs: 7 }} style={{ minWidth: 100 }}>
        <TextField
          color="primary"
          fullWidth
          inputRef={inputReference}
          label={searchFieldLabel}
          onBlur={() => {
            return setTimeout(() => {
              dispatch(setIsFieldFocused(false));
            }, 500);
          }}
          onChange={(e) => {
            return searchStopsHandler(e, index);
          }}
          onClick={(event) => {
            if (event.target.select) {
              event.target.select();
            }
          }}
          onFocus={() => {
            // We close the route infos dialog otherwise we loose the focus
            dispatch(setIsRouteInfoOpen(false));
            dispatch(setIsFieldFocused(true));
            onFieldFocusHandler(index);
          }}
          onKeyDown={processHighlightedResultSelectHandler}
          value={formatSingleStop(singleStop)}
          variant="standard"
        />
      </Grid>
      <Grid size={{ xs: 2 }} style={{ maxWidth: 84, minWidth: 46 }}>
        {currentMot === 'foot' ? (
          <FloorSelect
            disabled={isStationName}
            index={index}
            singleStop={singleStop}
          />
        ) : (
          <TrackSelect disabled={!isStationName} index={index} />
        )}
      </Grid>
      <Grid
        size={{ xs: 1 }}
        style={{ maxWidth: 26, minWidth: 26, textAlign: 'center' }}
      >
        {index !== currentStops.length - 1 && (
          <Tooltip title="Add Via Point">
            <span>
              <IconButton
                aria-label="Add Via Point"
                disabled={addNextHopDisabled || showLoadingBar}
                onClick={() => {
                  return addNewSearchFieldHandler(currentStops, index + 1);
                }}
                size="small"
              >
                <AddCircleOutlineIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Grid>
      <Grid
        size={{ xs: 1 }}
        style={{ maxWidth: 26, minWidth: 26, textAlign: 'center' }}
      >
        {index !== 0 && index !== currentStops.length - 1 && (
          <Tooltip title="Remove Via Point">
            <span>
              <IconButton
                aria-label="removeHop"
                disabled={showLoadingBar}
                onClick={() => {
                  return removeSearchFieldHandler(index);
                }}
                size="small"
              >
                <RemoveCircleOutlineIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}

SearchField.propTypes = {
  addNewSearchFieldHandler: PropTypes.func.isRequired,
  currentMot: PropTypes.string.isRequired,
  currentStops: propTypeCurrentStops,
  index: PropTypes.number.isRequired,
  inputReference: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
  onFieldFocusHandler: PropTypes.func.isRequired,
  onPanViaClick: PropTypes.func.isRequired,
  processHighlightedResultSelectHandler: PropTypes.func.isRequired,
  removeSearchFieldHandler: PropTypes.func.isRequired,
  searchStopsHandler: PropTypes.func.isRequired,
  singleStop: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.number),
  ]),
};

export default SearchField;
