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
/* gal_img (1).jpg */

// const galleryCountArr = new Array(75);

// console.log(galleryCountArr.length);

const populateGal = function () {
  let galleryCount = 1;
  while (galleryCount < 76) {
    let curImg = document.createElement("img");
    curImg.src = `../media/gallery_imgs/gal_img (${galleryCount}).jpg`;
    galleryContainer.appendChild(curImg);
    curImg.classList.add("gal_img");
    galleryCount++;
  }
};

populateGal();
