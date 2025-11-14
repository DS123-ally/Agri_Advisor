/**
 * Select Component
 * Reusable select input with enhanced UX
 */

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

const Select = ({
  label,
  options = [],
  value,
  onChange,
  error,
  disabled = false,
  required = false,
  isDarkMode = false,
  placeholder = 'Select an option',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const baseStyles = `w-full px-4 py-2.5 rounded-lg border-2 appearance-none transition-all duration-200 focus:outline-none pr-10 ${
    isDarkMode
      ? 'bg-gray-700 text-white'
      : 'bg-white text-gray-900'
  }`;

  let borderColor = isDarkMode ? 'border-gray-600' : 'border-gray-300';
  if (error) borderColor = 'border-red-500 focus:border-red-600';
  if (isFocused && !error) borderColor = 'border-primary focus:ring-2 focus:ring-primary focus:ring-opacity-20';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          onBlur={() => setIsFocused(false)}
          onFocus={() => setIsFocused(true)}
          disabled={disabled}
          className={`${baseStyles} ${borderColor} ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option
              key={typeof option === 'string' ? option : option.value}
              value={typeof option === 'string' ? option : option.value}
            >
              {typeof option === 'string' ? option : option.label}
            </option>
          ))}
        </select>

        <ChevronDownIcon
          className={`absolute right-3 top-3 w-5 h-5 pointer-events-none transition-transform duration-200 ${
            isFocused ? 'rotate-180' : ''
          } ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Select;
