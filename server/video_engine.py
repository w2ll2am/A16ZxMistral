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

def show_image_from_url(url) -> bytes:
    try:
        # Get the image from the URL
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful

        return response.content

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")


videoEngine = VideoEngine()
