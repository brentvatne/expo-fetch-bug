# expo-fetch-bug

This is a demo of a bug I found with uploading camera images to a server. The issue only seems to happen with the images provided by expo's camera.

The "Upload local photo" button will post an image you take with the camera.
The "Upload remote photo" button will post the image "https://facebook.github.io/react/logo-og.png"

Despite hitting the same endpoint, the remote photo upload will return a proper status code, and the local photo upload will throw an error.

In this example I am posting the images to www.google.com but you can sub in your own endpoint for testing.
