// LoadingSpinner.js

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner w-full h-full">
      <CircularProgress />
    </div>
  );
};

export default LoadingSpinner;
