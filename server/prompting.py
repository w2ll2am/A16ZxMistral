
from enum import Enum


class Prompting(Enum):
    STREAM_CLASSIFIER = """
        You are an expert at analysing images. Please answer each of these questions by looking at the images. Please return a JSON containing either True or False depending on the answer to the question. Ensure your response only contains a valid JSON without extrenuous formatting e.g. no ```.
        
        e.g.
        {
            "fire": "False",
            "smoke": "False",
            "responders": "False",
            "formations": "False",
            "crowds": "False",
            "crush": "False",
        }
        
        fire
        Is there fire present in the image?
        
        smoke
        Is there smoke present in the image?
        
        responders
        Is there any police, law enforcement, medical workers, or other obvious emergency responders present in the image?
        
        formations
        Is there any people organised in formations e.g. standing in organised lines?
        
        crowds
        Do you see any crowds of people of 20 or more?
        
        crush
        Do you see any dense crowds of more than 60 people, that could be dangerous to vulnerable people?
    """

    TELL_ME_MORE = """
        Please describe the hazard of type {0} in the image. Provide any information that you think will be useful for first responders. 
        Include comments on the severity of the hazard. Be concise.
    """

    GPT_SYSTEM_PROMPT = """
        You are a helpful conversational assistant that is providing chat advice to first responder coordinators. The information       
        you are passed is alerts detected in images and occurring the alerts detected by. You will receive a list  
        of alerts and a description of the image. Please provide 2-3 sentences of summary IN TOTAL and an immediate recommendation for
        allocating resources. Be concise in your response and format the response as if it were in a conversation, with no headings etc.
    """

    CROWD_ANALYSIS = """
        You are an expert at analysing images. Please answer each of these questions by looking at the images.
        Please return a JSON containing either True or False or a scale from 1-10 depending on the specification on each question.
        Ensure your response only contains a valid JSON without extraneous formatting e.g. no ```.
        
        e.g.
        {
            "fire": "False",
            "smoke": "False",
            "responders": "False",
            "formations": "False",
            "crowds": "False",
            "crush": "False",
            "crowding": 6.3
        }
        
        fire
        Is there fire present in the image?
        
        smoke
        Is there smoke present in the image?
        
        responders
        Is there any police, law enforcement, medical workers, or other obvious emergency responders present in the image?
        
        formations
        Is there any people organised in formations e.g. standing in organised lines?
        
        crowds
        Do you see any crowds of people of 20 or more?
        
        crush
        Do you see any dense crowds of more than 60 people, that could be dangerous to vulnerable people?    
        
        crowding
        How crowded is the image on a scale of 1-10? Give answer to 2 d.p.
    """
