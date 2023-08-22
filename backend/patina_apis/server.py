from flask import Flask, request
import tensorflow as tf
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import os

app = Flask(__name__)

@app.route('/patina', methods=['POST'])
def call_patina():
    if 'image' not in request.files:
        return {'error_message': 'No image in part'}, 400

    image = request.files['image']

    if image.filename == '':
        return {'message': 'No selected image'}, 400
    
    target_size = (250, 250)
    resized_image = np.asarray(Image.open(image).resize(target_size))[:, :, :3]

    loaded_model = load_model('./patina/model/saved_model')

    y = loaded_model.predict(resized_image)

    return {"price": y}, 200

@app.route('/patina', methods=['PUT'])
def trail_patina():
    if 'image' not in request.files or 'price' not in request.files:
        return {'error_message': 'Invalid body'}, 400

    image = request.files['image']
    price = request.files['price']

    if image.filename == '':
        return {'message': 'No selected image'}, 400
    
    target_size = (250, 250)
    resized_image = np.asarray(Image.open(image).resize(target_size))[:, :, :3]

    loaded_model = load_model('./patina/model/saved_model')

    y = loaded_model.fit(tf.convert_to_tensor(np.asarray([resized_image])), tf.convert_to_tensor(np.asarray([price])), epochs=1)

    return 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3006)