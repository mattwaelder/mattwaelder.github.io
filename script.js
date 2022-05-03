"use-strict";

console.log("hello mattspigs");

const navButtons = document.querySelector(".nav_buttons");
const dropDownButton = document.querySelector(".drop_down_button");
const slideList = document.querySelectorAll(".slide");
const slideBtn = document.querySelector(".slider_btn");
const slideBtnLeft = document.querySelector(".slider_btn_left");
const slideBtnRight = document.querySelector(".slider_btn_right");

//////////////////////////////////////////////////////////////////////////////
/* smooth scrolling */
//////////////////////////////////////////////////////////////////////////////

navButtons.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////////////////////////////////////////
/*  toggling the "what are pigs" section */
//////////////////////////////////////////////////////////////////////////////

dropDownButton.addEventListener("click", function (e) {
  console.log("click");
  document.querySelector(".toggle_content").classList.toggle("hidden_toggle");
  // document.querySelector(".toggle_content").classList.toggle("border_bottom");
});

//////////////////////////////////////////////////////////////////////////////
/*  revealing sections using observer API */
//////////////////////////////////////////////////////////////////////////////

const allSections = document.querySelectorAll(".section");

//a callback fn which removes hidden class then stops observing
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

//hide all sections at start
allSections.forEach(function (section) {
  section.classList.add("section--hidden");
  //telling observer api to observe each section as we add hidden class
  sectionObserver.observe(section);
});

//////////////////////////////////////////////////////////////////////////////
/* slider functionality */
//////////////////////////////////////////////////////////////////////////////

const slider = function () {
  let curSlide = 0;

  //function that goes through slideList and sets css offset based off the index of the slide and curslide (curslide is what's passed into the fn). if i=0 and curslide=0 translateX=0.
  const goToSlide = function (slide) {
    slideList.forEach(
      (s, i) => (s.style.transform = `translateX(${150 * (i - slide)}%`)
    );
  };

  const nextSlide = function () {
    if (curSlide === slideList.length - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = slideList.length - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
  };

  //init here in case i decide to add slide dots
  const init = function () {
    goToSlide(0);
  };

  init();

  slideBtnLeft.addEventListener("click", prevSlide);
  slideBtnRight.addEventListener("click", nextSlide);
};

slider();

//////////////////////////////////////////////////////////////////////////////
/* TABBED SELECTION */
//////////////////////////////////////////////////////////////////////////////
