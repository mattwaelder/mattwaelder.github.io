"use-strict";

console.log("hello mattspigs gallery");

const galleryContainer = document.querySelector(".gallery");

//////////////////////////////////////////////////////////////////////////////
/* populating gallery with (lazy) images */
//////////////////////////////////////////////////////////////////////////////

const selectedImgContainer = document.getElementById("selected_img_container");
const selectedImg = document.getElementById("selected_img");

//fn to populate the gallery
const populateGal = function () {
  let selectedIndex = null;

  ///////////////////////////////////GALLERY HARD CODE AMOUNT/////////////////////////////////////
  //make new array with length equal to amount of pics in gallery
  const countArr = new Array(46);

  //create new images with data-src;
  for (let i = 1; i < countArr.length + 1; i++) {
    let curImg = document.createElement("img");
    curImg.src = `../media/gallery_imgs/gal_img (${i}).jpg`;

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
/* Int Obs API lazy loading seems to suck with grid */
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
