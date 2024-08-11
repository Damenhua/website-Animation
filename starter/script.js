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
// nav
const navLinks = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
// operation
const operationContain = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const opContent = document.querySelectorAll('.operations__content');
// header
const header = document.querySelector('.header');

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

// operation btn
operationContain.addEventListener('click', function (e) {
  // get target tab, avoid click span
  const tab = e.target.closest('.operations__tab');
  console.log(tab);

  // if not click tab
  if (!tab) return;

  // add tabs active
  tabs.forEach(e => e.classList.remove('operations__tab--active'));
  tab.classList.add('operations__tab--active');

  // update content
  opContent.forEach(i => i.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${tab.dataset.tab}`)
    .classList.add('operations__content--active');
});

// nav animation
const navHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const eTarget = e.target;
    const link = eTarget.closest('.nav').querySelectorAll('.nav__link');
    const logo = eTarget.closest('.nav').querySelector('img');

    link.forEach(i => {
      if (i !== eTarget) {
        i.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

// Sticky navigation
const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight); //90

const obsCallback = function (entries, observer) {
  const [entyr] = entries;

  if (!entyr.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const obsObtion = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(obsCallback, obsObtion);
headerObserver.observe(header);

// Reveal section
const sectionAll = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0,
});

sectionAll.forEach(function (sec) {
  sectionObs.observe(sec);
  sec.classList.add('section--hidden');
});

// Lazy loading images
const clearImgs = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};

const imgObs = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '40px',
});

clearImgs.forEach(function (i) {
  imgObs.observe(i);
});

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Slider
const slider__build = function () {
  const slides = document.querySelectorAll('.slide');
  const slider = document.querySelector('.slider');
  const larr = document.querySelector('.slider__btn--left');
  const rarr = document.querySelector('.slider__btn--right');

  let curSlide = 0;
  const maxSlide = slides.length;
  const dotContainer = document.querySelector('.dots');

  /////////////////////////////////////////////
  // Functions
  // slider calculate transform func
  const calSlider = function (n) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - n)}%)`)
    );
  };

  // slider next btn
  const nextBtn = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    }
    curSlide++;
    calSlider(curSlide);
    dotActive(curSlide);
  };

  // slider pre btn
  const preBtn = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    curSlide--;
    calSlider(curSlide);
    dotActive(curSlide);
  };

  // Create dotContainer
  const createDot = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // dot class activeAdd
  const dotActive = function (e) {
    // remove all class
    document
      .querySelectorAll('.dots__dot')
      .forEach(c => c.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${e}"]`)
      .classList.add('dots__dot--active');
  };

  const initSlide = function () {
    calSlider(0);
    createDot();
    dotActive(0);
  };
  initSlide();

  ///////////////////////////////////////////////////
  // Event handler
  // dots keyboard control
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') nextBtn();
    e.key === 'ArrowLeft' && preBtn();
    dotActive(curSlide);
  });

  // dots click control
  dotContainer.addEventListener('click', function (e) {
    const { slide } = e.target.dataset;
    calSlider(slide);
    dotActive(slide);
  });
  larr.addEventListener('click', preBtn);
  rarr.addEventListener('click', nextBtn);
};
slider__build();

//////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
// addEvent
nav.addEventListener('mouseover', navHandler.bind(0.5));
nav.addEventListener('mouseout', navHandler.bind(1));
navLinks.addEventListener('click', navsHandler);
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
