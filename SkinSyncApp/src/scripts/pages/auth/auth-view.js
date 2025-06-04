class AuthView {
  getTemplate() {
    return `
      <section id="auth" class="container-auth">
        <h2><span>Autentikasi</span> Pengguna</h2>
        <p class="section-subtitle">Masuk untuk melanjutkan atau daftar jika Anda pengguna baru.</p>
        
        <div class="row">
          <div class="auth-card">
            <div class="auth-toggle">
              <button id="to-signin" class="btn-toggle active">Sign In</button>
              <button id="to-signup" class="btn-toggle">Sign Up</button>
            </div>

            <form id="signin-form" class="auth-form active">
              <h3>Sign In</h3>
              <div class="input-group">
                <input type="email" placeholder="Email Anda" required />
              </div>
              <div class="input-group">
                <input type="password" placeholder="Password Anda" required />
              </div>
              <button type="submit" class="btn-submit">Sign In <i data-feather="log-in"></i></button>
            </form>

            <form id="signup-form" class="auth-form">
              <h3>Sign Up</h3>
               <div class="input-group">
                <input type="text" placeholder="Nama Anda" required />
              </div>
              <div class="input-group">
                <input type="email" placeholder="Email Anda" required />
              </div>
              <div class="input-group">
                <input type="password" placeholder="Buat Password" required />
              </div>
              <button type="submit" class="btn-submit">Sign Up <i data-feather="user-plus"></i></button>
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

    const elements = document.querySelectorAll(".container-auth .auth-card");
    elements.forEach((el) => {
      observer.observe(el);
    });
  }

  _setupInteractions() {
    const toSigninBtn = document.getElementById("to-signin");
    const toSignupBtn = document.getElementById("to-signup");
    const signinForm = document.getElementById("signin-form");
    const signupForm = document.getElementById("signup-form");

    toSigninBtn.addEventListener("click", () => {
      toSigninBtn.classList.add("active");
      toSignupBtn.classList.remove("active");
      signinForm.classList.add("active");
      signupForm.classList.remove("active");
    });

    toSignupBtn.addEventListener("click", () => {
      toSignupBtn.classList.add("active");
      toSigninBtn.classList.remove("active");
      signupForm.classList.add("active");
      signinForm.classList.remove("active");
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

export default AuthView;
