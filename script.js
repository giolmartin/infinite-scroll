"use stirct";
//

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let isInitialLoad = true;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const initialCount = 5;
//Need Unplash API
const apiKey = "";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

//Check if images where loaded

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

//Helper Function to set Attributes on Dom Elements
const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

//Create Elements For Links & Photos, Add to DO
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    //Create <img> for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.description ? photo.description : "Unknow Title",
    });

    //Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    //Put <img> inside <a> then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
//Get Photos from Unplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {
    //Catch error here
  }
}

// Check to see if scrolling near the bottom of page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

//onLoad
getPhotos();
