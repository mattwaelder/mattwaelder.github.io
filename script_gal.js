"use-strict";

console.log("hello mattspigs gallery");

const galleryContainer = document.querySelector(".gallery");

//////////////////////////////////////////////////
/* this is node js, it would be nice to use this but ill hard code things for now until i learn more about using nodejs */
//////////////////////////////////////////////////

// const { promises: fs } = require("fs");
// const dir = "./media/gallery_imgs";

// const getNumFiles = async (dir) => {
//   const files = await fs.readdir(dir);
//   console.log("getnumfn");
//   console.log(files.length);
// };
// getNumFiles(dir);

////////////////////////////////////////////////
const selectedImgContainer = document.getElementById("selected_img_container");
const selectedImg = document.getElementById("selected_img");

const populateGal = function () {
  let selectedIndex = null;

  ///////////////////////////////////GALLERY HARD CODE AMOUNT/////////////////////////////////////
  const countArr = new Array(46);

  //this would be better done by using datasets, adding a dataset value and pulling that from a click event

  for (let i = 1; i < countArr.length + 1; i++) {
    let curImg = document.createElement("img");
    curImg.src = `../media/gallery_imgs/gal_img (${i}).jpg`;
    curImg.classList.add("gal_img");

    curImg.addEventListener("click", () => {
      selectedImgContainer.style.transform = `translateY(0)`;
      selectedImg.src = `../media/gallery_imgs/gal_img (${i}).jpg`;
    });

    galleryContainer.appendChild(curImg);
  }
};

populateGal();

selectedImgContainer.addEventListener("click", function () {
  selectedImgContainer.style.transform = `translateY(-100%)`;
  // selectedImgContainer.src = "";
});
