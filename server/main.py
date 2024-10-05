import base64

from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse

from pixtral import pixtralClient, PixtralMessage, PixtralImage
from video_engine import videoEngine

from prompting import Prompting

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Test commit"}


@app.get("/stream_analysis/{stream_id}", response_class=HTMLResponse)
async def stream_analysis_endpoint(stream_id: str):
    image = videoEngine.get_stream_by_id(stream_id)
    res = pixtralClient.send_messages(
        PixtralMessage(Prompting.STREAM_CLASSIFIER.value),
        PixtralImage(image)
    )
    return res


@app.websocket("/core_socket")
async def websocket_endpoint(websocket: WebSocket):
    print(f"Socket attached!")
    await websocket.accept()

    while True:
        print(f"Getting new frame for stream {stream_id}")

        await websocket.send_text(f"{res}")


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