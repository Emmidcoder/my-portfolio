"use strict";
const greeting = document.querySelector(".home__greeting--time");
const slides = document.querySelectorAll(".slide");
const links = document.querySelectorAll(".nav-link");
const linksCon = document.querySelector(".nav-links");
const backButton = document.querySelector(".back-btn");

// links.forEach((link) => (link.style.borderBottom = "none"));

// The greeting//
const time = new Date().getHours();
const greetingTime = [" Good morning", " Good Afternoon", " Good Evening"];

if (time < 12) greeting.innerHTML = greetingTime[0];
if (time >= 12) greeting.innerHTML = greetingTime[1];
if (time >= 16) greeting.innerHTML = greetingTime[2];

let curSlide = 0;
const maxSlide = slides.length;

//The slide features//
const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};

const active = function (tab) {
  links.forEach(function (link) {
    link.classList.add("nav-link__select");
    link.classList.remove("nav-link__hidden-border");
  });

  document
    .querySelector(`.nav-link[data-tab='${tab}']`)
    .classList.add("nav-link__hidden-border");
  document
    .querySelector(`.nav-link[data-tab='${tab}']`)
    .classList.remove("nav-link__select");
};

linksCon.addEventListener("click", function (e) {
  if (e.target.classList.contains("nav-link")) {
    const { tab } = e.target.dataset;

    goToSlide(tab);
    active(tab);
  }
});

backButton.addEventListener("click", function (e) {
  active(0);
  goToSlide(0);
});

const init = function () {
  active(0);
  goToSlide(0);
};
init();
