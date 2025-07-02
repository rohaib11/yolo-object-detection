import React from 'react';
import FileUpload from '../components/FileUpload';
import DetectionResults from '../components/DetectionResults';
import ModelSelector from '../components/ModelSelector';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <FileUpload />
        </div>
        <div className="lg:col-span-1">
          <ModelSelector />
        </div>
      </div>
      <DetectionResults />
    </div>
  );
};

export default Dashboard;