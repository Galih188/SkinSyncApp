from flask import Flask, request, render_template, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import os
from utils.recommend import get_recommendation
from PIL import Image
import io

app = Flask(__name__)
model = load_model("model/model_jenis_kulit.h5")
skin_classes = ['dry', 'normal', 'oily']

def preprocess_image(img_bytes):
    img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    img_array = preprocess_image(file.read())
    prediction = model.predict(img_array)
    class_idx = np.argmax(prediction)
    skin_type = skin_classes[class_idx]
    recommendation = get_recommendation(skin_type)

    return jsonify({
        'skin_type': skin_type,
        'recommendation': recommendation
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
