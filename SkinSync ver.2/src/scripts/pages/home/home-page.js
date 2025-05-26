class HomePage {
  constructor() {
    this.title = "Home - SkinSync";
  }

  async render() {
    return `
      <section class="container-home-view" id="home">
        <main class="content">
          <h1>
            Mari Kenali Jenis Kulitmu dengan <i>Skin<span>Sync</span>.</i>
          </h1>
          <p>
            Temukan jenis kulit wajah Anda dengan teknologi analisis terdepan. 
            SkinSync membantu Anda memahami karakteristik kulit untuk perawatan yang lebih tepat dan efektif.
          </p>
          <a href="#/analyze" class="cta">Get Started</a>
        </main>
      </section>
    `;
  }

  async afterRender() {
    // Update document title
    document.title = this.title;

    // Setup smooth scrolling for CTA button
    this.setupSmoothScrolling();

    // Add entrance animation
    this.addEntranceAnimation();
  }

  setupSmoothScrolling() {
    const ctaButton = document.querySelector(".cta");
    if (ctaButton) {
      ctaButton.addEventListener("click", (e) => {
        // Prevent default if it's an internal link
        if (ctaButton.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          window.location.hash = "/analyze";
        }
      });
    }
  }

  addEntranceAnimation() {
    const content = document.querySelector(".container-home-view .content");
    if (content) {
      content.style.opacity = "0";
      content.style.transform = "translateY(20px)";
      content.style.transition = "all 0.6s ease-out";

      setTimeout(() => {
        content.style.opacity = "1";
        content.style.transform = "translateY(0)";
      }, 100);
    }
  }

  destroy() {
    // Cleanup any event listeners or resources
    console.log("HomePage destroyed");
  }
}

export default HomePage;
