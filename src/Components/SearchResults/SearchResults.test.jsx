import { render } from '@testing-library/react';
import { Map, View } from 'ol';
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { vi } from 'vitest';

import SearchResults from './SearchResults';

describe('Search Results', () => {
  const mockStore = configureStore([thunk]);

  it('should render self and subcomponents', () => {
    const props = {
      currentSearchResults: [
        {
          properties: {
            code: 'Test Code',
            country_code: 'Test Country Code',
            name: 'Test Name',
          },
        },
      ],
      processClickedResultHandler: vi.fn(),
    };

    const target = document.createElement('div');

    const map = new Map({
      target,
      view: new View({}),
    });

    const store = mockStore({
      MapReducer: {
        olMap: map,
      },
    });

    const { container } = render(
      <Provider store={store}>
        <SearchResults
          currentSearchResults={props.currentSearchResults}
          processClickedResultHandler={props.processClickedResultHandler}
        />
      </Provider>,
    );

    const navItem = container.querySelector('.MuiListItemText-primary');

    expect(navItem.textContent).toEqual(
      props.currentSearchResults[0].properties.name,
    );
  });
});
