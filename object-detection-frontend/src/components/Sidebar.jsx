import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaHistory, FaCog } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="flex-1 px-2 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
              }
            >
              <FaHome className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
              Dashboard
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
              }
            >
              <FaHistory className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
              History
            </NavLink>
            <NavLink
              to="/settings"
              className={({ isActive }) => 
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive 
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200' 
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`
              }
            >
              <FaCog className="mr-3 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
              Settings
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;