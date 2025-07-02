export const MODELS = [
  { id: 'yolov3', name: 'YOLOv3', description: 'Good balance of speed and accuracy' },
  { id: 'yolov4', name: 'YOLOv4', description: 'Improved version with better accuracy' },
  { id: 'fasterrcnn', name: 'Faster R-CNN', description: 'High accuracy but slower' },
  { id: 'ssd', name: 'SSD', description: 'Fast detection with moderate accuracy' }
];

export const DEFAULT_SETTINGS = {
  confidenceThreshold: 0.5,
  iouThreshold: 0.4,
  model: 'yolov3'
};