import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import { floorsColor } from '../../config/styleConfig';

import './FloorButton.scss';

const propTypes = {
  active: PropTypes.bool,
  children: PropTypes.any,
  floor: PropTypes.string.isRequired,
  isMobile: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

function getFloorStyle(active, floor) {
  return active
    ? { backgroundColor: floorsColor[floor === '2D' ? '0' : floor] }
    : null;
}

function FloorButton({
  active = false,
  children = null,
  floor,
  isMobile = false,
  onClick,
}) {
  const mobileInfo = isMobile && (
    <div className="tm-mobile-floor-info">Floor</div>
  );
  return (
    <div className="tm-floor-button-wrapper">
      <Button
        className={`tm-button tm-square-white${active ? ' tm-active' : ''}`}
        onClick={() => {
          return onClick(floor);
        }}
        style={getFloorStyle(active, floor)}
      >
        {mobileInfo}
        <div>
          {floor}
          {children}
        </div>
      </Button>
    </div>
  );
}

FloorButton.propTypes = propTypes;

export default React.memo(FloorButton);
