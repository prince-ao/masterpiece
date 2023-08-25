from flask import Flask, request
# import tensorflow as tf
# from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import os
import base64
import random

app = Flask(__name__)

# Ran out of time; almost works :)

@app.route('/patina', methods=['POST'])
def call_patina():
    # data = request.json
    # base64_image = data['image']

    # image = io.BytesIO(base64.b64decode(base64_image))

    # print(np.asarray(Image.open(image)).shape)

    # target_size = (250, 250)
    # resized_image = np.asarray(Image.open(image).resize(target_size))[:, :, :3]

    # print(resized_image.shape)

    # loaded_model = load_model('/home/anon/Projects/masterpiece/backend/patina_apis/patina/model/saved_model')

    # y = loaded_model.predict(resized_image)

    return {"price": random.randint(1000, 10000)}, 200

@app.route('/patina', methods=['PUT'])
def trail_patina():
    # if 'image' not in request.files or 'price' not in request.files:
        # return {'error_message': 'Invalid body'}, 400

    # image = request.files['image']
    # price = request.files['price']

    # if image.filename == '':
        # return {'message': 'No selected image'}, 400
    
    # target_size = (250, 250)
    # resized_image = np.asarray(Image.open(image).resize(target_size))[:, :, :3]

    # loaded_model = load_model('./patina/model/saved_model')

    # y = loaded_model.fit(tf.convert_to_tensor(np.asarray([resized_image])), tf.convert_to_tensor(np.asarray([price])), epochs=1)

    return 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3006)