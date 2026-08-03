import { createTheme, ThemeProvider } from '@mui/material/styles';
import { platformModifierKeyOnly } from 'ol/events/condition';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  ROUTING_BASE_URL,
  STATION_SEARCH_BASE_URL,
  VALID_MOTS,
} from '../../constants';
import {
  setGeneralizationActive,
  setGeneralizationEnabled,
  setMode,
} from '../../store/actions/Map';
import Footer from '../Footer';
import MapComponent from '../MapComponent';
import NotificationHandler from '../NotificationHandler';
import Permalink from '../Permalink';

const propTypes = {
  mots: PropTypes.arrayOf(PropTypes.string),
  routingUrl: PropTypes.string,
  stationSearchUrl: PropTypes.string,
};

const fontSize = '1rem';
const color = '#515151';
const theme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'text',
      },
      styleOverrides: {
        root: {
          fontWeight: 'normal',
          textTransform: 'none',
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        anchorOriginBottomRight: {
          bottom: '36px !important',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#3f51b5',
    },
  },
  typography: {
    a: { color, fontSize },
    body: { fontSize },
    button: { color: 'red', fontSize },
    fontFamily: '"Inter", "Roboto", sans-serif',
    h1: { color, fontSize: '1.2rem' },
    h2: { color, fontSize },
    h3: { color, fontSize },
    h4: { color, fontSize },
    h5: { color, fontSize },
    h6: { color, fontSize },
  },
});

const apiKey = import.meta.env.VITE_API_KEY;
/**
 * Root component of the application that holds all other sub-components.
 * @param {string[]} mots List of mots to be available (ex: ['bus', 'train'])
 * @param {string} routingUrl The API routing url to be used for navigation.
 * @param {string} stationSearchUrl The API station search URL to be used for searching for stations.
 */
function App({
  mots = VALID_MOTS,
  routingUrl = ROUTING_BASE_URL,
  stationSearchUrl = STATION_SEARCH_BASE_URL,
}) {
  const dispatch = useDispatch();
  const mode = useSelector((state) => {
    return state.MapReducer.mode;
  });
  const generalizationEnabled = useSelector((state) => {
    return state.MapReducer.generalizationEnabled;
  });

  const handleKeyboardEvent = useCallback(
    (evt) => {
      const preventBroweserDefaults = () => {
        evt.stopPropagation();
        evt.preventDefault();
      };
      const ctrlDPressed =
        platformModifierKeyOnly({ originalEvent: evt }) && evt.which === 68;
      const ctrlGPressed =
        platformModifierKeyOnly({ originalEvent: evt }) && evt.which === 71;

      if (ctrlDPressed) {
        preventBroweserDefaults();
        dispatch(setMode(mode ? null : 'dev'));
      }

      if (ctrlGPressed) {
        preventBroweserDefaults();
        dispatch(setGeneralizationActive(!generalizationEnabled));
        dispatch(setGeneralizationEnabled(!generalizationEnabled));
      }
    },
    [dispatch, mode, generalizationEnabled],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyboardEvent);
    return () => {
      return document.removeEventListener('keydown', handleKeyboardEvent);
    };
  }, [handleKeyboardEvent]);

  return (
    <ThemeProvider theme={theme}>
      <Permalink
        APIKey={apiKey}
        mots={mots}
        stationSearchUrl={stationSearchUrl}
      />
      <MapComponent
        APIKey={apiKey}
        mots={mots}
        routingUrl={routingUrl}
        stationSearchUrl={stationSearchUrl}
      />
      <NotificationHandler />
      <Footer />
    </ThemeProvider>
  );
}

App.propTypes = propTypes;

export default App;
