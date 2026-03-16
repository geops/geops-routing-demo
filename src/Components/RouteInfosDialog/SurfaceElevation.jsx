import React from 'react';

function SVGComponent(props) {
  return (
    <svg
      className="recharts-surface"
      viewBox="0 0 32 32"
      version="1.1"
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <path
        strokeWidth="4"
        fill="none"
        stroke="#3f51b5"
        d="M0,16h10.666666666666666
            A5.333333333333333,5.333333333333333,0,1,1,21.333333333333332,16
            H32M21.333333333333332,16
            A5.333333333333333,5.333333333333333,0,1,1,10.666666666666666,16"
        className="recharts-legend-icon"
      />
    </svg>
  );
}
export default SVGComponent;
