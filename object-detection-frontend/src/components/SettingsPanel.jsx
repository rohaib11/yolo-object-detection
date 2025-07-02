import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const SettingsPanel = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Dark Mode</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Toggle between light and dark theme
          </p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            darkMode ? 'bg-blue-600' : 'bg-gray-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              darkMode ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;