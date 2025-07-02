import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const ModelSelector = () => {
  const {
    selectedModel,
    setSelectedModel,
    confidenceThreshold,
    setConfidenceThreshold,
    iouThreshold,
    setIouThreshold
  } = useContext(AppContext);

  const models = [
    { id: 'yolov3', name: 'YOLOv3' },
    { id: 'yolov4', name: 'YOLOv4' },
    { id: 'fasterrcnn', name: 'Faster R-CNN' },
    { id: 'ssd', name: 'SSD' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Detection Settings</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Confidence Threshold: {confidenceThreshold.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={confidenceThreshold}
            onChange={(e) => setConfidenceThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>0.5</span>
            <span>1.0</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            IOU Threshold: {iouThreshold.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={iouThreshold}
            onChange={(e) => setIouThreshold(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>0</span>
            <span>0.5</span>
            <span>1.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelSelector;