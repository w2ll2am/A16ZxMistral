import os
import time
import base64
from typing import List

from mistralai import Mistral
from dotenv import load_dotenv

from video_engine import videoEngine


class PixtralMessage:
    def __init__(self, message: str):
        self.message = message

    def content(self):
        return {
            "type": "text",
            "text": self.message
        }


class PixtralImage(PixtralMessage):
    # def _load_image(self, local_url: str) -> str:
    #     with open(local_url, "rb") as image_file:
    #         return base64.b64encode(image_file.read()).decode("utf-8")

    def content(self):
        return {
            "type": "image_url",
            "image_url": f"data:image/jpeg;base64,{self.message}"
        }


class PixtralClient():
    def __init__(self):
        load_dotenv()
        api_key = os.getenv("API_KEY")
        self.model = "pixtral-12b-2409"
        self.client = Mistral(api_key=api_key)

    def send_messages(self, *messages: PixtralMessage, raw: bool = False):
        """
        Send a chain of Pixtral messages / images
        :param messages:
        :return:
        """
        messages = [msg.content() for msg in messages]
        retries = 0
        while retries < 5:
            try:
                chat_response = self.client.chat.complete(
                    model=self.model,
                    messages=[
                        {
                            "role": "user",
                            "content": messages
                        },
                    ]
                )
                if raw:
                    return chat_response
                else:
                    return chat_response.choices[0].message.content
            except Exception as e:
                # print(e)
                retries += 1
                continue

    def test_response(self):
        """
        Don't use this; just syntax reference + testing API alive
        :return:
        """
        chat_response = self.client.chat.complete(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "What is 1 + 1?"
                        }
                    ]
                },
            ]
        )
        print(chat_response.choices[0].message.content)


pixtralClient = PixtralClient()
