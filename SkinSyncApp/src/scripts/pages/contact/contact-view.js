class ContactView {
  getTemplate() {
    return `
      <section id="contact" class="container-contact">
        <h2><span>Kontak</span> Kami</h2>
        <p class="section-subtitle">Punya pertanyaan atau masukan? Jangan ragu untuk menghubungi kami melalui form di bawah ini.</p>
        
        <div class="row">
          <div class="contact-card contact-details">
            <h3>Hubungi Kami</h3>
            <div class="contact-info">
              <div class="info-item">
                <i data-feather="mail"></i>
                <span>info@skinsync.com</span>
              </div>
              <div class="info-item">
                <i data-feather="phone"></i>
                <span>+62 123 4567 890</span>
              </div>
            </div>
            <form class="contact-form">
              <div class="input-group">
                <input type="text" placeholder="Nama Anda" required />
              </div>
              <div class="input-group">
                <input type="email" placeholder="Email Anda" required />
              </div>
              <div class="input-group">
                <textarea rows="5" placeholder="Pesan Anda..." required></textarea>
              </div>
              <button type="submit" class="btn-submit">Kirim Pesan <i data-feather="arrow-right"></i></button>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  _addScrollAnimation() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    const elements = document.querySelectorAll(
      ".container-contact .contact-card"
    );
    elements.forEach((el) => {
      observer.observe(el);
    });
  }

  _setupInteractions() {
    const infoItems = document.querySelectorAll(".info-item");
    infoItems.forEach((item) => {
      item.addEventListener(
        "mouseenter",
        () => (item.style.transform = "translateX(5px)")
      );
      item.addEventListener(
        "mouseleave",
        () => (item.style.transform = "translateX(0)")
      );
    });
  }

  show() {
    const mainContent = document.getElementById("main-content");
    mainContent.innerHTML = this.getTemplate();

    this._addScrollAnimation();
    this._setupInteractions();

    if (typeof feather !== "undefined") {
      feather.replace();
    }
  }
}

export default ContactView;
