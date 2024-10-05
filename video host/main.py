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

def get_video_by_id(id):
    for key in video_streams.keys():
        if video_streams[key][0] == id:
            return key

@app.route('/stream/<video_id>')
def get_current_frame(video_id):
    video_path = get_video_by_id(int(video_id))
    if video_path not in video_streams:
        return "Video not found", 404
    frame = video_streams[video_path][1].get_frame()
    if frame is None:
        return "Frame not available", 503
    return Response(frame, mimetype='image/jpeg')

@app.route('/stream_id')
def list_videos():
    return jsonify({
        video_streams[key][0]: os.path.basename(key).strip(".mov") for key in video_streams.keys()
    })

def load_videos():
    id = 1
    for filename in os.listdir(video_folder):
        if filename.endswith('.mov'):  # Add more extensions if needed
            video_path = os.path.join(video_folder, filename)
            video_streams[video_path] = (id, VideoStream(video_path))
            print(f"Loaded video: {video_path}")
            id += 1

if __name__ == '__main__':
    load_videos()
    app.run(host='0.0.0.0', port=5000)