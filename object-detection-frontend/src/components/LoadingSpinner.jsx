import React from 'react';

const LoadingSpinner = ({ size = 6, className = '' }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-blue-600 dark:border-blue-400`}
      />
    </div>
  );
};

export default LoadingSpinner;