import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store/store';
import MapComponent from '../MapComponent';
import RoutingMenu from '../RoutingMenu';
import NotificationHandler from '../NotificationHandler';
import { VALID_MOTS } from '../../constants';

const propTypes = {
  routingUrl: PropTypes.string,
  stationSearchUrl: PropTypes.string,
  mots: PropTypes.arrayOf(PropTypes.string),
};

const defaultProps = {
  mots: VALID_MOTS,
  routingUrl: 'https://api.geops.io/routing/dev/',
  stationSearchUrl: 'https://api.geops.io/stops/dev/',
};

/**
 * Root component of the application that holds all other sub-components.
 * @param {string[]} mots List of mots to be available (ex: ['bus', 'train'])
 * @param {string} routingUrl The API routing url to be used for navigation.
 * @param {string} stationSearchUrl The API station search URL to be used for searching for stations.
 */
function App(props) {
  const { mots, routingUrl, stationSearchUrl } = props;
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    fetch('https://developer.geops.io/publickey')
      .then(response => response.json())
      .then(data => {
        setApiKey(data.key);
      })
      .catch(() => {
        console.error('Request to get the apiKey failed');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!apiKey) {
    return null;
  }
  return (
    <Provider store={store}>
      <RoutingMenu
        mots={mots}
        stationSearchUrl={stationSearchUrl}
        APIKey={apiKey}
      />
      <MapComponent mots={mots} routingUrl={routingUrl} APIKey={apiKey} />
      <NotificationHandler />
    </Provider>
  );
}

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default App;