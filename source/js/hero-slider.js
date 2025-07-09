import Swiper from 'swiper';
import {Pagination} from 'swiper/modules';
import {TABLET_WIDTH, DESKTOP_WIDTH, setSliderTabIndex} from './common-constants';

const HERO_SLIDE_TEXT_WRAPPER_NEBO_RADIUS = 10;
const HERO_SLIDE_TEXT_WRAPPER_NEBO_RADIUS_EXTERNAL = 14;
const HERO_PAGINATION_NEBO_RADIUS = 10;
const HERO_PAGINATION_NEBO_RADIUS_EXTERNAL = 12;
const HERO_PAGINATION_NEBO_RADIUS_TABLET = 20;
const HERO_SLIDE_CONTENT_NEBO_RADIUS = 10;
const HERO_SLIDE_CONTENT_NEBO_RADIUS_EXTERNAL = 14;
const HERO_SLIDE_CONTENT_NEBO_RADIUS_TABLET = 26;
const HERO_SLIDE_CONTENT_NEBO_RADIUS_EXTERNAL_TABLET = 30;
const HERO_PAGINATION_MARGIN_TOP = 201;
const HERO_PAGINATION_MARGIN_TOP_TABLET = 647;
const HERO_PAGINATION_MARGIN_TOP_DESKTOP = 393;

const heroSlidesContents = document.querySelectorAll('.hero-slide__content');
const heroSliderPagination = document.querySelector('#hero-slider-pagination');
const heroSlideTextWrappers = document.querySelectorAll('.hero-slide__text-wrapper');
const heroPagination = document.querySelector('#hero-slider-pagination');

new Swiper('#hero-slider', {
  modules: [Pagination],
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '#hero-slider-pagination .hero-pagination__wrapper',
    bulletClass: 'hero-pagination__bullet',
    bulletActiveClass: 'hero-pagination__bullet--current',
    clickable: true,
    renderBullet: function (index, className) {
      return `<button class="${className}" type="button">
        <span class="visually-hidden">${index + 1}</span>
      </button>`;
    }
  },
  autoHeight: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  on: {
    slideChange: function () {
      setSliderTabIndex(this);
    },
    init: function () {
      setSliderTabIndex(this);
    },
    resize: function () {
      setSliderTabIndex(this);
    },
  },
  breakpoints: {
    1440: {
      allowTouchMove: false
    }
  }
});

const updateHeroSlidesTextWrappersNeboHeight = () => {
  heroSlideTextWrappers.forEach((heroSlideTextWrapper) => {
    heroSlideTextWrapper.style.setProperty('--nb-h', `${heroSlideTextWrapper.scrollHeight - (HERO_SLIDE_TEXT_WRAPPER_NEBO_RADIUS + HERO_SLIDE_TEXT_WRAPPER_NEBO_RADIUS_EXTERNAL)}px`);
  });
};
updateHeroSlidesTextWrappersNeboHeight();
const updateHeroSlidesContentsMargin = () => {
  heroSlidesContents.forEach((heroSlideContent) => {
    const heroSlideLinkWrapper = heroSlideContent.querySelector('.hero-slide__link-wrapper');
    heroSlideContent.style.setProperty('--nb-h', `${heroSlideLinkWrapper.scrollHeight - (HERO_SLIDE_CONTENT_NEBO_RADIUS + HERO_SLIDE_CONTENT_NEBO_RADIUS_EXTERNAL)}px`);
    heroSlideContent.style.marginTop = `${HERO_PAGINATION_MARGIN_TOP + heroSliderPagination.offsetHeight}px`;

    if (window.innerWidth >= TABLET_WIDTH) {
      heroSlideContent.style.setProperty('--nb-h', `${heroSlideLinkWrapper.scrollHeight + 35 - (HERO_SLIDE_CONTENT_NEBO_RADIUS_TABLET + HERO_SLIDE_CONTENT_NEBO_RADIUS_EXTERNAL_TABLET)}px`);
      heroSlideContent.style.marginTop = `${HERO_PAGINATION_MARGIN_TOP_TABLET + heroSliderPagination.offsetHeight}px`;
    }

    if (window.innerWidth >= DESKTOP_WIDTH) {
      heroSlideContent.style.marginTop = `${HERO_PAGINATION_MARGIN_TOP_DESKTOP + heroSliderPagination.offsetHeight}px`;
    }
  });
};
updateHeroSlidesContentsMargin();
const updateHeroPaginationNeboHeight = () => {
  heroPagination.style.setProperty('--nb-h', `${heroPagination.scrollHeight - (HERO_PAGINATION_NEBO_RADIUS + HERO_PAGINATION_NEBO_RADIUS_EXTERNAL)}px`);

  if (window.innerWidth >= TABLET_WIDTH) {
    heroPagination.style.setProperty('--nb-h', `${heroPagination.scrollHeight - HERO_PAGINATION_NEBO_RADIUS_TABLET * 2}px`);
  }
};
updateHeroPaginationNeboHeight();

export {updateHeroSlidesContentsMargin, updateHeroSlidesTextWrappersNeboHeight, updateHeroPaginationNeboHeight};
