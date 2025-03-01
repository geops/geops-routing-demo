import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import MapMarkerIcon from '@mui/icons-material/LocationOn';

import './SearchResults.scss';

const renderSecondary = (id, code, countryCode, ifopt) => {
  const display = [];

  if (countryCode) {
    display.push(
      `${countryCode}${id || code ? ':' : ''}${id ? ` ${id}` : ''}${
        code ? ` ${code}` : ''
      }`,
    );
  } else {
    display.push(
      `${id ? `${id}` : ''}${id && code ? ' ' : ''}${code ? `${code}` : ''}`,
    );
  }
  if (ifopt) {
    display.push(`ifopt: ${ifopt}`);
  }
  return display.filter((l) => l !== '').join(', ');
};

/**
 * The component that displays the station search results
 * @category RoutingMenu
 */
function SearchResults(props) {
  const { currentSearchResults, processClickedResultHandler } = props;

  if (currentSearchResults.length === 0) {
    return null;
  }
  return (
    <Paper square elevation={3}>
      <List
        component="nav"
        className="rd-result-list"
        aria-label="search results"
        style={{
          overflowY: 'scroll',
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        {currentSearchResults.map((searchResult, index) => {
          if (index !== 0) {
            return (
              <ListItem
                onClick={() => {
                  processClickedResultHandler(searchResult);
                }}
                button
                key={searchResult.properties.id}
              >
                <ListItemIcon>
                  <MapMarkerIcon />
                </ListItemIcon>
                <ListItemText
                  primary={searchResult.properties.name}
                  secondary={renderSecondary(
                    searchResult.properties.id,
                    searchResult.properties.code,
                    searchResult.properties.country_code,
                    searchResult.properties.ifopt,
                  )}
                />
              </ListItem>
            );
          }
          // First item
          return (
            <ListItem
              onClick={() => processClickedResultHandler(searchResult)}
              button
              selected
              key={`searchResult-${searchResult.properties.name}`}
            >
              <ListItemIcon>
                <MapMarkerIcon />
              </ListItemIcon>
              <ListItemText
                primary={searchResult.properties.name}
                secondary={renderSecondary(
                  searchResult.properties.id,
                  searchResult.properties.code,
                  searchResult.properties.country_code,
                  searchResult.properties.ifopt,
                )}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

SearchResults.propTypes = {
  currentSearchResults: PropTypes.arrayOf(PropTypes.object),
  processClickedResultHandler: PropTypes.func.isRequired,
};

SearchResults.defaultProps = {
  currentSearchResults: [],
};

export default SearchResults;
