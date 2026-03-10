Berikut adalah draf `README.md` yang profesional dan komprehensif untuk projek **SkinSync**, disusun berdasarkan struktur kod dan fail yang telah anda berikan:

---

# SkinSync: Sistem Analisis Jenis Kulit Wajah Pintar

SkinSync adalah Aplikasi Halaman Tunggal (SPA) yang menggunakan Kecerdasan Buatan (AI) untuk menganalisis jenis kulit wajah pengguna melalui imej yang dimuat naik. Projek ini bertujuan membantu pengguna memahami keadaan kulit mereka—sama ada kering, berminyak, atau normal—serta memberikan cadangan penjagaan kulit yang bersesuaian.

**Pautan Laman Web:** [https://galih188.github.io/SkinSyncApp-Final/](https://galih188.github.io/SkinSyncApp-Final/)

---

## 🚀 Ciri-ciri Utama

* **Analisis Imej Berasaskan ML**: Menggunakan model Deep Learning (`.h5`) untuk mengklasifikasikan jenis kulit kepada tiga kategori: Kering (*Dry*), Berminyak (*Oily*), dan Normal.
* **Sistem Autentikasi**: Pendaftaran dan log masuk pengguna yang selamat menggunakan Flask-JWT-Extended dan Flask-Bcrypt untuk penyulitan kata laluan.
* **Cadangan Peribadi**: Memberikan deskripsi terperinci mengenai keadaan kulit dan langkah penjagaan yang disyorkan berdasarkan hasil analisis.
* **Antara Muka Responsif**: Dibina sebagai SPA yang pantas dan mesra pengguna menggunakan Webpack.
* **Sistem Maklum Balas**: Membolehkan pengguna menghantar maklum balas terus melalui API.

---

## 🛠️ Arkitektur Teknologi

### Backend & Machine Learning

* **Bahasa**: Python
* **Framework**: Flask
* **AI/ML**: TensorFlow/Keras (Model: `model_jenis_kulit.h5`), NumPy, Pillow (PIL)
* **Security**: JWT (JSON Web Tokens), Bcrypt
* **CORS**: Membolehkan interaksi antara domain frontend dan backend

### Frontend

* **Asas**: JavaScript (ES6+), HTML5, CSS3
* **Alatan Bina (Build Tools)**: Webpack, Webpack Dev Server
* **Gaya**: Reka bentuk CSS kustom yang responsif

---

## 📂 Struktur Projek

```text
SkinSync/
├── SkinSync-BackEnd & ML/       # Logik API dan Model ML
│   └── skin-recommender-api/
│       ├── app.py               # Titik masuk utama API Flask
│       ├── model/               # Fail model TensorFlow (.h5)
│       └── utils/               # Skrip utiliti untuk cadangan
├── SkinSyncApp-FrontEnd/        # Kod sumber aplikasi web
│   ├── src/                     # Kod sumber JavaScript, HTML, & CSS
│   ├── webpack.config.js        # Konfigurasi Webpack
│   └── package.json             # Dependensi Frontend
└── README.md

```

---

## ⚙️ Cara Pemasangan

### 1. Persediaan Backend

1. Masuk ke direktori backend:
```bash
cd "SkinSync-BackEnd & ML/skin-recommender-api"

```


2. Pasang dependensi:
```bash
pip install -r requirements.txt

```


3. Jalankan pelayan:
```bash
python app.py

```


*Pelayan akan berjalan di `http://localhost:5000`.*

### 2. Persediaan Frontend

1. Masuk ke direktori frontend:
```bash
cd SkinSyncApp-FrontEnd

```


2. Pasang dependensi Node.js:
```bash
npm install

```


3. Jalankan mod pembangunan:
```bash
npm start

```


*Aplikasi akan tersedia di `http://localhost:8080` (bergantung pada konfigurasi Webpack).*

---

## 🛣️ Dokumentasi API (Endpoints)

| Method | Endpoint | Fungsi | Autentikasi |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Mendaftar pengguna baru | Tidak |
| `POST` | `/auth/login` | Log masuk dan dapatkan Token JWT | Tidak |
| `POST` | `/predict` | Memuat naik gambar untuk analisis | **Ya (JWT)** |
| `POST` | `/feedback` | Menghantar maklum balas pengguna | Tidak |

---

## 📝 Lesen

Projek ini dilesenkan di bawah **ISC License**.

---

**SkinSync** - *Smart Solutions for Your Skin Health.*
