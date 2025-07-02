import React, { createContext, useState, useEffect } from 'react';
import { detectObjects } from '../utils/api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedModel, setSelectedModel] = useState('yolov3');
  const [confidenceThreshold, setConfidenceThreshold] = useState(0.5);
  const [iouThreshold, setIouThreshold] = useState(0.4);
  const [detectionHistory, setDetectionHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Check local storage or prefer-color-scheme
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const processDetection = async (file) => {
    setIsProcessing(true);
    try {
      const result = await detectObjects(file, selectedModel, confidenceThreshold, iouThreshold);
      const newItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        input: URL.createObjectURL(file),
        output: result.output,
        model: selectedModel,
        fileType: file.type.startsWith('video') ? 'video' : 'image'
      };
      setDetectionHistory(prev => [newItem, ...prev]);
      return result;
    } catch (error) {
      console.error('Detection error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <AppContext.Provider value={{
      selectedModel,
      setSelectedModel,
      confidenceThreshold,
      setConfidenceThreshold,
      iouThreshold,
      setIouThreshold,
      detectionHistory,
      processDetection,
      isProcessing,
      darkMode,
      setDarkMode
    }}>
      {children}
    </AppContext.Provider>
  );
};