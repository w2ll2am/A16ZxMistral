import os
import time
import base64
from typing import List

from dotenv import load_dotenv
from video_engine import videoEngine
from dashboard import Alert
import json

from openai import OpenAI

from prompting import Prompting

class LargeMessage:
    def __init__(
        self, 
        text: str,
        image_description: str = "",
    ):
        self.text = text
        self.image_description = image_description
    
    def format_message(self):

        return f"{Prompting.GPT_SYSTEM_PROMPT.value}\n{self.text}\n{self.image_description}"
        
class Gpt4oClient():
    def __init__(self):
        load_dotenv()
        api_key = "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"
        self.model = "gpt-4o-mini"
        self.client = OpenAI(api_key=api_key)

    def send_messages(self, message: LargeMessage, raw: bool = False):
        """
        Send a chain of Pixtral messages / images
        :param messages:
        :return:
        """
        retries = 0
        while retries < 5:
            try:
                chat_response = self.client.chat.completions.create(
                    model=self.model,
                    messages=[
                        {
                            "role": "user",
                            "content": message.format_message()
                        },
                    ]
                )
                if raw:
                    return chat_response
                else:
                    return chat_response.choices[0].message.content
            except Exception as e:
                print(e)
                retries += 1
                continue

    def test_response(self):
        """
        Don't use this; just syntax reference + testing API alive
        :return:
        """
        chat_response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {
                    "role": "user",
                    "content": "What is 1 + 1?"
                },
            ]
        )
        print(chat_response.choices[0].message.content)


gpt4oClient = Gpt4oClient()

def test_response():
    gpt4oClient.test_response()

if __name__ == "__main__":
    test_response()