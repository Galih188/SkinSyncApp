// Import CSS
import "../styles/main.css";

// Import utilities and components
import App from "./pages/app.js";
import { sleep } from "./utils/index.js";

// Main application initialization
class SkinSyncApp {
  constructor() {
    this.app = null;
    this.init();
  }

  async init() {
    try {
      // Show loading screen
      this.showLoadingScreen();

      // Simulate loading time
      await sleep(1500);

      // Initialize main app
      this.app = new App();
      await this.app.init();

      // Hide loading screen
      this.hideLoadingScreen();

      console.log("✅ SkinSync App initialized successfully!");
    } catch (error) {
      console.error("❌ Failed to initialize SkinSync App:", error);
      this.showError(error);
    }
  }

  showLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.display = "flex";
    }
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById("loading-screen");
    if (loadingScreen) {
      loadingScreen.style.opacity = "0";
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 300);
    }
  }

  showError(error) {
    const appContainer = document.getElementById("app");
    if (appContainer) {
      appContainer.innerHTML = `
        <div class="error-container">
          <h1>Oops! Something went wrong</h1>
          <p>Failed to load SkinSync application</p>
          <pre>${error.message}</pre>
          <button onclick="window.location.reload()">Reload Page</button>
        </div>
      `;
    }
  }
}

// Initialize app when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new SkinSyncApp();
});

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible") {
    // Refresh feather icons when page becomes visible
    setTimeout(() => {
      if (typeof feather !== "undefined") {
        feather.replace();
      }
    }, 100);
  }
});
