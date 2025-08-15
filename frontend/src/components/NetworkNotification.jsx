import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Wifi, WifiOff } from 'lucide-react';

const NetworkNotification = ({ message, type = 'warning', onDismiss }) => {
  if (!message) return null;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <WifiOff className="w-5 h-5 text-red-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Wifi className="w-5 h-5 text-blue-400" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'error':
        return 'bg-red-900/20 border-red-500/30 text-red-200';
      case 'warning':
        return 'bg-yellow-900/20 border-yellow-500/30 text-yellow-200';
      default:
        return 'bg-blue-900/20 border-blue-500/30 text-blue-200';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-4 right-4 z-50 p-4 rounded-lg border backdrop-blur-md shadow-lg max-w-md ${getStyles()}`}
      >
        <div className="flex items-start gap-3">
          {getIcon()}
          <div className="flex-1">
            <p className="text-sm font-medium">Network Issue</p>
            <p className="text-xs mt-1 opacity-90">{message}</p>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="text-gray-400 hover:text-white transition-colors ml-2"
            >
              ×
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NetworkNotification;
