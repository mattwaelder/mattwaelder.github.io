"use-strict";

console.log("hello mattspigs gallery");

const galleryContainer = document.querySelector(".gallery");

//////////////////////////////////////////////////////////////////////////////
/* populating gallery with (lazy) images */
//////////////////////////////////////////////////////////////////////////////

const selectedImgContainer = document.getElementById("selected_img_container");
const selectedImg = document.getElementById("selected_img");

//fn to populate the gallery
const HARDCODEIMAGEVALUE = 46;
let selectedIndex = null;
const populateGal = function () {
  ///////////////////////////////////GALLERY HARD CODE AMOUNT/////////////////////////////////////
  //make new array with length equal to amount of pics in gallery
  const countArr = new Array(HARDCODEIMAGEVALUE);

  //create new images with data-src;
  for (let i = 1; i < countArr.length + 1; i++) {
    let curImg = document.createElement("img");
    curImg.src = `../media/gallery_imgs/gal_img (${i}).jpg`;

    //making an index to use for arrow navigation of images
    curImg.dataset.index = i;

    //toggle for int. obs. lazy loading;
    // curImg.dataset.src = `../media/gallery_imgs/gal_img (${i}).jpg`;
    curImg.loading = "lazy";

    //toggle for int. obs. lazy loading;
    curImg.classList.add("gal_img");
    // curImg.classList.add("gal_img_lazy");

    //event listener for modal functionality
    curImg.addEventListener("click", () => {
      selectedImgContainer.style.transform = `translateY(0)`;
      selectedImg.src = `../media/gallery_imgs/gal_img (${i}).jpg`;
      selectedImg.dataset.index = i;
      selectedIndex = i;
    });

    galleryContainer.appendChild(curImg);
  }
};

populateGal();

//modal selected image moved above view
selectedImgContainer.addEventListener("click", function () {
  selectedImgContainer.style.transform = `translateY(-100%)`;
  // selectedImgContainer.src = "";
});

//////////////////////////////////////////////////////////////////////////////
/* gallery image navigation */
//////////////////////////////////////////////////////////////////////////////
const prevImg = function () {
  //if on first image
  if (selectedIndex === 1) {
    selectedImg.src = `../media/gallery_imgs/gal_img (${HARDCODEIMAGEVALUE}).jpg`;
    selectedIndex = HARDCODEIMAGEVALUE;
    return;
  }

  selectedImg.src = `../media/gallery_imgs/gal_img (${selectedIndex - 1}).jpg`;
  selectedIndex--;
};

const nextImg = function () {
  //if on last image
  if (selectedIndex === HARDCODEIMAGEVALUE) {
    selectedImg.src = `../media/gallery_imgs/gal_img (${1}).jpg`;
    selectedIndex = 1;
    return;
  }

  selectedImg.src = `../media/gallery_imgs/gal_img (${selectedIndex + 1}).jpg`;
  selectedIndex++;
};

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  const key = e.key;
  if (!key) return;
  if (key === "ArrowLeft") {
    prevImg();
  } else if (key === "ArrowRight") {
    nextImg();
  }
});

//////////////////////////////////////////////////////////////////////////////
/* mobile touch navigation */
//////////////////////////////////////////////////////////////////////////////

//the endtouch will need access to these
let startX;
let endX;

//start of swipe on image (mainly to get starting X value)
selectedImg.addEventListener("touchstart", function (e) {
  e.preventDefault();
  startX = e.touches[0].screenX;
});

//issuing callback functions at the end of the touch, its slow in devtools but works :o
selectedImg.addEventListener("touchend", function (e) {
  e.preventDefault();
  endX = e.changedTouches[0].screenX;

  let swipeLen = Math.abs(endX - startX);

  //arbitrary length value to prevent accidental swipes
  if (swipeLen >= 50) {
    if (startX < endX) prevImg();
    if (startX > endX) nextImg();
  }
});

//////////////////////////////////////////////////////////////////////////////
/* Int Obs API lazy loading seems to suck with grid*/
//////////////////////////////////////////////////////////////////////////////

// const lazyImgs = document.querySelectorAll("[data-src]");

// const imgLoader = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) return;
//   console.log(entry.target);

//   entry.target.src = entry.target.dataset.src;
//   entry.target.classList.remove("gal_img_lazy");
//   entry.target.classList.add("gal_img");
//   observer.unobserve(entry.target);
// };

// const settingsObj = {
//   root: null,
//   threshold: 0,
//   rootMargin: "100%",
// };

// const imgObserver = new IntersectionObserver(imgLoader, settingsObj);

// lazyImgs.forEach((img) => imgObserver.observe(img));

//////////////////////////////////////////////////////////////////////////////
/* xxxx */
//////////////////////////////////////////////////////////////////////////////
