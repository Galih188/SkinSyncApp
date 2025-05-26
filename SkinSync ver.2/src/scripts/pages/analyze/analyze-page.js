class AnalyzePage {
  constructor() {
    this.title = "Analyze - SkinSync";
    this.selectedFile = null;
    this.analysisResult = null;
  }

  async render() {
    return `
      <section id="analyze" class="container-analyze">
        <h2><span>Analisis</span> Kulit Wajah Kamu</h2>
        <p>Upload foto wajah Anda untuk mengetahui jenis kulit dan mendapatkan rekomendasi perawatan yang tepat.</p>

        <div class="row">
          <div class="card-img">
            <div id="preview-container" class="preview-img">
              <img id="preview" alt="Preview gambar" />
              <div class="placeholder-content">
                <i data-feather="camera" size="48"></i>
                <p>Upload foto wajah Anda</p>
              </div>
            </div>
            <div class="upload-btn">
              <label for="file-input" class="custom-file-upload">
                <i data-feather="upload"></i>
                Upload File
              </label>
              <input type="file" id="file-input" accept="image/*" capture="environment">
            </div>
            <div class="analyze-actions">
              <button id="analyze-btn" class="analyze-button" disabled>
                <i data-feather="search"></i>
                Analisis Kulit
              </button>
              <button id="reset-btn" class="reset-button" style="display: none;">
                <i data-feather="refresh-cw"></i>
                Reset
              </button>
            </div>
          </div>
          
          <div class="card-result">
            <div id="analysis-result" class="analysis-content">
              <div class="result-placeholder">
                <i data-feather="info" size="48"></i>
                <h3>Hasil Analisis</h3>
                <p>Upload foto dan klik "Analisis Kulit" untuk melihat hasil analisis jenis kulit wajah Anda.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Update document title
    document.title = this.title;

    // Setup file upload functionality
    this.setupFileUpload();

    // Setup analysis functionality
    this.setupAnalysis();

    // Setup reset functionality
    this.setupReset();
  }

  setupFileUpload() {
    const fileInput = document.getElementById("file-input");
    const previewImg = document.getElementById("preview");
    const previewContainer = document.getElementById("preview-container");
    const analyzeBtn = document.getElementById("analyze-btn");
    const placeholder = previewContainer.querySelector(".placeholder-content");

    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        this.selectedFile = file;

        // Validate file type
        if (!file.type.startsWith("image/")) {
          this.showError("Please select a valid image file.");
          return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          this.showError("File size should be less than 5MB.");
          return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
          previewImg.src = e.target.result;
          previewImg.style.display = "block";
          placeholder.style.display = "none";
          analyzeBtn.disabled = false;
          analyzeBtn.classList.add("enabled");
        };
        reader.readAsDataURL(file);
      }
    });

    // Drag and drop functionality
    previewContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      previewContainer.classList.add("drag-over");
    });

    previewContainer.addEventListener("dragleave", () => {
      previewContainer.classList.remove("drag-over");
    });

    previewContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      previewContainer.classList.remove("drag-over");

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        fileInput.files = files;
        fileInput.dispatchEvent(new Event("change"));
      }
    });
  }

  setupAnalysis() {
    const analyzeBtn = document.getElementById("analyze-btn");
    const resultContainer = document.getElementById("analysis-result");

    analyzeBtn.addEventListener("click", async () => {
      if (!this.selectedFile) {
        this.showError("Please select an image first.");
        return;
      }

      try {
        // Show loading state
        this.showAnalysisLoading();

        // Simulate analysis process (replace with actual API call)
        await this.performAnalysis();

        // Show results
        this.showAnalysisResult();
      } catch (error) {
        console.error("Analysis failed:", error);
        this.showError("Analysis failed. Please try again.");
      }
    });
  }

  setupReset() {
    const resetBtn = document.getElementById("reset-btn");
    const fileInput = document.getElementById("file-input");
    const previewImg = document.getElementById("preview");
    const previewContainer = document.getElementById("preview-container");
    const analyzeBtn = document.getElementById("analyze-btn");
    const resultContainer = document.getElementById("analysis-result");
    const placeholder = previewContainer.querySelector(".placeholder-content");

    resetBtn.addEventListener("click", () => {
      // Reset file input
      fileInput.value = "";
      this.selectedFile = null;

      // Reset preview
      previewImg.style.display = "none";
      previewImg.src = "";
      placeholder.style.display = "flex";

      // Reset buttons
      analyzeBtn.disabled = true;
      analyzeBtn.classList.remove("enabled");
      resetBtn.style.display = "none";

      // Reset result
      this.analysisResult = null;
      resultContainer.innerHTML = `
        <div class="result-placeholder">
          <i data-feather="info" size="48"></i>
          <h3>Hasil Analisis</h3>
          <p>Upload foto dan klik "Analisis Kulit" untuk melihat hasil analisis jenis kulit wajah Anda.</p>
        </div>
      `;

      // Refresh icons
      setTimeout(() => {
        if (typeof feather !== "undefined") {
          feather.replace();
        }
      }, 100);
    });
  }

  async performAnalysis() {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock analysis result (replace with actual API integration)
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

    // Random selection for demo (replace with actual analysis)
    this.analysisResult =
      skinTypes[Math.floor(Math.random() * skinTypes.length)];
  }

  showAnalysisLoading() {
    const resultContainer = document.getElementById("analysis-result");
    const analyzeBtn = document.getElementById("analyze-btn");

    analyzeBtn.disabled = true;
    analyzeBtn.innerHTML = '<i data-feather="loader"></i> Menganalisis...';

    resultContainer.innerHTML = `
      <div class="loading-analysis">
        <div class="loading-spinner"></div>
        <h3>Sedang menganalisis...</h3>
        <p>Mohon tunggu, kami sedang menganalisis jenis kulit Anda.</p>
      </div>
    `;

    // Refresh icons
    setTimeout(() => {
      if (typeof feather !== "undefined") {
        feather.replace();
      }
    }, 100);
  }

  showAnalysisResult() {
    const resultContainer = document.getElementById("analysis-result");
    const analyzeBtn = document.getElementById("analyze-btn");
    const resetBtn = document.getElementById("reset-btn");

    if (!this.analysisResult) return;

    const { type, confidence, description, recommendations } =
      this.analysisResult;

    resultContainer.innerHTML = `
      <div class="result-success">
        <div class="result-header">
          <i data-feather="check-circle" class="success-icon"></i>
          <h3>Jenis Kulit: ${type}</h3>
          <div class="confidence-bar">
            <span>Tingkat Kepercayaan: ${confidence}%</span>
            <div class="progress-bar">
              <div class="progress-fill" style="width: ${confidence}%"></div>
            </div>
          </div>
        </div>
        
        <div class="result-description">
          <p>${description}</p>
        </div>
        
        <div class="recommendations">
          <h4><i data-feather="star"></i> Rekomendasi Perawatan:</h4>
          <ul>
            ${recommendations.map((rec) => `<li>${rec}</li>`).join("")}
          </ul>
        </div>
        
        <div class="result-actions">
          <button class="share-btn">
            <i data-feather="share-2"></i>
            Bagikan Hasil
          </button>
          <button class="save-btn">
            <i data-feather="bookmark"></i>
            Simpan Hasil
          </button>
        </div>
      </div>
    `;

    // Reset analyze button
    analyzeBtn.disabled = false;
    analyzeBtn.innerHTML = '<i data-feather="search"></i> Analisis Ulang';

    // Show reset button
    resetBtn.style.display = "inline-block";

    // Setup result actions
    this.setupResultActions();

    // Refresh icons
    setTimeout(() => {
      if (typeof feather !== "undefined") {
        feather.replace();
      }
    }, 100);
  }

  setupResultActions() {
    const shareBtn = document.querySelector(".share-btn");
    const saveBtn = document.querySelector(".save-btn");

    if (shareBtn) {
      shareBtn.addEventListener("click", () => {
        this.shareResult();
      });
    }

    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        this.saveResult();
      });
    }
  }

  shareResult() {
    if (navigator.share && this.analysisResult) {
      navigator
        .share({
          title: "Hasil Analisis Kulit - SkinSync",
          text: `Jenis kulit saya: ${this.analysisResult.type} (${this.analysisResult.confidence}% confidence)`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback: copy to clipboard
      const text = `Hasil Analisis Kulit SkinSync:\nJenis Kulit: ${this.analysisResult.type}\nTingkat Kepercayaan: ${this.analysisResult.confidence}%`;
      navigator.clipboard
        .writeText(text)
        .then(() => {
          this.showSuccess("Hasil berhasil disalin ke clipboard!");
        })
        .catch(() => {
          this.showError("Gagal menyalin hasil.");
        });
    }
  }

  saveResult() {
    if (this.analysisResult) {
      // Save to localStorage (in real app, save to backend)
      const savedResults = JSON.parse(
        localStorage.getItem("skinSyncResults") || "[]"
      );
      const newResult = {
        ...this.analysisResult,
        timestamp: new Date().toISOString(),
        id: Date.now(),
      };
      savedResults.push(newResult);
      localStorage.setItem("skinSyncResults", JSON.stringify(savedResults));

      this.showSuccess("Hasil berhasil disimpan!");
    }
  }

  showError(message) {
    this.showNotification(message, "error");
  }

  showSuccess(message) {
    this.showNotification(message, "success");
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i data-feather="${
        type === "error" ? "alert-circle" : "check-circle"
      }"></i>
      <span>${message}</span>
    `;

    // Add to DOM
    document.body.appendChild(notification);

    // Refresh icons
    if (typeof feather !== "undefined") {
      feather.replace();
    }

    // Auto remove after 3 seconds
    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  destroy() {
    console.log("AnalyzePage destroyed");
  }
}
export default AnalyzePage;
