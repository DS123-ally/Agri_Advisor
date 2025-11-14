/**
 * Button Component
 * Reusable button with variants and enhanced UX
 */

import React, { useState } from 'react';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95';

  const variants = {
    primary: 'bg-primary text-white hover:bg-emerald-700 hover:shadow-lg focus:ring-primary active:bg-emerald-800',
    secondary: 'bg-secondary text-white hover:bg-blue-700 hover:shadow-lg focus:ring-secondary active:bg-blue-800',
    danger: 'bg-red-500 text-white hover:bg-red-700 hover:shadow-lg focus:ring-red-500 active:bg-red-800',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:shadow-lg focus:ring-primary active:bg-primary active:opacity-90',
  };

  const sizes = {
    sm: 'px-3 py-1 text-sm gap-1',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2',
  };

  const handleClick = (e) => {
    if (!disabled && !loading && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} inline-flex items-center justify-center ${disabled || loading ? 'cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      disabled={disabled || loading}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
