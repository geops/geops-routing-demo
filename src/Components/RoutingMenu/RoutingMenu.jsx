import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import {
  ArrowLeft,
  ArrowRight,
  BugReport,
  ExpandLess,
  ExpandMore,
  Info,
  ZoomIn,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Slide,
  Tab,
  Tabs,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { transformExtent } from 'ol/proj';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  DEFAULT_MOTS,
  OTHER_MOTS,
  SEARCH_MODES,
  VALID_MOTS,
} from '../../constants';
import {
  setClickLocation,
  setCurrentMot,
  setCurrentStops,
  setCurrentStopsGeoJSON,
  setFloorInfo,
  setGeneralizationActive,
  setIsFieldFocused,
  setIsRouteInfoOpen,
  setSearchMode,
  setSelectedRoutes,
  setShowLoadingBar,
  setTracks,
  setYamlSnippetDialogOpen,
  showNotification,
} from '../../store/actions/Map';
import { findMotIcon, to3857, to4326 } from '../../utils';
import RouteInfosDialog from '../RouteInfosDialog';
import SearchField from '../SearchField';
import SearchResults from '../SearchResults';

import './RoutingMenu.scss';

const COORD_REGEX = /^\d+\.?\d*,\d+\.?\d*$/;

const motHasGeneralization = (mot) => {
  return /^(rail|funicular|ferry|gondola|bus|tram|subway)$/.test(mot);
};

function TabPanel({ children, index = null, value = null }) {
  return (
    <Typography
      aria-labelledby={`simple-tab-${index}`}
      component="div"
      hidden={value !== index}
      role="tabpanel"
      style={{ paddingBottom: '10px', paddingTop: '10px' }}
    >
      {value === index && children}
    </Typography>
  );
}

const dropDownSx = {
  backgroundColor: 'white',
  width: 120,
};
const selectSx = {
  '& .MuiSelect-select': {
    backgroundColor: 'white',
    paddingLeft: '0px !important',
  },
  '& .MuiSelect-select:focus': {
    backgroundColor: 'white',
  },
  height: '80%',
  textAlign: 'center',
};

/**
 * The routing menu props
 * @typedef RoutingMenuProps
 * @type {props}
 * @property {string} stationSearchUrl The station search API used for searching.
 * @property {string} APIKey key obtained from geOps that enables you to used the previous API services.
 * @property {string[]} mots List of mots to be available (ex: ['bus', 'train'])
 * @property {LongLat} clickLocation The location clicked by the user in the form of [long,lat].
 * @category Props
 */
let abortController = new AbortController();

/**
 * Validate the mots provided from the props, then retrieve the icons for the valid ones.
 * @param mots The provided mots
 * @returns {Array} The valid mots with their icons
 * @category RoutingMenu
 */
const validateMots = (motsArray, validationMots) => {
  const currentMotsArray = [];

  motsArray
    .filter((mot) => {
      return validationMots.includes(mot);
    })
    .forEach((providedMot) => {
      const requestedMot = validationMots.find((mot) => {
        return mot === providedMot;
      });
      if (requestedMot) {
        currentMotsArray.push({
          icon: findMotIcon(requestedMot),
          name: requestedMot,
        });
      }
    });
  if (currentMotsArray.length === 0) {
    currentMotsArray.push({
      icon: findMotIcon(VALID_MOTS[0]),
      name: VALID_MOTS[0],
    });
  }
  return currentMotsArray;
};

// Currently no 'coach' mot available for stop finder.
const handleStopFinderMot = (mot) => {
  if (mot === 'coach') {
    return 'bus';
  }
  if (mot === 'foot') {
    return '';
  }
  return mot;
};

/**
 * The routing menu that controls station search
 * @category RoutingMenu
 */
