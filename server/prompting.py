
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
        Include comments on the severity of the hazard. Be concise. Do not include any markdown formatting such as **.
    """

    GPT_SYSTEM_PROMPT = """
        You are a helpful conversational assistant that is providing chat advice to first responder coordinators. The information       
        you are passed is alerts detected in images and occurring the alerts detected by. You will receive a list  
        of alerts and a description of the image. Please provide 2-3 sentences of summary IN TOTAL and an immediate recommendation for
        allocating resources. Be concise in your response and format the response as if it were in a conversation, with no headings etc.
    """

    CROWD_ANALYSIS = """
        You are an expert at analysing images.       
        How crowded is this image on a scale of 1-10? Give answer to 2 d.p.
        Given the score, suggest whether personnel should be moved to support this area or moved to other areas.
        Do not bother with formatting such as headings. Be extremely concise, limiting the whole response to 4-5 lines.
    """
