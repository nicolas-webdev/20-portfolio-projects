// Elements
const [menuBars, overlay, nav1, nav2, nav3, nav4, nav5] = [
  "menu-bars",
  "overlay",
  "nav-1",
  "nav-2",
  "nav-3",
  "nav-4",
  "nav-5",
].map((id) => document.getElementById(id));
const navItems = [nav1, nav2, nav3, nav4, nav5];

// Toggle
const addSlideIn = (el, index) => {
  el.classList.replace(`slide-out-${index}`, `slide-in-${index}`);
};
const addSlideOut = (el, index) => {
  el.classList.replace(`slide-in-${index}`, `slide-out-${index}`);
};
const toggleNav = (e) => {
  e.stopPropagation();
  menuBars.classList.toggle("change");
  if (menuBars.classList.contains("change")) {
    overlay.classList.replace("overlay-slide-left", "overlay-slide-right");
    navItems.forEach((item, index) => addSlideIn(item, index + 1));
    return;
  }
  overlay.classList.replace("overlay-slide-right", "overlay-slide-left");
  navItems.forEach((item, index) => addSlideOut(item, index + 1));
};

// Event Listeners
[menuBars, overlay, nav1, nav2, nav3, nav4, nav5].forEach((el) =>
  el.addEventListener("click", toggleNav)
);
