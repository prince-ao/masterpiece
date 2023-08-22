import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.applications import ResNet50
import os
import cv2
import numpy as np
import imageio.v3 as iio
from PIL import Image

base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(250, 250, 3))

model = Sequential([
    base_model,

    Flatten(),
    
    Dense(256, activation='relu'),
    
    Dense(1)
])

model.compile(optimizer='adam', loss='mean_squared_error', metrics=['mean_absolute_error', 'mean_squared_error'])

model.summary()

folder_path = 'data'

price_path = f'{folder_path}/prices.txt'

def custom_sort_key(element):
    return int(element.split(".")[0])

image_list = list(os.listdir(folder_path))
image_list.remove("prices.txt")

sorted_image = sorted(image_list, key=custom_sort_key)

def open_image(image):
    target_size = (250, 250)
    resized_image = np.asarray(Image.open(f'{folder_path}/{image}').resize(target_size))[:, :, :3]
    return resized_image

image_array = np.array(list(map(open_image, sorted_image)))

with open(price_path, 'r') as file:
    priceHash = np.array(list(map(lambda x: int(x), file.read().split(","))))

    training_labels, testing_labels = tf.convert_to_tensor(priceHash[:-2]), tf.convert_to_tensor(priceHash[-2:])
    training_images, testing_images = tf.convert_to_tensor(image_array[:-2]), tf.convert_to_tensor(image_array[-2:])

    model.fit(training_images, training_labels, epochs=100)
    
    test_acc = model.evaluate(testing_images,  testing_labels, verbose=2)

model.save('model/saved_model')