// LoadingSpinner.js

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const LoadingSpinner = () => {
  return (
    <div className="w-full h-full">
      <CircularProgress className='text-secondary' />
    </div>
  );
};

export default LoadingSpinner;
