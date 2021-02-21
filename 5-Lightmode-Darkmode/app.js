const doc = document.documentElement;
const nav = document.getElementById("nav");
const toggleSwitch = document.querySelector('input[type="checkbox"');
const toggleIcon = document.getElementById("toggle-icon");
const textBox = document.getElementById("text-box");
const image1 = document.getElementById("image1");
const image2 = document.getElementById("image2");
const image3 = document.getElementById("image3");

function imageMode(color) {
  image1.src = `./img/undraw_proud_coder_${color}.svg`;
  image2.src = `./img/undraw_conceptual_idea_${color}.svg`;
  image3.src = `./img/undraw_feeling_proud_${color}.svg`;
}

function toggleDarkLightMode(isDark) {
  const theme = isDark ? "dark" : "light";
  doc.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  imageMode(theme);
  toggleIcon.children[0].textContent = theme.toUpperCase();
  isDark
    ? toggleIcon.children[1].classList.replace("fa-sun", "fa-moon")
    : toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
  textBox.style.backgroundColor = isDark
    ? "rgb(255 255 255 / 50%)"
    : "rgb(0 0 0 / 50%)";
  nav.style.backgroundColor = isDark
    ? "rgb(0 0 0 / 50%)"
    : "rgb(255 255 255 / 50%)";
}

function switchTheme({ target }) {
  target.checked ? toggleDarkLightMode(true) : toggleDarkLightMode(false);
}

toggleSwitch.addEventListener("change", switchTheme);

const currentTheme = localStorage.getItem("theme");
currentTheme
  ? doc.setAttribute("data-theme", currentTheme)
  : doc.setAttribute("data-theme", "light");

if (currentTheme === "dark") {
  toggleSwitch.checked = true;
  toggleDarkLightMode(true);
}
