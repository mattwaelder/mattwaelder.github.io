"use-strict";

console.log("hello mattspigs");

//whatever i click logs that element to console (bug testing resons)
window.addEventListener("click", (e) => console.log(e.target));

//////////////////////////////////////////////////////////////////////////////
/* smooth scrolling */
//////////////////////////////////////////////////////////////////////////////

const navButtons = document.querySelector(".nav_buttons");

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
/* HAMBURGER MENU FUNCTIONALITY */
//////////////////////////////////////////////////////////////////////////////

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile_menu");
const mobileMenuContainer = document.querySelector(".mobile_menu_container");
const mobileMenuBtns = document.querySelectorAll(".mobile_nav_btn");

//callback fn to open mobile menu
const mobileMenuOpen = function (e) {
  const clicked = e.target.closest(".fa-bars");
  if (!clicked) return;
  mobileMenuContainer.style["animation-name:"] = "mobileMenuDrop";
  mobileMenuContainer.classList.toggle("hidden");
};

//listen for hamburger click
hamburger.addEventListener("click", mobileMenuOpen);

//tried for hours to get a reverse animation, its 1:30am and i have work tomorrow so im good on this.
// hamburger.addEventListener("click", mobileMenuClose);

//clicking menu items
//listening to the entire mobile window
mobileMenu.addEventListener("click", function (e) {
  e.preventDefault();
  //getting what was clicked
  const clicked = e.target;
  if (!clicked) return;

  //getting the nav link from the parent (whole button)
  const clickedChild = clicked.querySelector(".mobile_nav_link");

  //if clicked the nav link directly
  if (clicked.classList.contains("mobile_nav_link")) {
    const id = clicked.getAttribute("href");
    mobileMenuContainer.classList.toggle("hidden");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
    return;
  }

  //if you clicked parent of nav link (whole button)
  if (clickedChild.classList.contains("mobile_nav_link")) {
    const id = clickedChild.getAttribute("href");
    mobileMenuContainer.classList.toggle("hidden");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
    return;
  }
  //no, im not proud of it, but it works OK?
});

//////////////////////////////////////////////////////////////////////////////
/*  toggling the "what are pigs" section */
//////////////////////////////////////////////////////////////////////////////

const dropDownButtonContainer = document.querySelector(
  ".drop_down_button_container"
);
const dropDownButton = document.querySelector(".drop_down_button");

const toggleChevronUpDown = function () {
  if (dropDownButton.classList.contains("fa-chevron-down")) {
    //flip chevron up
    dropDownButton.classList.remove("fa-chevron-down");
    dropDownButton.classList.add("fa-chevron-up");
    //display hidden content
    document.querySelector(".toggle_content").classList.toggle("hidden_toggle");
  } else {
    //flip chevron down
    dropDownButton.classList.add("fa-chevron-down");
    dropDownButton.classList.remove("fa-chevron-up");
    //remove content
    document.querySelector(".toggle_content").classList.toggle("hidden_toggle");
  }
};

//event listener, on click: flip chevron, toggle content
dropDownButtonContainer.addEventListener("click", toggleChevronUpDown);

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
btnCloseModal.classList.add("hidden");

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
  //telling observer api to observe each section and add hidden class
  sectionObserver.observe(section);
});

//////////////////////////////////////////////////////////////////////////////
/*  revealing intro cards using observer API */
//////////////////////////////////////////////////////////////////////////////

const cowpigCard = document.getElementById("cowpig_intro_container");
const bagelCard = document.getElementById("bagel_intro_container");

const revealIntroPara = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("card--hidden");
  observer.unobserve(entry.target);
};

const cardObserver = new IntersectionObserver(revealIntroPara, {
  root: null,
  threshold: 0.3,
});

//cowpigs card isnt really necessary at this moment, since it is revealed nicely by the section reveal.

// cowpigCard.classList.add("card--hidden");
// cardObserver.observe(cowpigCard);
bagelCard.classList.add("card--hidden");
cardObserver.observe(bagelCard);

//////////////////////////////////////////////////////////////////////////////
/* slider functionality */
//////////////////////////////////////////////////////////////////////////////

const sliderBtnContainer = document.querySelector(".slider_btns_container");
const slideList = document.querySelectorAll(".slide");
const slideBtn = document.querySelector(".slider_btn");
const slideBtnLeft = document.querySelector(".slider_btn_left");
const slideBtnRight = document.querySelector(".slider_btn_right");

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

  sliderBtnContainer.addEventListener("click", function (e) {
    let pressed = e.target.closest(".slider_btn_container");
    if (!pressed) return;
    //sometimes 2 lines of code are better than 1 line of code, ya know?
    // pressed === slideBtnLeft ? prevSlide() : nextSlide();
    if (pressed === slideBtnLeft) prevSlide();
    if (pressed === slideBtnRight) nextSlide();
  });
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
