import HomeView from "./home-view.js";
import HomePresenter from "./home-presenter.js";

class HomePage {
  async render() {
    return "";
  }

  async afterRender() {
    const mainContentContainer = document.querySelector("#main-content");

    if (mainContentContainer) {
      new HomePresenter({
        view: new HomeView(),
        contentContainer: mainContentContainer, // Mengirim container yang benar ke Presenter
      });
    } else {
      console.error("Content container (#main-content) not found!");
    }
  }
}

export default HomePage;
