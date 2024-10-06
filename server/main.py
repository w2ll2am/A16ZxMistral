import base64
import ast
import json
from datetime import datetime

from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware

from dashboard import Alert
from pixtral import pixtralClient, PixtralMessage, PixtralImage
from gpt4o import gpt4oClient, LargeMessage
from video_engine import videoEngine

from prompting import Prompting

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return "Nenya V1.0 live"


active_connections = []
@app.websocket("/ws/dashboard")
async def dashboard_websocket(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            data = await websocket.receive_text()

            # Parse the received JSON data
            try:
                message_data = json.loads(data)
            except json.JSONDecodeError:
                continue

            response_text = ""

            message_text: str = message_data["text"]
            is_user: bool = message_data["isUser"]

            if message_text.startswith("Tell me more"):
                stream_id = int(message_text[-1])
                hazard = message_text.split(" alert ")[0].split(" ")[-1]
                alert_message = message_text.split(" the ")[-1]

                print(stream_id, hazard, alert_message)

                prompt = Prompting.TELL_ME_MORE.value.format(hazard)

                image = videoEngine.get_stream_by_id(stream_id)
                res = pixtralClient.send_messages(
                    PixtralMessage(prompt),
                    PixtralMessage(alert_message),
                    PixtralImage(image)
                )

                print("PIXTRAL", res)

                response_text = gpt4oClient.send_messages(
                    LargeMessage(
                        hazard,
                        res
                    )
                )

                print("GPT", response_text)

            # if message_data["type"] == "chat":
            #     response_text = "chat is this real??"

            echo_data = {
                "text": response_text,
                "isUser": False
            }
            await websocket.send_json(echo_data)

    finally:
        active_connections.remove(websocket)


@app.get("/stream/alert/{stream_id}", response_class=HTMLResponse)
def stream_analysis_endpoint(stream_id: str):
    attempts = 0
    while attempts < 3:
        image = videoEngine.get_stream_by_id(stream_id)
        res = pixtralClient.send_messages(
            PixtralMessage(Prompting.STREAM_CLASSIFIER.value),
            PixtralImage(image)
        )
        try:
            # clean the string
            res = res.strip("```").lstrip("json").replace("\n", "")
            res = ast.literal_eval(res)

            if res["crowds"] == "True":
                pass

            alerts = [
                Alert(
                    type=hazard,
                    stream_id=int(stream_id),
                    lat=100, long=200,
                    timestamp=datetime.now()
                ).to_dict()
                for hazard in res if res[hazard] == "True"
            ]

            return json.dumps(alerts)

        except:
            attempts += 1
            continue

    return "error"

@app.get("/crowd_analysis/{stream_id}", response_class=HTMLResponse)
def crowd_analysis_endpoint(stream_id: str):
    attempts = 0
    while attempts < 3:
        image = videoEngine.get_stream_by_id(stream_id)
        res = pixtralClient.send_messages(
            PixtralMessage(Prompting.CROWD_ANALYSIS.value),
            PixtralImage(image)
        )

        # clean the string
        res = res.strip("```").lstrip("json").replace("\n", "")
        res = ast.literal_eval(res)
        print(res)
        alerts = [
            Alert(
                type=hazard,
                stream_id=int(stream_id),
                lat=100, long=200,
                timestamp=datetime.now()
            ).to_dict()
            for hazard in res #if res[hazard] == "True"
        ]

        return json.dumps(alerts)

    return "error"


@app.get("/test/stream/{stream_id}", response_class=HTMLResponse)
def test_stream_by_id(stream_id: str):
    image = videoEngine.get_stream_by_id(stream_id)
    res = pixtralClient.send_messages(
        PixtralMessage(Prompting.STREAM_CLASSIFIER.value),
        PixtralImage(image)
    )

    # HTML content with the embedded base64 image and a styled paragraph of text
    html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Image and Paragraph</title>
            <style>
                body {{
                    font-family: Arial, sans-serif;
                    background-color: #f0f0f0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    margin: 0;
                }}
                .container {{
                    background-color: white;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
                    text-align: center;
                    max-width: 800px;
                }}
                img {{
                    width: 300px;
                    height: auto;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }}
                p {{
                    font-size: 16px;
                    color: #333;
                    line-height: 1.6;
                }}
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Stream {stream_id}</h1>
                 <img src="data:image/jpeg;base64,{image}" alt="Base64 Image">
                <p>
                    {res}
                </p>
            </div>
        </body>
        </html>
        """
    return HTMLResponse(content=html_content)
