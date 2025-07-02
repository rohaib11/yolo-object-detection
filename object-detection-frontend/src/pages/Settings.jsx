import React from 'react';
import SettingsPanel from '../components/SettingsPanel';

const Settings = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h1>
      <SettingsPanel />
    </div>
  );
};

export default Settings;