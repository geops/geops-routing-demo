import * as types from '../actions/actionTypes';

import mapReducer from './Map';

describe('map reducer', () => {
  it('should return the initial state', () => {
    const test = {
      center: [949042.143189, 5899715.591163],
      clickLocation: null,
      currentMot: 'rail',
      currentStops: ['', ''],
      currentStopsGeoJSON: [],
      dialogPosition: {
        x: 10,
        y: 280,
      },
      dialogSize: {
        height: 550,
        width: 500,
      },
      floorInfo: ['0', '0'],
      isFieldFocused: false,
      notificationMessage: '',
      notificationType: 'info',
      resolveHops: false,
      selectedRoutes: [],
      showLoadingBar: false,
    };
    Object.keys(test).forEach((state) => {
      expect(mapReducer(undefined, {})[state]).toEqual(test[state]);
    });
  });

  it('should handle SET_CURRENT_MOT first time', () => {
    expect(
      mapReducer(
        {},
        {
          currentMot: 'bus',
          type: types.SET_CURRENT_MOT,
        },
      ),
    ).toEqual({ currentMot: 'bus', isRouteInfoOpen: false });
  });

  it('should handle SET_CURRENT_MOT second time', () => {
    expect(
      mapReducer(
        { currentMot: 'bus' },
        {
          currentMot: 'train',
          type: types.SET_CURRENT_MOT,
        },
      ),
    ).toEqual({
      currentMot: 'train',
      isRouteInfoOpen: false,
    });
  });

  it('should handle SET_CURRENT_STOPS_GEOJSON', () => {
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
    expect(
      mapReducer(
        {},
        {
          currentStopsGeoJSON,
          type: types.SET_CURRENT_STOPS_GEOJSON,
        },
      ),
    ).toEqual({ currentStopsGeoJSON });
  });

  it('should handle SET_CLICK_LOCATION', () => {
    expect(
      mapReducer(
        {},
        {
          clickLocation: [25, 25],
          type: types.SET_CLICK_LOCATION,
        },
      ),
    ).toEqual({ clickLocation: [25, 25] });
  });

  it('should handle SHOW_NOTIFICATION', () => {
    expect(
      mapReducer(
        {},
        {
          notificationMessage: 'Notification Message',
          notificationType: 'error',
          type: types.SHOW_NOTIFICATION,
        },
      ),
    ).toEqual({
      notificationMessage: 'Notification Message',
      notificationType: 'error',
    });
  });
});
