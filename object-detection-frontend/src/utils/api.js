import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const detectObjects = async (file, model, confidence, iou) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('model', model);
  formData.append('confidence', confidence);
  formData.append('iou', iou);

  const endpoint = file.type.startsWith('video') 
    ? `${API_URL}/detect-video` 
    : `${API_URL}/detect`;

  try {
    const response = await axios.post(endpoint, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      responseType: 'blob'
    });

    // Create object URL from the blob response
    const blobUrl = URL.createObjectURL(response.data);

    return {
      output: blobUrl,
      stats: {
        processingTime: response.headers['x-processing-time'],
        detectedObjects: JSON.parse(response.headers['x-detected-objects'] || '[]')
      }
    };
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};