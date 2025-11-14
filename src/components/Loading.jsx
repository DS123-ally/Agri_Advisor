/**
 * Loading Component
 * Spinner for loading states
 */

import React from 'react';

const Loading = ({ isDarkMode = false }) => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className={`animate-spin rounded-full h-12 w-12 border-4 ${
        isDarkMode
          ? 'border-gray-700 border-t-primary'
          : 'border-gray-200 border-t-primary'
      }`} />
    </div>
  );
};

export default Loading;
