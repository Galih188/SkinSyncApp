import SkinAnalyzer from "../../services/SkinAnalyze";

class AnalyzePresenter {
  constructor({ view }) {
    this._view = view;
    this._selectedFile = null;
    this._analysisResult = null;

    this._initListeners();
  }

  // Inisialisasi semua listener dari View
  _initListeners() {
    this._view.bindFileUpload((file) => this._handleFileSelect(file));
    this._view.bindCardActions(
      () => this._handleAnalyzeClick(),
      () => this._handleResetClick()
    );
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
    this._view.showLoading();

    try {
      const imageData = await this._readImageAsBase64(this._selectedFile);
      this._analysisResult = await SkinAnalyzer.analyzeImage(imageData);

      this._view.displayAnalysisResult(this._analysisResult);
      this._view.bindResultActions(
        () => this._shareResult(),
        () => this._saveResult()
      );
    } catch (error) {
      console.error("Analysis failed:", error);
      this._view.showError(error.message);
    } finally {
      this._view.hideLoading();
    }
  }

  // Menangani logika saat tombol reset diklik
  _handleResetClick() {
    this._selectedFile = null;
    this._analysisResult = null;
    this._view.resetUI();
  }

  // Membaca file sebagai base64
  _readImageAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
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
