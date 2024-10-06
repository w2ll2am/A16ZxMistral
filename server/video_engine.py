import base64
from typing import Dict

import requests
import json


class VideoEngine:
    def __init__(self):
        self.server_url = "http://127.0.0.1:5000/"
        self.registry = self.get_stream_id()
        self.stream_keys = self.registry.keys()
        self.stream_desc = self.registry.values()

    def url(self, endpoint: str) -> str:
        return self.server_url + endpoint

    def get_stream_id(self) -> Dict:
        try:
            response = requests.get(self.url("stream_id")).json()
            cleaned = {int(k): v for k, v in response.items()}
            return cleaned

        except requests.exceptions.RequestException as e:
            print(f"Could not get id! An error occurred: {e}")

    def get_stream_by_id(self, id: int) -> str:
        try:
            # Get the image from the URL
            response = requests.get(self.url(f"stream/{id}"))
            response.raise_for_status()  # Check if the request was successful
            decoded_image = base64.b64encode(response.content).decode('utf-8')
            return decoded_image

        except requests.exceptions.RequestException as e:
            print(f"An error occurred: {e}")


videoEngine = VideoEngine()

ffmpeg -i "Car Fire.mov" -vf scale="640:480" "CarFire.mov"
ffmpeg -i "Shipping 2.mov" -vf scale="640:480" "Shipping2.mov"
ffmpeg -i "Shipping.mov" -vf scale="640:480" Shipping3.mov
ffmpeg -i "Warehouse Fire.mov" -vf scale="640:480" "WarehouseFire.mov"