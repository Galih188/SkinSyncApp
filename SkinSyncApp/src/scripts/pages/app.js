import UrlParser from "../routes/url-parser.js";
import routes from "../routes/routes.js";
import NavigationComponent from "./components/navigation.js";

class App {
  constructor() {
    this.navigation = new NavigationComponent();
    this.currentPage = null;
  }

  async init() {
    try {
      // Render navigation
      await this.renderNavigation();

      // Setup routing
      this.setupRouting();

      // Initial page load
      await this.renderPage();

      // Setup navigation events
      this.setupNavigationEvents();
    } catch (error) {
      console.error("Failed to initialize app:", error);
      throw error;
    }
  }

  async renderNavigation() {
    const navigationContainer = document.getElementById("navigation");
    if (navigationContainer) {
      navigationContainer.innerHTML = this.navigation.render();

      // Initialize navigation functionality
      this.navigation.afterRender();
    }
  }

  setupRouting() {
    // Handle initial load and hash changes
    window.addEventListener("hashchange", () => this.renderPage());
    window.addEventListener("load", () => this.renderPage());
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url] || routes["/"];

      // Clear previous page
      if (this.currentPage && this.currentPage.destroy) {
        this.currentPage.destroy();
      }

      // Create new page instance
      this.currentPage = new page();

      // Render page
      const mainContent = document.getElementById("main-content");
      if (mainContent && this.currentPage) {
        mainContent.innerHTML = await this.currentPage.render();

        // Execute post-render logic
        if (this.currentPage.afterRender) {
          await this.currentPage.afterRender();
        }

        // Update active navigation state
        this.updateActiveNavigation(url);

        // Refresh icons
        setTimeout(() => {
          if (typeof feather !== "undefined") {
            feather.replace();
          }
        }, 100);
      }
    } catch (error) {
      console.error("Failed to render page:", error);
      this.renderErrorPage(error);
    }
  }

  updateActiveNavigation(currentUrl) {
    // Remove all active states
    const navLinks = document.querySelectorAll(".navbar-nav a");
    navLinks.forEach((link) => link.classList.remove("active"));

    // Add active state to current page
    const activeLink = document.querySelector(`[href="#${currentUrl}"]`);
    if (activeLink) {
      activeLink.classList.add("active");
    }
  }

  setupNavigationEvents() {
    // Close mobile menu when clicking on navigation links
    const navLinks = document.querySelectorAll(".navbar-nav a");
    const navbarNav = document.querySelector(".navbar-nav");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (navbarNav) {
          navbarNav.classList.remove("active");
        }
      });
    });
  }

  renderErrorPage(error) {
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.innerHTML = `
        <div class="error-page">
          <div class="error-content">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>The page you're looking for doesn't exist.</p>
            <a href="#/" class="btn-primary">Back to Home</a>
          </div>
        </div>
      `;
    }
  }
}

export default App;
