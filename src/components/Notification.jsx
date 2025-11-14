/**
 * Notification Component
 * Toast-like notifications for user feedback
 */

import React, { useState, useEffect } from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const Notification = ({ type = 'info', message, autoClose = 4000, isDarkMode = false, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onClose?.();
      }, autoClose);

      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: <CheckCircleIcon className="w-5 h-5" />,
    error: <XCircleIcon className="w-5 h-5" />,
    warning: <ExclamationTriangleIcon className="w-5 h-5" />,
    info: <InformationCircleIcon className="w-5 h-5" />,
  };

  const colors = {
    success: {
      bg: isDarkMode ? 'bg-green-900' : 'bg-green-50',
      border: 'border-green-300',
      text: 'text-green-800',
      icon: 'text-green-500',
    },
    error: {
      bg: isDarkMode ? 'bg-red-900' : 'bg-red-50',
      border: 'border-red-300',
      text: 'text-red-800',
      icon: 'text-red-500',
    },
    warning: {
      bg: isDarkMode ? 'bg-yellow-900' : 'bg-yellow-50',
      border: 'border-yellow-300',
      text: 'text-yellow-800',
      icon: 'text-yellow-500',
    },
    info: {
      bg: isDarkMode ? 'bg-blue-900' : 'bg-blue-50',
      border: 'border-blue-300',
      text: 'text-blue-800',
      icon: 'text-blue-500',
    },
  };

  const color = colors[type];

  return (
    <div
      className={`animate-slide-down fixed top-4 right-4 flex items-center gap-3 px-4 py-3 rounded-lg border-l-4 ${color.bg} ${color.border} ${color.text} shadow-lg max-w-md z-50 transition-all duration-300`}
    >
      <div className={color.icon}>{icons[type]}</div>
      <p className="flex-1 text-sm font-medium">{message}</p>
      <button
        onClick={() => {
          setIsVisible(false);
          onClose?.();
        }}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <XMarkIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

// Context hook for notifications
export const useNotification = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message, type = 'info', autoClose = 4000) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type, autoClose }]);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return { notifications, addNotification, removeNotification };
};

export default Notification;
