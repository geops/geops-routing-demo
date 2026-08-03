import { render } from '@testing-library/react';
import { Map } from 'ol';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import Permalink from './Permalink';

describe('Permalink', () => {
  const mockStore = configureStore([thunk]);
  let store;

  beforeEach(() => {
    store = mockStore({
      MapReducer: {
        center: [0, 0],
        currentMot: 'rail',
        currentStops: ['', ''],
        currentStopsGeoJSON: [],
        floorInfo: [null, null],
        olMap: new Map({
          controls: [],
        }),
        resolveHops: false,
        tracks: [null, null],
      },
    });
  });

  it('should not dispatch search params in default state', () => {
    Object.defineProperty(window, 'location', {
      value: {
        search: '',
      },
      writable: true,
    });

    render(
      <Provider store={store}>
        <Permalink
          APIKey="foobar"
          mots={['rail', 'bus']}
          stationSearchUrl="https://foo.bar"
        />
      </Provider>,
    );

    expect(store.getActions().length).toBe(0);
  });

  it('should dispatch defined URL search params', () => {
    const searchString =
      '?via=!7e7dbbe3be4bc3a6|!a4dca961d199ff76&mot=bus&resolve-hops=true&elevation=2&barrier-free=true';

    Object.defineProperty(window, 'location', {
      value: {
        search: searchString,
      },
      writable: true,
    });

    render(
      <Provider store={store}>
        <Permalink
          APIKey="foobar"
          mots={['rail', 'bus']}
          stationSearchUrl="https://foo.bar"
        />
      </Provider>,
    );

    expect(store.getActions()[0]).toEqual({
      currentMot: 'bus',
      type: 'SET_CURRENT_MOT',
    });

    expect(store.getActions()[2]).toEqual({
      resolveHops: true,
      type: 'SET_RESOLVE_HOPS',
    });

    expect(store.getActions()[3]).toEqual({
      searchMode: 'barrier-free',
      type: 'SET_SEARCH_MODE',
    });
  });
});
