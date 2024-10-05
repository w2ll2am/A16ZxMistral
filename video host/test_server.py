import requests
import cv2
import numpy as np


def show_image_from_url(url):
    try:
        # Get the image from the URL
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful

        # Convert the image data to a numpy array for OpenCV
        img_array = np.array(bytearray(response.content), dtype=np.uint8)

        # Decode the image array to OpenCV format
        img = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Display the image in a window
        cv2.imshow('Image from URL', img)

        # Wait for a key press and close the image window
        cv2.waitKey(0)
        cv2.destroyAllWindows()

    except requests.exceptions.RequestException as e:
        print(f"An error occurred: {e}")


# Replace the URL with the one hosting the image
image_url = 'http://127.0.0.1:5000/stream/4'
show_image_from_url(image_url)
