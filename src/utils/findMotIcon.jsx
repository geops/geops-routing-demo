import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import React from 'react';

/**
 * Map each mot to an icon
 * @param {string} name The name of the mot, ex('bus' or 'train')
 * @returns {Icon} MotIcon
 * @category Utils
 */
const findMotIcon = (name) => {
  let result = null;
  switch (name) {
    case 'foot':
      result = <DirectionsWalkIcon />;
      break;
    case 'rail':
      result = <DirectionsRailwayIcon />;
      break;
    default:
      result = <DirectionsBusIcon />;
      break;
  }
  return <span>{result}</span>;
};

export default findMotIcon;
