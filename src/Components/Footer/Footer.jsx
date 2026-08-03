import { Typography } from '@mui/material';
import React from 'react';

export default function Footer() {
  return (
    <div
      style={{
        alignItems: 'center',
        background: 'white',
        bottom: 0,
        boxShadow: '0 0 5px #555',
        boxSizing: 'border-box',
        display: 'flex',
        height: '24px',
        justifyContent: 'space-between',
        padding: '0 5px',
        position: 'absolute',
        width: '100%',
      }}
    >
      <div>
        <a href="https://geops.ch/impressum" target="geops">
          <Typography variant="caption">Impressum</Typography>
        </a>
      </div>
      <div>
        <a href="https://geops.ch/" target="geops">
          <Typography variant="caption">geOps</Typography>
        </a>
        <Typography variant="caption"> | </Typography>
        <a href="https://developer.geops.io/" target="geops">
          <Typography variant="caption">Developer Portal</Typography>
        </a>
      </div>
    </div>
  );
}
