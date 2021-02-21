const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
letPhotosArray = [];

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos(photosArray) {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.url,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.url,
      alt: photo.name,
      title: photo.name,
    });

    img.addEventListener("load", imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

const count = 20;
const endpoint = "https://api.imgflip.com/get_memes";

async function getPhotos() {
  try {
    const sliceIndexStart = Number(Math.floor(Math.random() * 75));
    const sliceIndexEnd = Number(sliceIndexStart + count);
    const response = await fetch(endpoint);
    const jsonData = await response.json();
    const photosArray = jsonData.data.memes.slice(
      sliceIndexStart,
      sliceIndexEnd
    );
    displayPhotos(photosArray);
  } catch (err) {
    console.log(err);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

getPhotos();
