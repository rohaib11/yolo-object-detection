import { useState, useEffect } from 'react';
import { detectObjects } from '../utils/api';

export const useDetection = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const processDetection = async (file, model, confidence, iou) => {
    setIsProcessing(true);
    setError(null);
    try {
      const detectionResult = await detectObjects(file, model, confidence, iou);
      setResult(detectionResult);
      return detectionResult;
    } catch (err) {
      setError(err.message || 'Detection failed');
      throw err;
    } finally {
      setIsProcessing(false);
    }
  };

  return { processDetection, isProcessing, error, result };
};