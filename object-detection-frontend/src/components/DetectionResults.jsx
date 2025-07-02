import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { FaImage, FaVideo, FaDownload, FaShareAlt, FaTrash } from 'react-icons/fa';
import { saveAs } from 'file-saver';

const DetectionResults = () => {
  const { detectionHistory, setDetectionHistory } = useContext(AppContext);
  const [videoUrls, setVideoUrls] = useState({});

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(videoUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [videoUrls]); // No changes here, this is for cleanup when videoUrls change

  const handleDownload = async (url, filename, fileType) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const extension = fileType === 'video' ? 'mp4' : 'jpg';
      saveAs(blob, `detection-${filename}.${extension}`);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const handleShare = async (url) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Object Detection Result',
          text: 'Check out this object detection result',
          url: url
        });
      } else {
        await navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const handleDelete = (id) => {
    if (setDetectionHistory) {
      setDetectionHistory(prev => prev.filter(item => item.id !== id));
    }
    // Clean up the URL if it's a video
    if (videoUrls[id]) {
      URL.revokeObjectURL(videoUrls[id]);
      setVideoUrls(prev => {
        const newUrls = { ...prev };
        delete newUrls[id];
        return newUrls;
      });
    }
  };

  // Process video URLs to ensure they're properly handled
  useEffect(() => {
    detectionHistory.forEach(item => {
      if (item.fileType === 'video' && !videoUrls[item.id] && item.output) {
        // For videos, create a new object URL from the blob
        const fetchVideo = async () => {
          try {
            const response = await fetch(item.output);
            const blob = await response.blob();
            const videoUrl = URL.createObjectURL(blob);
            setVideoUrls(prev => ({ ...prev, [item.id]: videoUrl }));
          } catch (error) {
            console.error('Error processing video:', error);
          }
        };
        fetchVideo();
      }
    });
  }, [detectionHistory, videoUrls]); // Added videoUrls as a dependency

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Detection Results</h2>
      
      {detectionHistory.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No detections yet. Upload an image or video to get started.
        </div>
      ) : (
        <div className="space-y-4">
          {detectionHistory.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden dark:border-gray-700">
              <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3">
                <div className="flex items-center space-x-2">
                  {item.fileType === 'image' ? (
                    <FaImage className="text-gray-500 dark:text-gray-300" />
                  ) : (
                    <FaVideo className="text-gray-500 dark:text-gray-300" />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {new Date(item.timestamp).toLocaleString()}
                  </span>
                  <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-1 rounded-full">
                    {item.model}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleDownload(
                      item.fileType === 'video' ? videoUrls[item.id] || item.output : item.output,
                      item.id,
                      item.fileType
                    )}
                    className="p-1 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                    title="Download"
                  >
                    <FaDownload />
                  </button>
                  <button
                    onClick={() => handleShare(
                      item.fileType === 'video' ? videoUrls[item.id] || item.output : item.output
                    )}
                    className="p-1 text-gray-500 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                    title="Share"
                  >
                    <FaShareAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Original</h3>
                    {item.fileType === 'image' ? (
                      <img 
                        src={item.input} 
                        alt="Original" 
                        className="w-full rounded max-h-80 object-contain"
                      />
                    ) : (
                      <video 
                        src={item.input} 
                        controls 
                        className="w-full rounded max-h-80"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Result</h3>
                    {item.fileType === 'image' ? (
                      <img 
                        src={item.output} 
                        alt="Detection Result" 
                        className="w-full rounded max-h-80 object-contain"
                      />
                    ) : (
                      <video 
                        src={videoUrls[item.id] || item.output} 
                        controls 
                        className="w-full rounded max-h-80"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetectionResults;
