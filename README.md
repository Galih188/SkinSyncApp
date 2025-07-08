graph TD
    subgraph "Pengguna"
        U[📱/💻<br>User]
    end

    subgraph "Sisi Klien (Browser)"
        FE[<b>Front-End</b><br>HTML, CSS, JavaScript<br><i>(Single-Page Application)</i>]
    end

    subgraph "Sisi Server (Cloud)"
        API[<b>RESTful API</b><br><i>(Endpoint: /auth, /predict)</i>]
        BE[<b>Back-End</b><br>Flask (Python)]
        ML[<b>Model Machine Learning</b><br>CNN (.h5)]
        DB[<b>Database</b><br><i>(In-Memory User Data)</i>]
    end

    U -- Interaksi --> FE
    FE -- HTTP Request (JSON) --> API
    API -- Memproses Request --> BE
    BE -- Verifikasi Pengguna --> DB
    BE -- Permintaan Prediksi --> ML
    ML -- Hasil Klasifikasi --> BE
    DB -- Data Pengguna --> BE
    BE -- HTTP Response (JSON) --> API
    API -- Mengirim Response --> FE
    FE -- Menampilkan Hasil --> U

    style FE fill:#f9f,stroke:#333,stroke-width:2px
    style BE fill:#ccf,stroke:#333,stroke-width:2px
    style ML fill:#9cf,stroke:#333,stroke-width:2px
    style DB fill:#fca,stroke:#333,stroke-width:2px
    style API fill:#bbf,stroke:#333,stroke-width:2px
