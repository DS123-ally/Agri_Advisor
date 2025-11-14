/**
 * Modal Component
 * Reusable modal dialog component
 */

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ isOpen, onClose, title, children, isDarkMode = false }) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-xl`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center p-6 border-b ${
            isDarkMode ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <h2 className="text-xl font-bold text-primary">{title}</h2>
          <button
            onClick={onClose}
            className={`p-1 hover:bg-gray-200 rounded-lg ${
              isDarkMode ? 'hover:bg-gray-700' : ''
            }`}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