function RoutingMenu({
  APIKey,
  clearHighlightPoint,
  hoveredCoords = null,
  isActiveRoute,
  mots,
  onDrawNewRoute,
  onHighlightPoint,
  onPanViaClick = undefined,
  onZoomRouteClick = undefined,
  stationSearchUrl,
}) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const dispatch = useDispatch();

  const currentMotsVal = validateMots(mots, DEFAULT_MOTS);
  const otherMotsVal = validateMots(mots, OTHER_MOTS);

  const floorInfo = useSelector((state) => {
    return state.MapReducer.floorInfo;
  });
  const center = useSelector((state) => {
    return state.MapReducer.center;
  });
  const tracks = useSelector((state) => {
    return state.MapReducer.tracks;
  });
  const clickLocation = useSelector((state) => {
    return state.MapReducer.clickLocation;
  });
  const activeFloor = useSelector((state) => {
    return state.MapReducer.activeFloor;
  });
  const currentStops = useSelector((state) => {
    return state.MapReducer.currentStops;
  });
  const selectedRoutes = useSelector((state) => {
    return state.MapReducer.selectedRoutes;
  });
  const showLoadingBar = useSelector((state) => {
    return state.MapReducer.showLoadingBar;
  });
  const maxExtent = useSelector((state) => {
    return state.MapReducer.maxExtent;
  });
  const isRouteInfoOpen = useSelector((state) => {
    return state.MapReducer.isRouteInfoOpen;
  });
  const currentStopsGeoJSON = useSelector((state) => {
    return state.MapReducer.currentStopsGeoJSON;
  });
  const currentMot = useSelector((state) => {
    return state.MapReducer.currentMot;
  });
  const searchMode = useSelector((state) => {
    return state.MapReducer.searchMode;
  });
  const generalizationEnabled = useSelector((state) => {
    return state.MapReducer.generalizationEnabled;
  });
  const generalizationActive = useSelector((state) => {
    return state.MapReducer.generalizationActive;
  });
  const mode = useSelector((state) => {
    return state.MapReducer.mode;
  });
  const yamlSnippetDialogOpen = useSelector((state) => {
    return state.MapReducer.yamlSnippetDialogOpen;
  });

  const [currentMots] = useState(currentMotsVal);
  const [otherMots] = useState(otherMotsVal);
  const [currentSearchResults, setCurrentSearchResults] = useState([]);
  const [focusedFieldIndex, setFocusedFieldIndex] = useState(0);
  const [currentOtherMot, setCurrentOtherMot] = useState(undefined);
  const [menuVisible, setMenuVisible] = useState(true);

  const elRefs = React.useRef([]);
  if (elRefs.current.length !== currentStops.length) {
    elRefs.current = Array(currentStops.length)
      .fill()
      .map((el, i) => {
        return elRefs.current[i] || React.createRef();
      });
  }

  useEffect(() => {
    if (isRouteInfoOpen) {
      dispatch(setSelectedRoutes([]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStops]);

  /**
   * If a location was received through the props (user click on map) act accordingly.
   * @category RoutingMenu
   */
  useEffect(() => {
    if (clickLocation) {
      currentStops[focusedFieldIndex] = clickLocation;
      if (currentStops.length !== currentStopsGeoJSON.length) {
        currentStopsGeoJSON.splice(focusedFieldIndex, 0, null);
      }

      if (currentStops.length !== floorInfo.length) {
        floorInfo.splice(focusedFieldIndex, 0, '0');
      }

      if (currentStops.length !== tracks.length) {
        tracks.splice(focusedFieldIndex, 0, '');
      }

      tracks[focusedFieldIndex] = '';

      // If an active floor is set, we set the floor to the active floor
      // then the floorSelect component will decide if the floor exist or not
      if (activeFloor && activeFloor !== '2D') {
        floorInfo[focusedFieldIndex] = activeFloor;
      }

      // Create GeoJSON
      currentStopsGeoJSON[focusedFieldIndex] = {
        geometry: {
          coordinates: clickLocation,
          type: 'Point',
        },
        properties: {
          id: clickLocation.toString(),
          type: 'coordinates',
        },
        type: 'Feature',
      };

      // Move the focus to the next field
      const nextFocusFieldIdx =
        focusedFieldIndex + 1 < currentStops.length
          ? focusedFieldIndex + 1
          : focusedFieldIndex;

      // Make sure we only goes here once when the clickLocation has been modified.
      dispatch(setClickLocation(null));
      dispatch(setTracks([...tracks]));
      dispatch(setFloorInfo([...floorInfo]));
      dispatch(setCurrentStops([...currentStops]));
      dispatch(setCurrentStopsGeoJSON([...currentStopsGeoJSON]));
      setFocusedFieldIndex(nextFocusFieldIdx);
    }
  }, [
    activeFloor,
    clickLocation,
    currentStops,
    currentStopsGeoJSON,
    dispatch,
    floorInfo,
    focusedFieldIndex,
    tracks,
  ]);

  /**
   * Process changing the current selected mot, save in local state and dispatch store action.
   * @param event The change event
   * @param newMot The new selected mot
   * @category RoutingMenu
   */
  const handleMotChange = (event, newMot, tracksVal) => {
    const newTracks = [...tracksVal].map(() => {
      return '';
    });
    setCurrentOtherMot(null);
    dispatch(setTracks(newTracks));
    dispatch(setCurrentMot(newMot));
  };

  /**
   * Gets callled when a search field is in focus. Keep track of the last focused/selected field.
   * @param fieldIndex The search field index(order)
   * @category RoutingMenu
   */
  const onFieldFocusHandler = (fieldIndex) => {
    setFocusedFieldIndex(fieldIndex);
    dispatch(setIsFieldFocused(true));
  };

  /**
   * Create a new search field (hop) between already existing search fields
   * @param indexToInsertAt The index to insert the new search field at.
   * @category RoutingMenu
   */
  const addNewSearchFieldHandler = (currStops, indexToInsertAt) => {
    tracks.splice(indexToInsertAt, 0, '');
    floorInfo.splice(indexToInsertAt, 0, '0');
    currentStops.splice(indexToInsertAt, 0, '');
    currentStopsGeoJSON.splice(indexToInsertAt, 0, null);

    dispatch(setTracks([...tracks]));
    dispatch(setFloorInfo([...floorInfo]));
    dispatch(setCurrentStops([...currentStops]));
    dispatch(setCurrentStopsGeoJSON([...currentStopsGeoJSON]));
    setFocusedFieldIndex(indexToInsertAt);
  };

  /**
   * Remove a search field (hop) from a defined index. Then dispatch an update to the stops,
   * so that the route can be updated if exists.
   * @param indexToRemoveFrom The index to remove the search field from.
   * @category RoutingMenu
   */
  const removeSearchFieldHandler = (indexToRemoveFrom) => {
    tracks.splice(indexToRemoveFrom, 1);
    floorInfo.splice(indexToRemoveFrom, 1);
    currentStops.splice(indexToRemoveFrom, 1);
    currentStopsGeoJSON.splice(indexToRemoveFrom, 1);

    dispatch(setTracks([...tracks]));
    dispatch(setFloorInfo([...floorInfo]));
    dispatch(setCurrentStops([...currentStops]));
    dispatch(setCurrentStopsGeoJSON([...currentStopsGeoJSON]));
  };

  /**
   * Perform searching for stations through the station API
   * @param event
   * @param fieldIndex The search field(hop) index(order)
   * @category RoutingMenu
   */
  const searchStopsHandler = (event, fieldIndex) => {
    // only search if text is available
    if (!event.target.value) {
      // Reset the track value.
      tracks[fieldIndex] = '';
      floorInfo[fieldIndex] = '0';
      currentStops[fieldIndex] = '';
      currentStopsGeoJSON[fieldIndex] = null;

      setCurrentSearchResults([]);
      dispatch(setTracks([...tracks]));
      dispatch(setFloorInfo([...floorInfo]));
      dispatch(setCurrentStops([...currentStops]));
      dispatch(setCurrentStopsGeoJSON([...currentStopsGeoJSON]));
      dispatch(setShowLoadingBar(false));
      return;
    }

    const stop = event.target.value;

    const isCoord =
      typeof stop === 'string' && stop !== '' && COORD_REGEX.test(stop);

    // if the string is a coordinate
    if (isCoord) {
      // Convert the string to a coordinate
      const coords = to3857(stop.split(','));
      currentStops[fieldIndex] = coords;
      currentStopsGeoJSON[fieldIndex] = {
        geometry: {
          coordinates: coords,
          type: 'Point',
        },
        properties: {
          id: coords.toString(),
          type: 'coordinates',
        },
        type: 'Feature',
      };
    } else {
      currentStops[fieldIndex] = event.target.value;
      currentStopsGeoJSON[fieldIndex] = null;
    }

    tracks[fieldIndex] = '';
    floorInfo[fieldIndex] = '0';

    dispatch(setTracks([...tracks]));
    dispatch(setFloorInfo([...floorInfo]));
    dispatch(setCurrentStops([...currentStops]));
    dispatch(setCurrentStopsGeoJSON([...currentStopsGeoJSON]));

    abortController.abort();

    if (isCoord) {
      setCurrentSearchResults([]);
      return;
    }

    abortController = new AbortController();
    const { signal } = abortController;
    const q = event.target.value;

    const reqUrl = `${stationSearchUrl}?q=${q}&key=${APIKey}${`&mots=${handleStopFinderMot(
      currentMot,
    )}`}&ref_location=${to4326(center)
      .reverse()
      .join(',')}&limit=10&bbox=${transformExtent(
      maxExtent,
      'EPSG:3857',
      'EPSG:4326',
    ).toString()}`;

    fetch(reqUrl, { signal })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          dispatch(showNotification("Couldn't find stations", 'warning'));
          return;
        }

        // Show only the notification when it make sense, the server returns results only when there is at least 2 letters.
        if (q && q.length >= 2 && response.features.length === 0) {
          dispatch(showNotification("Couldn't find stations", 'warning'));
        }

        setCurrentSearchResults(response.features);
        dispatch(setShowLoadingBar(false));
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
  };

  /**
   * The user makes changes to the current search. Either select the first result,
   * or delete the text to make a new search.
   * @param event
   * @category RoutingMenu
   */
  const processHighlightedResultSelectHandler = (event) => {
    const [firstSearchResult] = currentSearchResults;
    if (event.key === 'Enter' && firstSearchResult) {
      // The user has chosen the first result by pressing 'Enter' key on keyboard
      currentStops[focusedFieldIndex] = firstSearchResult.properties.name;
      currentStopsGeoJSON[focusedFieldIndex] = firstSearchResult;
      dispatch(setCurrentStops([...currentStops]));
      dispatch(setCurrentStopsGeoJSON([...currentStopsGeoJSON]));
      setCurrentSearchResults([]);
    }
  };

  /**
   * The user uses the mouse/touch to select one of the search results.
   * @param searchResult The clicked search result.
   * @category RoutingMenu
   */
  const processClickedResultHandler = (searchResult) => {
    currentStops[focusedFieldIndex] = searchResult.properties.name;

    // Add an element to the array if necessary
    if (currentStops.length !== currentStopsGeoJSON.length) {
      currentStopsGeoJSON.splice(focusedFieldIndex, 0, null);
    }

    if (currentStops.length !== floorInfo.length) {
      floorInfo.splice(focusedFieldIndex, 0, '0');
    }

    if (currentStops.length !== tracks.length) {
      tracks.splice(focusedFieldIndex, 0, '');
    }

    tracks[focusedFieldIndex] = '';
    floorInfo[focusedFieldIndex] = '0';
    currentStopsGeoJSON[focusedFieldIndex] = searchResult;
    currentStopsGeoJSON[focusedFieldIndex].geometry.coordinates = to3857(
      searchResult.geometry.coordinates,
    );

    setCurrentSearchResults([]);
    dispatch(setTracks([...tracks]));
    dispatch(setFloorInfo([...floorInfo]));
    dispatch(setCurrentStops([...currentStops]));
    dispatch(setCurrentStopsGeoJSON([...currentStopsGeoJSON]));
  };

  const changeCurrentOtherMot = (evt) => {
    if (!evt) {
      setCurrentOtherMot(null);
    } else {
      const { value } = evt.target;
      handleMotChange({}, value, tracks);
      setCurrentOtherMot(value);
    }
  };

  const getItemStyle = (isDragging, draggableStyle) => {
    return {
      background: isDragging ? '#ededed' : 'white',
      userSelect: 'none',
      ...draggableStyle,
    };
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    let [removed] = currentStops.splice(result.source.index, 1);
    currentStops.splice(result.destination.index, 0, removed);

    [removed] = currentStopsGeoJSON.splice(result.source.index, 1);
    currentStopsGeoJSON.splice(result.destination.index, 0, removed);

    [removed] = tracks.splice(result.source.index, 1);
    tracks.splice(result.destination.index, 0, removed);

    [removed] = floorInfo.splice(result.source.index, 1);
    floorInfo.splice(result.destination.index, 0, removed);

    dispatch(setTracks([...tracks]));
    dispatch(setFloorInfo([...floorInfo]));
    dispatch(setCurrentStops([...currentStops]));
    dispatch(setCurrentStopsGeoJSON([...currentStopsGeoJSON]));
  };

  /**
   * Render the component to the dom.
   * @category RoutingMenu
   */

  if (!onZoomRouteClick || !onPanViaClick) {
    return null;
  }

  return (
    <div className="rd-routing-menu">
      <Slide
        direction={isDesktop ? 'right' : 'down'}
        in={menuVisible}
        mountOnEnter
        unmountOnExit
      >
        <Paper elevation={3} square>
          <div style={{ height: 5 }}>
            {showLoadingBar ? <LinearProgress /> : null}
          </div>
          <Box
            sx={(theme) => {
              return {
                display: 'flex',
                gap: '10px',
                [theme.breakpoints.only('xs')]: {
                  flexWrap: 'wrap',
                  width: '100%',
                },
                width: 'calc(100% - 32px)',
              };
            }}
          >
            <Tabs
              aria-label="mots icons"
              indicatorColor="primary"
              onChange={(e, mot) => {
                handleMotChange(e, mot, tracks);
              }}
              sx={(theme) => {
                return {
                  [theme.breakpoints.only('xs')]: {
                    width: '100%',
                  },
                };
              }}
              textColor="primary"
              value={DEFAULT_MOTS.includes(currentMot) ? currentMot : false}
            >
              {currentMots.map((singleMot) => {
                const { icon, name } = singleMot;
                const capitalName =
                  name.charAt(0).toUpperCase() + name.slice(1);
                return (
                  <Tooltip key={`mot-${name}`} title={capitalName} value={name}>
                    <Tab
                      aria-label={name}
                      disabled={showLoadingBar}
                      icon={icon}
                      sx={(theme) => {
                        return {
                          minWidth: 100,
                          [theme.breakpoints.only('sm')]: {
                            minWidth: 90,
                          },
                          [theme.breakpoints.only('xs')]: {
                            minWidth: 100,
                            width: '33%',
                          },
                        };
                      }}
                      value={name}
                    />
                  </Tooltip>
                );
              })}
            </Tabs>
            <Box
              sx={(theme) => {
                return {
                  alignItems: 'center',
                  display: 'flex',
                  gap: 2,
                  [theme.breakpoints.only('xs')]: {
                    margin: '0 20px',
                    width: '100%',
                  },
                };
              }}
            >
              {otherMots.length ? (
                <FormControl sx={dropDownSx}>
                  <Select
                    disabled={showLoadingBar}
                    displayEmpty
                    labelId="rd-other-mot-label"
                    onChange={changeCurrentOtherMot}
                    renderValue={(val) => {
                      return val !== '' ? val : 'Other MOTs';
                    }}
                    sx={selectSx}
                    value={currentOtherMot || ''}
                    variant="standard"
                  >
                    {otherMots.map((mot) => {
                      return (
                        <MenuItem
                          key={`other-mot-${mot.name}`}
                          value={mot.name}
                        >
                          {mot.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              ) : null}
              {currentMot === 'foot' ? (
                <FormControl sx={dropDownSx}>
                  <Select
                    labelId="rd-other-mot-label"
                    onChange={(evt) => {
                      return dispatch(setSearchMode(evt.target.value));
                    }}
                    renderValue={(val) => {
                      return val;
                    }}
                    sx={selectSx}
                    value={searchMode}
                    variant="standard"
                  >
                    {SEARCH_MODES.map((option) => {
                      return (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              ) : null}
              {mode === 'dev' && isDesktop ? (
                <Tooltip title="Toggle YAML test snippet">
                  <IconButton
                    color={yamlSnippetDialogOpen ? 'primary' : 'default'}
                    onClick={() => {
                      dispatch(
                        setYamlSnippetDialogOpen(!yamlSnippetDialogOpen),
                      );
                    }}
                  >
                    <BugReport />
                  </IconButton>
                </Tooltip>
              ) : null}
              {motHasGeneralization(currentMot) && generalizationEnabled ? (
                <Tooltip title="Toggle generalization">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={generalizationActive}
                        onChange={() => {
                          return dispatch(
                            setGeneralizationActive(!generalizationActive),
                          );
                        }}
                      />
                    }
                    disabled={showLoadingBar}
                    label="Generalization"
                    sx={{
                      '& .MuiFormControlLabel-label': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      },
                      overflow: 'hidden',
                    }}
                    variant="standard"
                  />
                </Tooltip>
              ) : null}
            </Box>
          </Box>
          <TabPanel padding={10}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: 'white',
                      }}
                    >
                      {currentStops.map((item, index) => {
                        return (
                          <Draggable
                            draggableId={`searchField-${index}`}
                            index={index}
                            key={`searchField-${index}`}
                          >
                            {(prov, snpsht) => {
                              return (
                                <div
                                  ref={prov.innerRef}
                                  {...prov.draggableProps}
                                  {...prov.dragHandleProps}
                                  style={getItemStyle(
                                    snpsht.isDragging,
                                    prov.draggableProps.style,
                                  )}
                                >
                                  <SearchField
                                    addNewSearchFieldHandler={
                                      addNewSearchFieldHandler
                                    }
                                    currentMot={currentMot}
                                    currentStops={currentStops}
                                    index={index}
                                    inputReference={elRefs.current[index]}
                                    key={`searchField-${index}`}
                                    onFieldFocusHandler={onFieldFocusHandler}
                                    onPanViaClick={onPanViaClick}
                                    processHighlightedResultSelectHandler={
                                      processHighlightedResultSelectHandler
                                    }
                                    removeSearchFieldHandler={
                                      removeSearchFieldHandler
                                    }
                                    searchStopsHandler={searchStopsHandler}
                                    singleStop={item}
                                  />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
            <SearchResults
              currentSearchResults={currentSearchResults}
              processClickedResultHandler={processClickedResultHandler}
            />
            <Grid container padding={3} style={{ paddingBottom: 10 }}>
              <Grid size={{ xs: 6 }}>
                <Tooltip title="Zoom to the route">
                  <span>
                    <Button
                      disabled={!isActiveRoute}
                      onClick={() => {
                        return onZoomRouteClick();
                      }}
                      startIcon={<ZoomIn fontSize="small" />}
                    >
                      Zoom to the route
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
              <Grid size={{ xs: 6 }} textAlign="right">
                <Tooltip title="Route information">
                  <span>
                    <Button
                      disabled={!isActiveRoute}
                      onClick={() => {
                        return isRouteInfoOpen
                          ? dispatch(setIsRouteInfoOpen(false))
                          : onDrawNewRoute(true).then(() => {
                              dispatch(setIsRouteInfoOpen(true));
                            });
                      }}
                      selected={isRouteInfoOpen}
                      startIcon={<Info fontSize="small" />}
                      variant={isRouteInfoOpen ? 'contained' : 'text'}
                    >
                      Route information
                    </Button>
                  </span>
                </Tooltip>
              </Grid>
            </Grid>
            {isRouteInfoOpen && selectedRoutes.length ? (
              <RouteInfosDialog
                clearHighlightPoint={clearHighlightPoint}
                closeInfo={() => {
                  return dispatch(setIsRouteInfoOpen(false));
                }}
                hoveredCoords={hoveredCoords}
                onHighlightPoint={onHighlightPoint}
                routes={selectedRoutes}
              />
            ) : null}
          </TabPanel>
          <button
            className="rd-routing-menu-toggle-close"
            onClick={() => {
              return setMenuVisible(false);
            }}
            type="button"
          >
            {isDesktop ? <ArrowLeft /> : <ExpandLess />}
          </button>
        </Paper>
      </Slide>
      {!menuVisible && (
        <button
          className="rd-routing-menu-toggle-open"
          onClick={() => {
            return setMenuVisible(true);
          }}
          type="button"
        >
          {isDesktop ? <ArrowRight /> : <ExpandMore />}
        </button>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number,
  value: PropTypes.string,
};

RoutingMenu.propTypes = {
  APIKey: PropTypes.string.isRequired,
  clearHighlightPoint: PropTypes.func.isRequired,
  hoveredCoords: PropTypes.arrayOf(PropTypes.number),
  isActiveRoute: PropTypes.bool.isRequired,
  mots: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDrawNewRoute: PropTypes.func.isRequired,
  onHighlightPoint: PropTypes.func.isRequired,
  onPanViaClick: PropTypes.func,
  onZoomRouteClick: PropTypes.func,
  stationSearchUrl: PropTypes.string.isRequired,
};

export default RoutingMenu;
