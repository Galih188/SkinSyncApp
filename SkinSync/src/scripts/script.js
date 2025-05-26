// Import CSS
import "../styles/main.css";

// Fungsi komponen sederhana
const component = () => {
  const element = document.createElement("div");
  element.innerHTML = "<p>Website ini dibuat dengan webpack</p>";
  element.classList.add("info");

  return element;
};

// Tambahkan komponen ke DOM
document.getElementById("app").appendChild(component());

console.log("Webpack berjalan dengan baik!");
