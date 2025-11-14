/**
 * Input Component
 * Reusable text input with validation feedback and enhanced UX
 */

import React, { useState } from 'react';
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const Input = ({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  success,
  disabled = false,
  required = false,
  isDarkMode = false,
  helpText,
  icon: Icon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyles = `w-full px-4 py-2.5 rounded-lg border-2 transition-all duration-200 focus:outline-none ${
    isDarkMode
      ? 'bg-gray-700 text-white'
      : 'bg-white text-gray-900'
  }`;

  let borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  if (error) borderColor = 'border-red-500 focus:border-red-600';
  if (success && !error) borderColor = 'border-green-500 focus:border-green-600';
  if (isFocused && !error && !success) borderColor = 'border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className={`absolute left-3 top-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseStyles} ${borderColor} ${Icon ? 'pl-10' : ''} ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          {...props}
        />

        {error && (
          <ExclamationCircleIcon className="absolute right-3 top-3 w-5 h-5 text-red-500" />
        )}
        {success && !error && (
          <CheckCircleIcon className="absolute right-3 top-3 w-5 h-5 text-green-500" />
        )}
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
          <ExclamationCircleIcon className="w-4 h-4" />
          {error}
        </p>
      )}

      {helpText && !error && (
        <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {helpText}
        </p>
      )}
    </div>
  );
};

export default Input;
