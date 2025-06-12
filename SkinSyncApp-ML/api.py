import os
import io
import jwt
from datetime import datetime, timedelta
from functools import wraps

from flask import Flask, request, jsonify
from flask_cors import CORS # Import CORS
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
from PIL import Image
from werkzeug.security import generate_password_hash, check_password_hash

from utils.recommend import get_recommendation

# --- Konfigurasi Aplikasi ---
app = Flask(__name__)
# Tambahkan prefix /api untuk semua rute
app.config['APPLICATION_ROOT'] = '/api'
app.config['SECRET_KEY'] = 'kunci-rahasia-yang-sangat-aman-dan-berbeda'

# Aktifkan CORS untuk seluruh aplikasi
CORS(app)

# --- Model & Data In-Memory ---
model = load_model("model/model_jenis_kulit.h5")
skin_classes = ['dry', 'normal', 'oily']

# Penyimpanan pengguna di memori (diubah untuk menyimpan lebih banyak data)
# Format: { 'email': {'name': 'nama', 'password': 'password_hash'} }
users = {}

# --- Fungsi Helper ---
def preprocess_image(img_bytes):
    img = Image.open(io.BytesIO(img_bytes)).convert('RGB')
    img = img.resize((224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0) / 255.0
    return img_array

# --- Decorator untuk Autentikasi Token ---
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'error': 'Token tidak ditemukan!'}), 401

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            # Ambil email dari token, bukan username
            current_user_email = data['email']
            if current_user_email not in users:
                 return jsonify({'error': 'Pengguna tidak ditemukan!'}), 401
        except:
            return jsonify({'error': 'Token tidak valid atau kedaluwarsa!'}), 401
        
        return f(users[current_user_email], *args, **kwargs)
    return decorated

# --- Rute API (Endpoints) dengan prefix /api ---
API_PREFIX = '/api'

@app.route(f'{API_PREFIX}/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    # Diubah untuk menerima name, email, password
    if not data or not data.get('name') or not data.get('email') or not data.get('password'):
        return jsonify({'error': 'Nama, email, dan password diperlukan!'}), 400

    email = data['email']
    if email in users:
        return jsonify({'error': 'Email sudah terdaftar!'}), 409

    hashed_password = generate_password_hash(data['password'], method='pbkdf2:sha256')
    users[email] = {
        "name": data['name'],
        "password": hashed_password
    }

    return jsonify({'message': 'Pengguna berhasil terdaftar!'}), 201

@app.route(f'{API_PREFIX}/auth/login', methods=['POST'])
def login():
    auth = request.get_json()
    # Diubah untuk menggunakan email
    if not auth or not auth.get('email') or not auth.get('password'):
        return jsonify({'error': 'Login gagal, data tidak lengkap'}), 401

    email = auth['email']
    password = auth['password']

    user_data = users.get(email)

    if not user_data or not check_password_hash(user_data['password'], password):
        return jsonify({'error': 'Email atau password salah!'}), 401

    # Buat token dengan payload email
    token = jwt.encode({
        'email': email,
        'exp': datetime.utcnow() + timedelta(days=1) # Token berlaku 1 hari
    }, app.config['SECRET_KEY'], algorithm="HS256")

    # Kembalikan token DAN data pengguna sesuai permintaan frontend
    return jsonify({
        'token': token,
        'user': {
            'name': user_data['name'],
            'email': email
        }
    })

@app.route(f'{API_PREFIX}/predict', methods=['POST'])
@token_required
def predict(current_user): # Menerima data user dari decorator
    if 'file' not in request.files:
        return jsonify({'error': 'File gambar tidak ditemukan'}), 400

    file = request.files['file']
    try:
        img_array = preprocess_image(file.read())
        prediction = model.predict(img_array)
        class_idx = np.argmax(prediction)
        confidence = float(np.max(prediction)) * 100
        skin_type = skin_classes[class_idx]
        recommendation = get_recommendation(skin_type) # Menggunakan fungsi dari utils/recommend.py

        return jsonify({
            'type': skin_type.capitalize(),
            'description': f"Model kami mengidentifikasi kulit Anda sebagai tipe '{skin_type.capitalize()}'.",
            'recommendations': recommendation
        })
    except Exception as e:
        return jsonify({'error': f'Gagal memproses gambar: {str(e)}'}), 500

@app.route('/')
def home():
    return "<h1>Skin Recommender API Backend</h1><p>Backend is running.</p>"

if __name__ == '__main__':
    # Jalankan di port 3000 agar sesuai dengan frontend
    app.run(host='0.0.0.0', port=3000, debug=True)