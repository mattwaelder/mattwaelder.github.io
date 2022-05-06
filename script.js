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

//code to force scroll to top when page refreshed used event listener rather than onUnload for funzies
window.addEventListener("unload", function (e) {
  e.preventDefault();
  this.scrollTo(0, 0);
});

//////////////////////////////////////////////////////////////////////////////
/* hamber menu functionality */
//////////////////////////////////////////////////////////////////////////////
const hamburger = document.querySelector(".hamburger");

//here's where we add functionality to open the nav menu
hamburger.addEventListener("click", () => console.log("burger click"));

//////////////////////////////////////////////////////////////////////////////
/*  toggling the "what are pigs" section */
//////////////////////////////////////////////////////////////////////////////

dropDownButton.addEventListener("click", function (e) {
  console.log("click");
  document.querySelector(".toggle_content").classList.toggle("hidden_toggle");
  // document.querySelector(".toggle_content").classList.toggle("border_bottom");
});

//////////////////////////////////////////////////////////////////////////////
/*  toggle modal window for anatomy pig */
//////////////////////////////////////////////////////////////////////////////
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const anatomyPig = document.querySelector("#anatomy_pig");
const btnCloseModal = document.querySelector("#modal_close");

//call back functions for toggling hidden/modal classes. probably good idea to make a helper fn for add/remove hidden class if we do much more of this...
const openModal = function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  btnCloseModal.classList.toggle("hidden");
};

const closeModal = function () {
  modal.classList.toggle("hidden");
  overlay.classList.toggle("hidden");
  btnCloseModal.classList.toggle("hidden");
};

//event listeners
anatomyPig.addEventListener("click", openModal);
overlay.addEventListener("click", closeModal);
btnCloseModal.addEventListener("click", closeModal);

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
const tabs = document.querySelectorAll(".tab");
const tabsContainer = document.querySelector(".tabs_container");
const tabContent = document.querySelectorAll(".tab_content");

//adding event listener on parent elemtn of tabs to avoid multiple listeners (event delegation)
tabsContainer.addEventListener("click", function (e) {
  //using closest to make sure we hit buttons and not sub-elements in the buttons
  let clicked = e.target.closest(".tab");
  if (!clicked) return;

  //removing active classes from all tabs and all content cards
  tabs.forEach((x) => x.classList.remove("tab--active"));
  tabContent.forEach((x) => x.classList.remove("content--active"));

  //adding active class to the clicked tab
  clicked.classList.add("tab--active");

  //adding active class to content card associated to tab
  //this is done with datasets built into the html to link the tab with certain cards
  document
    .querySelector(`.tab_content--${clicked.dataset.tabId}`)
    .classList.add("content--active");
});

//////////////////////////////////////////////////////////////////////////////
/* XXXXXXX? */
//////////////////////////////////////////////////////////////////////////////
