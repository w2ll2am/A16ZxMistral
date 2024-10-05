import cv2
from flask import Flask, Response, jsonify
import threading
import os
import time

app = Flask(__name__)

class VideoStream:
    def __init__(self, video_path):
        self.video_path = video_path
        self.cap = cv2.VideoCapture(video_path)
        self.fps = self.cap.get(cv2.CAP_PROP_FPS)
        self.total_frames = int(self.cap.get(cv2.CAP_PROP_FRAME_COUNT))
        self.duration = self.total_frames / self.fps
        self.start_time = time.time()

    def get_frame(self):
        current_time = time.time() - self.start_time
        stream_position = current_time % self.duration
        frame_number = int(stream_position * self.fps)

        self.cap.set(cv2.CAP_PROP_POS_FRAMES, frame_number)
        ret, frame = self.cap.read()
        if not ret:
            return None

        return cv2.imencode('.jpg', frame)[1].tobytes()

video_streams = {}
video_folder = './videos'  # Replace with your folder path

@app.route('/video/<video_name>/current_frame')
def get_current_frame(video_name):
    video_path = os.path.join(video_folder, video_name)
    if video_path not in video_streams:
        return "Video not found", 404
    frame = video_streams[video_path].get_frame()
    if frame is None:
        return "Frame not available", 503
    return Response(frame, mimetype='image/jpeg')

@app.route('/videos')
def list_videos():
    return jsonify({'videos': [os.path.basename(v) for v in video_streams.keys()]})

def load_videos():
    for filename in os.listdir(video_folder):
        if filename.endswith(('.mov', '.mp4')):  # Add more extensions if needed
            video_path = os.path.join(video_folder, filename)
            video_streams[video_path] = VideoStream(video_path)
            print(f"Loaded video: {video_path}")

if __name__ == '__main__':
    load_videos()
    app.run(host='0.0.0.0', port=5000)