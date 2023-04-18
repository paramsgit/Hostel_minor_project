
from flask import Flask,jsonify,request
import face_recognition
import urllib.request
import cv2
import numpy as np
import json 
import argparse
import warnings
import time

from test import test,check_image
from src.anti_spoof_predict import AntiSpoofPredict
from src.generate_patches import CropImage
from src.utility import parse_model_name
warnings.filterwarnings('ignore')

app = Flask(__name__)

@app.route('/')
def hello():

    checking("hello checking")
    # data = request.get_json()
    # y = json.loads(json.dumps(data))
    # print(y['name'])
    return jsonify({"result":True})

@app.route('/check')
def thisone():
    data = request.get_json()
    y = json.loads(json.dumps(data))
    print(y)
    url1=y['url1']
    url2=y['url2']
    # Load the images from the URLs
    # url1 = "http://localhost:8080/file/1678418886411-any-name-dd.jpg"
    # url2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Mark_Kassen%2C_Tony_C%C3%A1rdenas_and_Chris_Evans_%28cropped%29.jpg/330px-Mark_Kassen%2C_Tony_C%C3%A1rdenas_and_Chris_Evans_%28cropped%29.jpg"
    img1 = urllib.request.urlopen(url1).read()
    img2 = urllib.request.urlopen(url2).read()

    # Convert the images to numpy arrays
    npimg1 = np.frombuffer(img1, np.uint8)
    npimg2 = np.frombuffer(img2, np.uint8)

    img1 = cv2.imdecode(npimg1, cv2.IMREAD_COLOR)
    img2 = cv2.imdecode(npimg2, cv2.IMREAD_COLOR)

    gspoof = test(img1, "./resources/anti_spoof_models", 0)
    print(gspoof)
    # Find the face encodings in each image
    encodings1 = face_recognition.face_encodings(img1)
    encodings2 = face_recognition.face_encodings(img2)

    if len(encodings1) == 0:
        print("No face found in image 1")
        return jsonify({"result":False,"message":"No face found. Bring your face a bit closer to the camera."})
    elif len(encodings2) == 0:
        print("No face found in image 2")
        return jsonify({"result":False,"message":"No face found in profile image."})
    else:
        # Compare the first face encoding in each image
        encoding1 = encodings1[0]
        encoding2 = encodings2[0]
        results = face_recognition.compare_faces([encoding1], encoding2, tolerance=0.4)
        result_number = face_recognition.face_distance([encoding1], encoding2)
        print((1-result_number)*100)
        if results[0] == True:

            return jsonify({"result":True,"message":"Success, Face Matched","spoof":gspoof})
        else:

            return jsonify({"result":False,"message":"Face are not matched"})

        return jsonify({"result":False})

if __name__ == "__main__":
  app.run(host="0.0.0.0", port=8085, debug=False)