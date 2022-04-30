"use-strict";

console.log("hello mattspigs");

// document.addEventListener("scroll", function (e) {
//   e.preventDefault();
//   console.log("scroll");
// });
document
  .querySelector(".drop_down_button")
  .addEventListener("click", function (e) {
    console.log("click");
    document.querySelector(".toggle_content").classList.toggle("hidden");
  });
