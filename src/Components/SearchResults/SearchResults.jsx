import MapMarkerIcon from '@mui/icons-material/LocationOn';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import PropTypes from 'prop-types';
import React from 'react';

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
  return display
    .filter((l) => {
      return l !== '';
    })
    .join(', ');
};

/**
 * The component that displays the station search results
 * @category RoutingMenu
 */
function SearchResults({
  currentSearchResults = [],
  processClickedResultHandler,
}) {
  if (currentSearchResults.length === 0) {
    return null;
  }
  return (
    <Paper elevation={3} square>
      <List
        aria-label="search results"
        className="rd-result-list"
        component="nav"
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
                button
                key={searchResult.properties.id}
                onClick={() => {
                  processClickedResultHandler(searchResult);
                }}
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
              button
              key={`searchResult-${searchResult.properties.name}`}
              onClick={() => {
                return processClickedResultHandler(searchResult);
              }}
              selected
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

export default SearchResults;
