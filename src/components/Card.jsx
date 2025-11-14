/**
 * Card Component
 * Reusable card component with enhanced UX and animations
 */

import React from 'react';

const Card = ({ title, children, className = '', isDarkMode = false, interactive = false }) => {
  const hoverEffect = interactive ? 'hover:shadow-xl hover:scale-105 cursor-pointer' : 'hover:shadow-lg';

  return (
    <div
      className={`rounded-lg p-6 transition-all duration-300 ${
        isDarkMode
          ? 'bg-gray-800 border border-gray-700'
          : 'bg-white border border-gray-200'
      } shadow-md ${hoverEffect} ${className}`}
    >
      {title && (
        <h3 className="text-lg font-bold mb-4 text-primary flex items-center gap-2">
          <span className="w-1 h-6 bg-primary rounded-full"></span>
          {title}
        </h3>
      )}
      <div className={interactive ? 'pointer-events-auto' : ''}>
        {children}
      </div>
    </div>
  );
};

export default Card;
