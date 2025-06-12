import requests
import os

# Alamat dasar API Anda
BASE_URL = 'http://127.0.0.1:5000'

def register_user(username, password):
    """Fungsi untuk mendaftarkan pengguna baru."""
    print(f"--- Mencoba mendaftar dengan username: {username} ---")
    response = requests.post(f"{BASE_URL}/register", json={
        "username": username,
        "password": password
    })
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    return response

def login_user(username, password):
    """Fungsi untuk login dan mendapatkan token."""
    print(f"\n--- Mencoba login dengan username: {username} ---")
    response = requests.post(f"{BASE_URL}/login", json={
        "username": username,
        "password": password
    })
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")
    
    if response.status_code == 200:
        return response.json().get('token')
    return None

def get_prediction(token, image_path):
    """Fungsi untuk mengirim gambar untuk prediksi."""
    print(f"\n--- Meminta prediksi untuk gambar: {image_path} ---")
    if not os.path.exists(image_path):
        print(f"Error: File gambar tidak ditemukan di '{image_path}'")
        return

    headers = {'x-access-token': token}
    with open(image_path, 'rb') as f:
        files = {'file': f}
        response = requests.post(f"{BASE_URL}/predict", headers=headers, files=files)
    
    print(f"Status: {response.status_code}")
    print(f"Response: {response.json()}")

if __name__ == '__main__':
    # --- Skenario Pengujian ---
    
    # Daftar pengguna baru
    register_user("user_test", "password123")
    
    # Login dengan pengguna yang baru didaftarkan
    auth_token = login_user("user_test", "password123")
    
    # Jika login berhasil (mendapat token), lakukan prediksi
    if auth_token:
        # Ganti 'path/to/your/image.jpg' dengan path gambar yang valid di komputer Anda
        image_to_predict = 'path/to/your/image.jpg' 
        get_prediction(auth_token, image_to_predict)
    else:
        print("\nTidak bisa mendapatkan token, prediksi dibatalkan.")