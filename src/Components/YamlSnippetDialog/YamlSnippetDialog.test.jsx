import { render } from '@testing-library/react';
import mediaQuery from 'css-mediaquery';
import { Map } from 'ol';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { debugLayer, routeVectorLayer } from '../../store/reducers/Map';

import fixture from './fixture';
import YamlSnippetDialog from './YamlSnippetDialog';

function createMatchMedia(width) {
  return (query) => {
    return {
      addEventListener: () => {},
      dispatchEvent: () => {
        return false;
      },
      matches: mediaQuery.match(query, { width }),
      media: query,
      onchange: null,
      removeEventListener: () => {},
    };
  };
}

describe('YamlSnippetDialog', () => {
  const mockStore = configureStore([thunk]);
  let store;
  // Mock desktop window size
  // https://mui.com/material-ui/react-use-media-query/#testing
  window.matchMedia = createMatchMedia(window.innerWidth);

  beforeEach(() => {
    store = mockStore({
      MapReducer: {
        center: [0, 0],
        currentMot: 'rail',
        currentStops: ['', ''],
        currentStopsGeoJSON: fixture.geoJson,
        debugLayer,
        floorInfo: [null, null],
        generalizationGraph: 'gen5',
        olMap: new Map({
          controls: [],
        }),
        resolveHops: false,
        routingLayer: routeVectorLayer,
        selectedRoutes: fixture.routes,
        tracks: [null, null],
      },
    });
  });

  it('should render the yaml code values correctly on desktop', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <YamlSnippetDialog />
      </Provider>,
    );
    expect(getByTestId('header').innerHTML).toBe('rail-xx:');
    expect(getByTestId('mot').innerHTML).toBe('rail');
    expect(getByTestId('viaString').innerHTML).toBe(
      "'!4be65028749bb705|!bed0b934e1c5647c'",
    );
    expect(getByTestId('expected-viastring-0').innerHTML).toBe(
      '    - 7.59589,47.54508',
    );
    expect(getByTestId('expected-viastring-1').innerHTML).toBe(
      '    - 7.6067,47.54596',
    );
    expect(getByTestId('expected-viastring-2').innerHTML).toBe(
      '    - 7.61551,47.54955',
    );
    expect(getByTestId('expected-viastring-3').innerHTML).toBe(
      '    - 7.61526,47.55715',
    );
    expect(getByTestId('expected-viastring-4').innerHTML).toBe(
      '    - 7.61035,47.56419',
    );
    expect(getByTestId('min_km').innerHTML).toBe('4.211');
    expect(getByTestId('max_km').innerHTML).toBe('4.467');
    expect(getByTestId('gen_graph').innerHTML).toBe('gen5');
  });

  it('should not render on mobile', async () => {
    window.matchMedia = createMatchMedia(375);
    const { container } = render(
      <Provider store={store}>
        <YamlSnippetDialog />
      </Provider>,
    );
    expect(container.innerHTML).toBeFalsy();
  });
});
