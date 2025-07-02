import DetectionResults from '../components/DetectionResults';

const History = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Detection History</h1>
      <DetectionResults />
    </div>
  );
};

export default History;