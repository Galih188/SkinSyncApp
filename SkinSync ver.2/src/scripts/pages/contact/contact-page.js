class ContactPage {
  constructor() {
    this.title = "Contact - SkinSync";
  }

  async render() {
    return `
      <section id="contact" class="container-contact">
        <h2><span>Hubungi</span> Kami</h2>
        <p>Ada pertanyaan atau saran? Jangan ragu untuk menghubungi tim SkinSync. Kami siap membantu Anda!</p>

        <div class="contact-content">
          <div class="contact-info">
            <h3>Informasi Kontak</h3>
            
            <div class="contact-item">
              <i data-feather="mail"></i>
              <div>
                <h4>Email</h4>
                <p>support@skinsync.com</p>
                <a href="mailto:support@skinsync.com">Kirim Email</a>
              </div>
            </div>

            <div class="contact-item">
              <i data-feather="phone"></i>
              <div>
                <h4>Telepon</h4>
                <p>+62 21 1234 5678</p>
                <a href="tel:+622112345678">Hubungi Sekarang</a>
              </div>
            </div>

            <div class="contact-item">
              <i data-feather="map-pin"></i>
              <div>
                <h4>Alamat</h4>
                <p>Jl. Teknologi No. 123<br>Jakarta Selatan, 12345</p>
                <a href="#" onclick="window.open('https://maps.google.com', '_blank')">Lihat di Maps</a>
              </div>
            </div>

            <div class="social-media">
              <h4>Ikuti Kami</h4>
              <div class="social-links">
                <a href="#" class="social-link"><i data-feather="instagram"></i></a>
                <a href="#" class="social-link"><i data-feather="twitter"></i></a>
                <a href="#" class="social-link"><i data-feather="facebook"></i></a>
                <a href="#" class="social-link"><i data-feather="linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="contact-form-container">
            <h3>Kirim Pesan</h3>
            <form id="contact-form" class="contact-form">
              <div class="form-group">
                <label for="name">Nama Lengkap</label>
                <input type="text" id="name" name="name" required>
                <span class="error-message"></span>
              </div>

              <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>
                <span class="error-message"></span>
              </div>

              <div class="form-group">
                <label for="phone">Nomor Telepon</label>
                <input type="tel" id="phone" name="phone">
                <span class="error-message"></span>
              </div>

              <div class="form-group">
                <label for="subject">Subjek</label>
                <select id="subject" name="subject" required>
                  <option value="">Pilih Subjek</option>
                  <option value="general">Pertanyaan Umum</option>
                  <option value="technical">Masalah Teknis</option>
                  <option value="feedback">Saran & Feedback</option>
                  <option value="partnership">Kerjasama</option>
                  <option value="other">Lainnya</option>
                </select>
                <span class="error-message"></span>
              </div>

              <div class="form-group">
                <label for="message">Pesan</label>
                <textarea id="message" name="message" rows="5" required 
                          placeholder="Tulis pesan Anda di sini..."></textarea>
                <span class="error-message"></span>
              </div>

              <div class="form-group checkbox-group">
                <label class="checkbox-label">
                  <input type="checkbox" id="newsletter" name="newsletter">
                  <span class="checkmark"></span>
                  Saya ingin menerima newsletter dan update dari SkinSync
                </label>
              </div>

              <button type="submit" class="submit-btn">
                <i data-feather="send"></i>
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>

        <div class="faq-section">
          <h3>Pertanyaan yang Sering Diajukan</h3>
          <div class="faq-container">
            <div class="faq-item">
              <div class="faq-question">
                <h4>Bagaimana cara kerja analisis kulit SkinSync?</h4>
                <i data-feather="chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>SkinSync menggunakan teknologi AI dan machine learning untuk menganalisis foto kulit wajah Anda. Algoritma kami telah dilatih dengan ribuan data kulit untuk memberikan hasil yang akurat.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <h4>Apakah hasil analisis SkinSync akurat?</h4>
                <i data-feather="chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>Ya, SkinSync memiliki tingkat akurasi hingga 90%. Namun, kami tetap menyarankan untuk berkonsultasi dengan dermatologis untuk diagnosis yang lebih mendalam.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <h4>Apakah data foto saya aman?</h4>
                <i data-feather="chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>Keamanan data Anda adalah prioritas utama kami. Semua foto yang diupload akan dienkripsi dan tidak akan dibagikan kepada pihak ketiga tanpa persetujuan Anda.</p>
              </div>
            </div>

            <div class="faq-item">
              <div class="faq-question">
                <h4>Berapa biaya menggunakan SkinSync?</h4>
                <i data-feather="chevron-down"></i>
              </div>
              <div class="faq-answer">
                <p>Saat ini, layanan dasar SkinSync dapat digunakan secara gratis. Kami juga menyediakan paket premium dengan fitur tambahan seperti konsultasi online dan tracking progress.</p>
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

    // Setup form functionality
    this.setupContactForm();

    // Setup FAQ functionality
    this.setupFAQ();

    // Add animations
    this.addAnimations();
  }

  setupContactForm() {
    const form = document.getElementById("contact-form");
    const submitBtn = form.querySelector(".submit-btn");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (this.validateForm()) {
        await this.submitForm();
      }
    });

    // Real-time validation
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });
  }

  validateForm() {
    const form = document.getElementById("contact-form");
    const fields = form.querySelectorAll(
      "input[required], select[required], textarea[required]"
    );
    let isValid = true;

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = "";

    // Clear previous error
    this.clearFieldError(field);

    // Required field validation
    if (field.hasAttribute("required") && !value) {
      errorMessage = `${this.getFieldLabel(fieldName)} wajib diisi`;
    }
    // Email validation
    else if (fieldName === "email" && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Format email tidak valid";
      }
    }
    // Phone validation
    else if (fieldName === "phone" && value) {
      const phoneRegex = /^[\d\-\+\(\)\s]+$/;
      if (!phoneRegex.test(value)) {
        errorMessage = "Format nomor telepon tidak valid";
      }
    }
    // Message length validation
    else if (fieldName === "message" && value && value.length < 10) {
      errorMessage = "Pesan minimal 10 karakter";
    }

    if (errorMessage) {
      this.showFieldError(field, errorMessage);
      return false;
    }

    return true;
  }

  showFieldError(field, message) {
    const formGroup = field.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");

    field.classList.add("error");
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }

  clearFieldError(field) {
    const formGroup = field.closest(".form-group");
    const errorElement = formGroup.querySelector(".error-message");

    field.classList.remove("error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
  }

  getFieldLabel(fieldName) {
    const labels = {
      name: "Nama Lengkap",
      email: "Email",
      phone: "Nomor Telepon",
      subject: "Subjek",
      message: "Pesan",
    };
    return labels[fieldName] || fieldName;
  }

  async submitForm() {
    const form = document.getElementById("contact-form");
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;

    try {
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i data-feather="loader"></i> Mengirim...';

      // Refresh icons
      if (typeof feather !== "undefined") {
        feather.replace();
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Get form data
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      console.log("Form submitted:", data);

      // Show success message
      this.showSuccess(
        "Pesan Anda berhasil dikirim! Kami akan segera merespons."
      );

      // Reset form
      form.reset();
    } catch (error) {
      console.error("Form submission failed:", error);
      this.showError("Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      // Reset button
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Refresh icons
      if (typeof feather !== "undefined") {
        feather.replace();
      }
    }
  }

  setupFAQ() {
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");
      const answer = item.querySelector(".faq-answer");
      const icon = question.querySelector("i");

      question.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");

        // Close all other FAQ items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("open");
          }
        });

        // Toggle current item
        item.classList.toggle("open", !isOpen);
      });
    });
  }

  addAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    });

    const elements = document.querySelectorAll(
      ".contact-info, .contact-form-container, .faq-section"
    );
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease-out";
      observer.observe(el);
    });
  }

  showSuccess(message) {
    this.showNotification(message, "success");
  }

  showError(message) {
    this.showNotification(message, "error");
  }

  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <i data-feather="${
        type === "error" ? "alert-circle" : "check-circle"
      }"></i>
      <span>${message}</span>
    `;

    document.body.appendChild(notification);

    if (typeof feather !== "undefined") {
      feather.replace();
    }

    setTimeout(() => {
      notification.style.opacity = "0";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
  }

  destroy() {
    console.log("ContactPage destroyed");
  }
}

export default ContactPage;
