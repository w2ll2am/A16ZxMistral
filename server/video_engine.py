import requests
from PIL import Image
from io import BytesIO


def show_image_from_url(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful
        img_data = response.content  # Get the image content

        # Open the image using PIL
        img = Image.open(BytesIO(img_data))
        img.show()  # This will open the image in the default image viewer

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")


# Replace the URL with the one hosting the image
image_url = 'https://www.example.com/path/to/image.jpg'
show_image_from_url(image_url)
