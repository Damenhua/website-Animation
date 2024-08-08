'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
// btn
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const learnBtn = document.querySelector('.btn--scroll-to');
// section
const section1 = document.querySelector('#section--1');
const sections = document.querySelectorAll('.nav__links');

// openModal function
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// closeModal function
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// open account modal
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

// Learn more btn
learnBtn.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

// navigation, do not use forEach
const navsHandler = function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const hash = e.target.getAttribute('href');
    document.querySelector(hash).scrollIntoView({ behavior: 'smooth' });
  }
};

sections.addEventListener('click', navsHandler);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
