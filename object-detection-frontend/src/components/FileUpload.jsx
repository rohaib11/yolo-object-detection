import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import LoadingSpinner from './LoadingSpinner';

const FileUpload = () => {
  const { processDetection, isProcessing } = useContext(AppContext);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile) => {
    if (!selectedFile.type.match(/(image|video)\/.*/)) {
      alert('Please upload an image or video file');
      return;
    }
    
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      await processDetection(file);
    } catch (error) {
      alert('Detection failed. Please try again.');
    }
  };

  const clearFile = () => {
    setFile(null);
    setPreview(null);
    if (preview) URL.revokeObjectURL(preview);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {!file ? (
          <>
            <FaCloudUploadAlt className="mx-auto text-4xl text-gray-400 dark:text-gray-500 mb-4" />
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Drag & drop your image or video here
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">or</p>
            <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              Browse Files
              <input 
                type="file" 
                className="hidden" 
                accept="image/*,video/*" 
                onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
              />
            </label>
          </>
        ) : (
          <div className="relative">
            {file.type.startsWith('video') ? (
              <video 
                src={preview} 
                controls 
                className="max-h-80 mx-auto rounded-md"
              />
            ) : (
              <img 
                src={preview} 
                alt="Preview" 
                className="max-h-80 mx-auto rounded-md"
              />
            )}
            <button
              onClick={clearFile}
              className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <FaTimes />
            </button>
          </div>
        )}
      </div>

      {file && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isProcessing}
            className={`flex items-center justify-center px-6 py-2 rounded-md text-white ${
              isProcessing ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {isProcessing ? (
              <>
                <LoadingSpinner size={4} className="mr-2" />
                Processing...
              </>
            ) : (
              'Detect Objects'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;