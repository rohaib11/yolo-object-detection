
# YOLO Object Detection

This project is an **Object Detection** web application built using **React** for the frontend and **Flask** for the backend. The app uses the **YOLOv3** pretrained model to perform object detection on images and videos. It allows users to upload images or videos, detect objects, and view or download the processed results.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used

### Backend:
- **Flask**: Web framework for the backend.
- **OpenCV**: For image and video processing.
- **TensorFlow**: For running the YOLOv3 object detection model.

### Frontend:
- **React**: Frontend framework.
- **Tailwind CSS**: For styling and responsive design.
- **Axios**: For making HTTP requests to the backend.

### Model:
- **YOLOv3**: Pretrained deep learning model for object detection.

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/rohaib11/yolo-object-detection.git
cd yolo-object-detection
```

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd object-detection-backend
   ```

2. Create a virtual environment and activate it:
   - On Windows:
     ```bash
     python -m venv venv
     .\venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Download the **YOLOv3** model files and place them in the **`models/`** folder.

   You can download the model files from this [Google Drive link](https://drive.google.com/drive/folders/1PewJ41GYtWGZNXFSzHV8C6wRtT4UgLr3?usp=sharing). After downloading, place the following files in the `object-detection-backend/models/` directory:
   - `yolov3.weights`
   - `yolov3.cfg`
   - `coco.names`

5. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend will run at `http://localhost:5000`.

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd object-detection-frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will run at `http://localhost:3000`.

---

## Usage

1. Open the frontend in your browser (`http://localhost:3000`).
2. Upload an image or video using the file input or drag-and-drop feature.
3. Select the detection model and adjust the confidence and IOU thresholds as needed.
4. Click **"Detect Objects"** to run object detection.
5. View the processed result in the UI and download it if needed.

The app supports:
- **Image detection**: Upload an image and detect objects.
- **Video detection**: Upload a video, and the app will process each frame for object detection.

---

## Screenshots

Here are some screenshots of the app in action:

1. **Interface lIGHT**
 ![image](https://github.com/user-attachments/assets/6e4d4b89-a20b-4dbd-9fb1-14507ab3b0ee)

2. **Interface Dark**
 ![image](https://github.com/user-attachments/assets/8b1b32f3-b593-4b6a-b9b3-6d31c14d0751)

3. **File Upload Page**  
![image](https://github.com/user-attachments/assets/390634a0-3e4c-483b-9711-e43ab398f880)

4. **Detection Results**  
![image](https://github.com/user-attachments/assets/d3bd7583-4f3e-4be9-9e49-3a696bc63b89)

5. **Complete**  
![image](https://github.com/user-attachments/assets/8fe22ed4-d380-476d-b4b3-1e00586e6baa)

Feel free to add your own screenshots here after taking them.

---

## Contributing

We welcome contributions to this project! If you'd like to contribute, please fork the repository and submit a pull request. Here’s how to contribute:

1. Fork the repository.
2. Clone your fork to your local machine.
3. Create a new branch for your changes (`git checkout -b feature-name`).
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to your fork (`git push origin feature-name`).
6. Create a new Pull Request.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Additional Notes:
- Make sure you have **Python 3.x** and **Node.js** installed on your machine.
- The model files (`yolov3.weights`, `yolov3.cfg`, `coco.names`) should be placed in the `object-detection-backend/models/` folder.
- You can adjust the `confidenceThreshold` and `iouThreshold` in the frontend settings to control the detection accuracy and filtering of objects.

