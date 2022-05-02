"use-strict";

console.log("hello mattspigs");

// document.addEventListener("scroll", function (e) {
//   e.preventDefault();
//   console.log("scroll");
// });

const dropDownButton = document.querySelector(".drop_down_button");
const slideList = document.querySelectorAll(".slide");
const slideBtn = document.querySelector(".slider_btn");
const slideBtnLeft = document.querySelector(".slider_btn_left");
const slideBtnRight = document.querySelector(".slider_btn_right");

/*  toggling the "what are pigs" section */
dropDownButton.addEventListener("click", function (e) {
  console.log("click");
  document.querySelector(".toggle_content").classList.toggle("hidden");
  // document.querySelector(".toggle_content").classList.toggle("border_bottom");
});

/* slider functionality */

let curSlide = 0;

slideBtnLeft.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click left");
  console.log(slideList);
});

slideBtnRight.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("click right");
  // if (curSlide < slideList.length) {
  // }
});
