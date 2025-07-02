import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaMoon, FaSun } from 'react-icons/fa';

const Header = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Object Detection
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;