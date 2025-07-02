import os
import cv2
import io
import numpy as np
import tempfile
from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'temp'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load YOLOv3
net = cv2.dnn.readNet("models/yolov3.weights", "models/yolov3.cfg")
with open("models/coco.names", "r") as f:
    classes = [line.strip() for line in f.readlines()]
layer_names = net.getLayerNames()
output_layers = [layer_names[i - 1] for i in net.getUnconnectedOutLayers()]

def detect_objects(frame):
    height, width = frame.shape[:2]
    blob = cv2.dnn.blobFromImage(frame, 0.00392, (416, 416), swapRB=True, crop=False)
    net.setInput(blob)
    outs = net.forward(output_layers)

    class_ids, confidences, boxes = [], [], []
    for out in outs:
        for detection in out:
            scores = detection[5:]
            class_id = np.argmax(scores)
            confidence = scores[class_id]
            if confidence > 0.5:
                center_x = int(detection[0] * width)
                center_y = int(detection[1] * height)
                w = int(detection[2] * width)
                h = int(detection[3] * height)
                x = int(center_x - w / 2)
                y = int(center_y - h / 2)
                boxes.append([x, y, w, h])
                confidences.append(float(confidence))
                class_ids.append(class_id)

    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)
    for i in indexes.flatten():
        x, y, w, h = boxes[i]
        label = str(classes[class_ids[i]])
        confidence = confidences[i]
        color = (0, 255, 0)
        cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
        cv2.putText(frame, f"{label} {confidence:.2f}", (x, y - 10), 
                   cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)
    return frame

@app.route('/detect', methods=['POST'])
def detect_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
    result_frame = detect_objects(img)

    _, img_encoded = cv2.imencode('.jpg', result_frame)
    return send_file(
        io.BytesIO(img_encoded.tobytes()),
        mimetype='image/jpeg',
        as_attachment=False,
        download_name='detection.jpg'
    )

@app.route('/detect-video', methods=['POST'])
def detect_video():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Save input video to temp file
    input_path = os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename))
    file.save(input_path)

    # Create temp output file
    output_path = os.path.join(app.config['UPLOAD_FOLDER'], 'output_' + secure_filename(file.filename))

    # Process video
    cap = cv2.VideoCapture(input_path)
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    try:
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break
            processed_frame = detect_objects(frame)
            out.write(processed_frame)
    finally:
        cap.release()
        out.release()

    # Return processed video
    return send_file(
        output_path,
        mimetype='video/mp4',
        as_attachment=True,
        download_name='processed_' + file.filename
    )

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)