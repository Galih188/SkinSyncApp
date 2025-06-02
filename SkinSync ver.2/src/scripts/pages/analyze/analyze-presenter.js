class AnalyzePresenter {
  constructor({ view }) {
    this._view = view;
    this._selectedFile = null;
    this._analysisResult = null;

    this._initListeners();
  }

  // Menginisialisasi semua listener dari View
  _initListeners() {
    this._view.bindFileUpload((file) => this._handleFileSelect(file));
    this._view.bindAnalyzeButtonClick(() => this._handleAnalyzeClick());
    this._view.bindResetButtonClick(() => this._handleResetClick());
  }

  // Menangani logika saat file dipilih
  _handleFileSelect(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      this._view.showNotification(
        "Harap pilih file gambar yang valid.",
        "error"
      );
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      // 5MB
      this._view.showNotification(
        "Ukuran file harus kurang dari 5MB.",
        "error"
      );
      return;
    }

    this._selectedFile = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      this._view.displayImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  // Menangani logika saat tombol analisis diklik
  async _handleAnalyzeClick() {
    if (!this._selectedFile) {
      this._view.showNotification(
        "Silakan pilih gambar terlebih dahulu.",
        "error"
      );
      return;
    }

    this._view.displayAnalysisLoading();

    try {
      this._analysisResult = await this._performAnalysis();
      this._view.displayAnalysisResult(this._analysisResult);
      // Setelah hasil ditampilkan, bind event untuk tombol share dan save
      this._view.bindResultActions(
        () => this._shareResult(),
        () => this._saveResult()
      );
    } catch (error) {
      console.error("Analysis failed:", error);
      this._view.showNotification(
        "Analisis gagal. Silakan coba lagi.",
        "error"
      );
      this._handleResetClick(); // Reset UI jika gagal
    }
  }

  // Menangani logika saat tombol reset diklik
  _handleResetClick() {
    this._selectedFile = null;
    this._analysisResult = null;
    this._view.resetUI();
  }

  // Logika simulasi analisis (sebelumnya di kelas utama)
  async _performAnalysis() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API delay
    const skinTypes = [
      {
        type: "Normal",
        confidence: 85,
        description:
          "Kulit normal memiliki keseimbangan minyak dan kelembaban yang baik.",
        recommendations: [
          "Gunakan pembersih wajah yang lembut",
          "Aplikasikan moisturizer setiap hari",
          "Jangan lupa sunscreen SPF 30+",
        ],
      },
      {
        type: "Berminyak",
        confidence: 78,
        description:
          "Kulit berminyak memproduksi sebum berlebihan, terutama di T-zone.",
        recommendations: [
          "Gunakan pembersih berbahan salisilat acid",
          "Aplikasikan toner untuk mengontrol minyak",
          "Pilih moisturizer oil-free",
        ],
      },
      {
        type: "Kering",
        confidence: 92,
        description:
          "Kulit kering membutuhkan hidrasi ekstra dan perawatan yang melembabkan.",
        recommendations: [
          "Gunakan pembersih yang tidak mengeringkan",
          "Aplikasikan serum hyaluronic acid",
          "Gunakan moisturizer yang kaya dan menutrisi",
        ],
      },
    ];
    return skinTypes[Math.floor(Math.random() * skinTypes.length)];
  }

  // Logika untuk berbagi hasil
  _shareResult() {
    if (navigator.share && this._analysisResult) {
      navigator
        .share({
          title: "Hasil Analisis Kulit - SkinSync",
          text: `Jenis kulit saya: ${this._analysisResult.type} (${this._analysisResult.confidence}% confidence)`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      const text = `Hasil Analisis Kulit SkinSync:\nJenis Kulit: ${this._analysisResult.type}\nTingkat Kepercayaan: ${this._analysisResult.confidence}%`;
      navigator.clipboard
        .writeText(text)
        .then(() =>
          this._view.showNotification("Hasil berhasil disalin!", "success")
        )
        .catch(() =>
          this._view.showNotification("Gagal menyalin hasil.", "error")
        );
    }
  }

  // Logika untuk menyimpan hasil
  _saveResult() {
    if (this._analysisResult) {
      const savedResults = JSON.parse(
        localStorage.getItem("skinSyncResults") || "[]"
      );
      const newResult = {
        ...this._analysisResult,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      };
      savedResults.push(newResult);
      localStorage.setItem("skinSyncResults", JSON.stringify(savedResults));
      this._view.showNotification("Hasil berhasil disimpan!", "success");
    }
  }
}

export default AnalyzePresenter;
