const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

// Show Modal, Focus on input
const showModal = () => {
  modal.classList.add("show-modal");
  websiteNameEl.focus();
};

// Modal Event Listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () =>
  modal.classList.remove("show-modal")
);
window.addEventListener("click", ({ target }) =>
  target === modal ? modal.classList.remove("show-modal") : false
);

// Validate Form
const validate = (nameValue, urlValue) => {
  if (!nameValue || !urlValue) {
    alert("Please submit values for both fields.");
    return false;
  }

  const regex = new RegExp(
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  );
  if (!urlValue.match(regex)) {
    alert("Please provide a valid URL");
    return false;
  }

  return true;
};

// Fetch Bookmarks
const fetchBookmarks = () => {
  if (localStorage.getItem("bookmarks")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    return;
  }
  bookmarks = [
    {
      name: "Google",
      url: "https://www.google.com",
    },
  ];
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
};

// Handle Data From Form
const storeBookmark = (e) => {
  e.preventDefault();
  const nameValue = websiteNameEl.value;
  let urlValue = websiteUrlEl.value;
  if (!urlValue.includes("http://", "https://")) {
    urlValue = "https://" + urlValue;
  }
  if (!validate(nameValue, urlValue)) {
    return false;
  }

  const bookmark = {
    name: nameValue,
    url: urlValue,
  };
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  fetchBookmarks();
  bookmarkForm.reset();
  websiteNameEl.focus();
};

// Form Listener
bookmarkForm.addEventListener("submit", storeBookmark);

// On Load
fetchBookmarks();
