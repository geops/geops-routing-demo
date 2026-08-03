import React from 'react';

function SVGComponent(props) {
  return (
    <svg
      className="recharts-surface"
      version="1.1"
      viewBox="0 0 32 32"
      {...props}
    >
      <path
        className="recharts-legend-icon"
        d="M0,16h10.666666666666666
            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
            H32M21.333333333333332,16
            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
        fill="none"
        stroke="#3f51b5"
        strokeWidth="4"
      />
    </svg>
  );
}
export default SVGComponent;
