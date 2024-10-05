
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
        Do you see any dense crowds of more than 60 people, that could be dangerous to vunerable people?
    """
