import base64

from fastapi import FastAPI
from fastapi.responses import HTMLResponse

from pixtral import pixtralClient, PixtralMessage, PixtralImage
from video_engine import videoEngine

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Test commit"}


@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}


@app.get("/test/stream/{stream_id}", response_class=HTMLResponse)
async def test_stream_by_id(stream_id: str):
    image = videoEngine.get_stream_by_id(stream_id)
    res = pixtralClient.send_messages(
        PixtralMessage("What is in this image? describe as concisely as possible"),
        PixtralImage(image)
    )

    message_str = res.choices[0].message.content

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
                    {message_str}
                </p>
            </div>
        </body>
        </html>
        """
    return HTMLResponse(content=html_content)