import * as types from './actionTypes';

import * as actions from './index';

describe('actions', () => {
  it('should create an action to set the current mot', () => {
    const currentMot = 'bus';
    const expectedAction = {
      currentMot,
      type: types.SET_CURRENT_MOT,
    };
    expect(actions.setCurrentMot(currentMot)).toEqual(expectedAction);
  });
  it('should create an action to set the click location', () => {
    const clickLocation = [25, 25];
    const expectedAction = {
      clickLocation,
      type: types.SET_CLICK_LOCATION,
    };
    expect(actions.setClickLocation(clickLocation)).toEqual(expectedAction);
  });
  it('should create an action to set the current stops GeoJSON', () => {
    // Create GeoJSON
    const tempGeoJSON = {
      features: [
        {
          geometry: {
            coordinates: [25, 25],
            type: 'Point',
          },
          properties: {
            id: [25, 25].slice().reverse(),
            type: 'coordinates',
          },
          type: 'Feature',
        },
      ],
      type: 'FeatureCollection',
    };
    const currentStopsGeoJSON = [tempGeoJSON];
    const expectedAction = {
      currentStopsGeoJSON,
      type: types.SET_CURRENT_STOPS_GEOJSON,
    };
    expect(actions.setCurrentStopsGeoJSON(currentStopsGeoJSON)).toEqual(
      expectedAction,
    );
  });
  it('should create an action to show a notification', () => {
    const notificationMessage = 'Notification Message';
    const notificationType = 'error';
    const expectedAction = {
      notificationMessage,
      notificationType,
      type: types.SHOW_NOTIFICATION,
    };
    expect(
      actions.showNotification(notificationMessage, notificationType),
    ).toEqual(expectedAction);
  });
});
