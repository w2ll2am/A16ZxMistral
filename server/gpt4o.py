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

COT = {
	"fire": "The context suggests that this question relates to a situation where there's a fire in some kind of structure (building). Therefore, it makes sense for them to take into account factors such as: - How big is the building? This will determine whether or not one person can handle all aspects related to fighting off flames from spreading further within its walls; if so then fewer people would be needed on site compared with larger structures like hospitals/schools etc., which require more personnel due their complexity when dealing with fires inside them. - Is it residential or commercial property?",
	"smoke": " In order to make sure that all possible factors have been taken into account, it would also include other things like: - How far away from where people live/work does this incident occur? - Is there anything else going on at this time (e.g., traffic congestion) which might affect response times? - Are there any special circumstances such as weather conditions or terrain features near where the fire started? These questions can help inform decision makers about whether more resources may need to be allocated based upon these additional variables.",
	"responders": " In order for them to do their job effectively, it's important for them to know what kind of situation they will face at the scene so they can prepare accordingly before arriving on site. This means considering factors such as: - How serious was this event? Was anyone injured/killed? If yes then how badly were people hurt (e.g., minor cuts vs major trauma)? - Is there any danger present now which could cause further harm if left unattended until help arrives (e.g., fire hazard)? - Are there any special requirements needed during rescue operations like medical equipment",
	"formations": "One factor that needs to be taken into account is the size and location of the crowd. If it's large, then more personnel might be needed than if it were small; likewise with its position - if located near dangerous areas like bridges or buildings where fires could spread quickly, additional firefighters would also need to be sent along with police officers who can control traffic flow around these locations so as not cause further damage from accidents caused by congestion due to lack of space/resources",
	"crowds": "One factor that could affect this decision would be whether or not there were any injuries reported at first sight; if so then more personnel may need to arrive sooner than expected because it's possible someone might require immediate medical attention before help arrives from outside sources like hospitals etcetera (which takes time). Another consideration would include where exactly these individuals are located within their respective areas - some places might require less manpower due to proximity while others will take longer distances between points which means additional resources must also travel further distances as well.",
	"crush": "visual inspection from cameras; reports filed by witnesses on scene; medical records provided by hospitals treating patients affected by said incidents. If there is no evidence suggesting that anyone was hurt during this incident then it could mean less personnel will be necessary compared with scenarios where injuries occurred due to crowd surges caused by panic among those present at location(s) where crowds gathered together without proper supervision or control measures being put into place prior to their arrival.",
}

class LargeMessage:
    def __init__(
        self, 
        hazard: str,
        response: str = "",
    ):
        self.hazard = hazard
        self.response = response
        if hazard in COT.keys():
            self.cot = COT[hazard]
        else:
            self.cot = "No context of this hazard found."
    
    def format_message(self):

        return f"{Prompting.GPT_SYSTEM_PROMPT.value}\n{self.hazard}\n{self.response}"
        
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