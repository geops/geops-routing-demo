import * as actionTypes from './actionTypes';

export const setZoom = (zoom) => {
  return {
    type: actionTypes.SET_ZOOM,
    zoom,
  };
};

export const setCenter = (center) => {
  return {
    center,
    type: actionTypes.SET_CENTER,
  };
};

export const setActiveFloor = (activeFloor) => {
  return {
    activeFloor,
    type: actionTypes.SET_ACTIVE_FLOOR,
  };
};

export const setFloorInfo = (floorInfo) => {
  return {
    floorInfo,
    type: actionTypes.SET_FLOOR_INFO,
  };
};

export const setCurrentStops = (currentStops) => {
  return {
    currentStops,
    type: actionTypes.SET_CURRENT_STOPS,
  };
};

export const setCurrentStopsGeoJSON = (currentStopsGeoJSON) => {
  return {
    currentStopsGeoJSON,
    type: actionTypes.SET_CURRENT_STOPS_GEOJSON,
  };
};

export const setCurrentMot = (currentMot) => {
  return {
    currentMot,
    type: actionTypes.SET_CURRENT_MOT,
  };
};

export const setClickLocation = (clickLocation) => {
  return {
    clickLocation,
    type: actionTypes.SET_CLICK_LOCATION,
  };
};

export const showNotification = (notificationMessage, notificationType) => {
  return {
    notificationMessage,
    notificationType,
    type: actionTypes.SHOW_NOTIFICATION,
  };
};

export const setIsFieldFocused = (isFieldFocused) => {
  return {
    isFieldFocused,
    type: actionTypes.SET_IS_FIELD_FOCUSED,
  };
};

export const setShowLoadingBar = (showLoadingBar) => {
  return {
    showLoadingBar,
    type: actionTypes.SET_SHOW_LOADING_BAR,
  };
};

export const setSelectedRoutes = (selectedRoutes) => {
  return {
    selectedRoutes,
    type: actionTypes.SET_SELECTED_ROUTES,
  };
};

export const setIsRouteInfoOpen = (isRouteInfoOpen) => {
  return {
    isRouteInfoOpen,
    type: actionTypes.SET_IS_ROUTE_INFO_OPEN,
  };
};

export const setDialogPosition = (dialogPosition) => {
  return {
    dialogPosition,
    type: actionTypes.SET_DIALOG_POSITION,
  };
};

export const setDialogSize = (dialogSize) => {
  return {
    dialogSize,
    type: actionTypes.SET_DIALOG_SIZE,
  };
};

export const setResolveHops = (resolveHops) => {
  return {
    resolveHops,
    type: actionTypes.SET_RESOLVE_HOPS,
  };
};

export const setTracks = (tracks) => {
  return {
    tracks,
    type: actionTypes.SET_TRACKS,
  };
};

export const setSearchMode = (searchMode) => {
  return {
    searchMode,
    type: actionTypes.SET_SEARCH_MODE,
  };
};

export const setMaxExtent = (maxExtent) => {
  return {
    maxExtent,
    type: actionTypes.SET_MAX_EXTENT,
  };
};

export const setGeneralizationEnabled = (generalizationEnabled) => {
  return {
    generalizationEnabled,
    type: actionTypes.SET_GENERALIZATION_ENABLED,
  };
};

export const setGeneralizationGraph = (generalizationGraph) => {
  return {
    generalizationGraph,
    type: actionTypes.SET_GENERALIZATION_GRAPH,
  };
};

export const setStyle = (style) => {
  return {
    style,
    type: actionTypes.SET_STYLE,
  };
};

export const setGeneralizationActive = (generalizationActive) => {
  return {
    generalizationActive,
    type: actionTypes.SET_GENERALIZATION_ACTIVE,
  };
};

export const setMode = (mode) => {
  return {
    mode,
    type: actionTypes.SET_MODE,
  };
};

export const setYamlSnippetDialogOpen = (yamlSnippetDialogOpen) => {
  return {
    type: actionTypes.SET_DEBUG_DIALOG_OPEN,
    yamlSnippetDialogOpen,
  };
};
