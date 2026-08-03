import { MaplibreLayer } from 'mobility-toolbox-js/ol';
import { Map } from 'ol';
import { Group, Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';

import {
  DEFAULT_SEARCH_MODE,
  EUROPE_EXTENT,
  FLOOR_LEVELS,
} from '../../constants';
import LevelLayer from '../../layers/LevelLayer';
import * as actionTypes from '../actions/actionTypes';

const apiKey = import.meta.env.VITE_API_KEY;

const baseLayer = new MaplibreLayer({
  apiKey,
  name: 'data',
  style: 'travic_v2',
  visible: true,
});

export const debugLayer = new VectorLayer({
  source: new VectorSource({}),
  zIndex: 999,
});

const highlightLayer = new VectorLayer({
  key: 'highlightLayer',
  name: 'highlightLayer',
  source: new VectorSource({}),
  zIndex: 1,
});

export const routeVectorLayer = new VectorLayer({
  key: 'routeLayer',
  name: 'routeLayer',
  source: new VectorSource({
    features: [],
  }),
  zIndex: 1,
});

const markerVectorLayer = new VectorLayer({
  key: 'markerLayer',
  name: 'markerLayer',
  source: new VectorSource({}),
  zIndex: 1,
});

const levelLayers = FLOOR_LEVELS.map((level) => {
  return new LevelLayer({
    level,
    mapboxLayer: baseLayer,
    name: `ch.sbb.geschosse${level}`,
    styleLayersFilter: ({ metadata }) => {
      return (
        metadata &&
        (metadata['geops.filter'] === '2D' ||
          metadata['geops.filter'] === 'level') &&
        // Return the filter if it exists
        metadata['geops.filter']
      );
    },
    visible: level === '2D',
  });
});
const geschosseLayer = new Group({
  layers: levelLayers,
  name: 'ch.sbb.geschosse',
  visible: true,
});
levelLayers.forEach((layer) => {
  layer.set('parent', geschosseLayer);
});

const layers = [
  baseLayer,
  geschosseLayer,
  routeVectorLayer,
  markerVectorLayer,
  highlightLayer,
  debugLayer,
];

const initialState = {
  activeFloor: '2D',
  apiKey,
  baseLayer,
  center: [949042.143189, 5899715.591163],
  clickLocation: null,
  currentMot: 'rail',
  currentStops: ['', ''],
  currentStopsGeoJSON: [],
  debugLayer,
  dialogPosition: {
    x: 10,
    y: 280,
  },
  dialogSize: {
    height: 550,
    width: 500,
  },
  floorInfo: ['0', '0'],
  generalizationActive: false,
  generalizationEnabled: false,
  generalizationGraph: null,
  geschosseLayer,
  highlightLayer,
  isDesktop: true,
  isFieldFocused: false,
  isRouteInfoOpen: false,
  layers,
  markerLayer: markerVectorLayer,
  maxExtent: EUROPE_EXTENT,
  mode: undefined,
  notificationMessage: '',
  notificationType: 'info',
  olMap: new Map({
    controls: [],
  }),
  resolveHops: false,
  routingLayer: routeVectorLayer,
  searchMode: DEFAULT_SEARCH_MODE,
  selectedRoutes: [],
  showLoadingBar: false,
  tracks: [null, null],
  yamlSnippetDialogOpen: false,
  zoom: 6,
};

const setZoom = (state, action) => {
  return {
    ...state,
    zoom: action.zoom,
  };
};

const setCenter = (state, action) => {
  const updatedState = {
    center: action.center,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setActiveFloor = (state, action) => {
  const updatedState = {
    activeFloor: action.activeFloor,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setFloorInfo = (state, action) => {
  const updatedState = {
    floorInfo: action.floorInfo,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setCurrentStops = (state, action) => {
  const updatedState = {
    currentStops: action.currentStops,
    isRouteInfoOpen: false,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setCurrentStopsGeoJSON = (state, action) => {
  const updatedState = {
    currentStopsGeoJSON: action.currentStopsGeoJSON,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setCurrentMot = (state, action) => {
  const updatedState = {
    currentMot: action.currentMot,
    isRouteInfoOpen: false,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setClickLocation = (state, action) => {
  const updatedState = {
    clickLocation: action.clickLocation,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const showNotification = (state, action) => {
  const updatedState = {
    notificationMessage: action.notificationMessage,
    notificationType: action.notificationType,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setIsFieldFocused = (state, action) => {
  const updatedState = {
    isFieldFocused: action.isFieldFocused,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setShowLoadingBar = (state, action) => {
  const updatedState = {
    showLoadingBar: action.showLoadingBar,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setSelectedRoutes = (state, action) => {
  const updatedState = {
    selectedRoutes: action.selectedRoutes,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setIsRouteInfoOpen = (state, action) => {
  const updatedState = {
    isRouteInfoOpen: action.isRouteInfoOpen,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setDialogPosition = (state, action) => {
  const updatedState = {
    dialogPosition: action.dialogPosition,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setDialogSize = (state, action) => {
  return {
    ...state,
    dialogPosition: {
      x: action.dialogSize.x,
      y: action.dialogSize.y,
    },
    dialogSize: {
      height: action.dialogSize.height,
      width: action.dialogSize.width,
    },
  };
};

const setResolveHops = (state, action) => {
  const updatedState = {
    resolveHops: action.resolveHops,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setTracks = (state, action) => {
  const updatedState = {
    isRouteInfoOpen: false,
    tracks: action.tracks,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setSearchMode = (state, action) => {
  const updatedState = {
    isRouteInfoOpen: false,
    searchMode: action.searchMode,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setMaxExtent = (state, action) => {
  const updatedState = {
    maxExtent: action.maxExtent,
  };
  return {
    ...state,
    ...updatedState,
  };
};

const setGeneralizationEnabled = (state, action) => {
  return {
    ...state,
    generalizationActive: !action.generalizationEnabled
      ? false
      : state.generalizationActive,
    generalizationEnabled: action.generalizationEnabled,
  };
};

const setGeneralizationGraph = (state, action) => {
  return {
    ...state,
    generalizationGraph: action.generalizationGraph,
  };
};

const setGeneralizationActive = (state, action) => {
  return {
    ...state,
    generalizationActive: action.generalizationActive,
  };
};

const setMode = (state, action) => {
  return {
    ...state,
    mode: action.mode,
  };
};

const setYamlSnippetDialogOpen = (state, action) => {
  return {
    ...state,
    yamlSnippetDialogOpen: action.yamlSnippetDialogOpen,
  };
};

const setStyle = (state, action) => {
  return {
    ...state,
    style: action.style,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ACTIVE_FLOOR:
      return setActiveFloor(state, action);
    case actionTypes.SET_CENTER:
      return setCenter(state, action);
    case actionTypes.SET_CLICK_LOCATION:
      return setClickLocation(state, action);
    case actionTypes.SET_CURRENT_MOT:
      return setCurrentMot(state, action);
    case actionTypes.SET_CURRENT_STOPS:
      return setCurrentStops(state, action);
    case actionTypes.SET_CURRENT_STOPS_GEOJSON:
      return setCurrentStopsGeoJSON(state, action);
    case actionTypes.SET_DEBUG_DIALOG_OPEN:
      return setYamlSnippetDialogOpen(state, action);
    case actionTypes.SET_DIALOG_POSITION:
      return setDialogPosition(state, action);
    case actionTypes.SET_DIALOG_SIZE:
      return setDialogSize(state, action);
    case actionTypes.SET_FLOOR_INFO:
      return setFloorInfo(state, action);
    case actionTypes.SET_GENERALIZATION_ACTIVE:
      return setGeneralizationActive(state, action);
    case actionTypes.SET_GENERALIZATION_ENABLED:
      return setGeneralizationEnabled(state, action);
    case actionTypes.SET_GENERALIZATION_GRAPH:
      return setGeneralizationGraph(state, action);
    case actionTypes.SET_IS_FIELD_FOCUSED:
      return setIsFieldFocused(state, action);
    case actionTypes.SET_IS_ROUTE_INFO_OPEN:
      return setIsRouteInfoOpen(state, action);
    case actionTypes.SET_MAX_EXTENT:
      return setMaxExtent(state, action);
    case actionTypes.SET_MODE:
      return setMode(state, action);
    case actionTypes.SET_RESOLVE_HOPS:
      return setResolveHops(state, action);
    case actionTypes.SET_SEARCH_MODE:
      return setSearchMode(state, action);
    case actionTypes.SET_SELECTED_ROUTES:
      return setSelectedRoutes(state, action);
    case actionTypes.SET_SHOW_LOADING_BAR:
      return setShowLoadingBar(state, action);
    case actionTypes.SET_STYLE:
      return setStyle(state, action);
    case actionTypes.SET_TRACKS:
      return setTracks(state, action);
    case actionTypes.SET_ZOOM:
      return setZoom(state, action);
    case actionTypes.SHOW_NOTIFICATION:
      return showNotification(state, action);
    default:
      return state;
  }
};

export default reducer;
