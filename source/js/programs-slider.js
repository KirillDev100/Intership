import Swiper from 'swiper';
import { Scrollbar, Navigation } from 'swiper/modules';
import {setSliderTabIndex} from './common-constants';

const PROGRAMS_SLIDE_CONTENT_NEBO_RADIUS = 18;
const PROGRAMS_SLIDE_CONTENT_NEBO_RADIUS_EXTERNAL = 12;

let programsSlider = null;
const initProgramsSlider = () => {
  if (programsSlider) {
    programsSlider.destroy(true, true);
  }

  programsSlider = new Swiper('#programs-slider', {
    modules: [Scrollbar, Navigation],
    slidesPerView: 1,
    spaceBetween: 15,
    scrollbar: {
      el: '#programs-slider-scrollbar',
      hide: false,
      draggable: true
    },
    navigation: {
      nextEl: '#programs-slider-next',
      prevEl: '#programs-slider-prev'
    },
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
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1440: {
        allowTouchMove: false,
        slidesPerView: 3,
        spaceBetween: 32
      }
    }
  });
};
initProgramsSlider();

const updateProgramsSlidesContentNeboHeight = () => {
  programsSlider.slides.forEach((slide) => {
    const slideContent = slide.querySelector('.programs-slide__content');
    slideContent.style.setProperty('--nb-h', `${slideContent.querySelector('.programs-slide__title').offsetHeight + 24 - (PROGRAMS_SLIDE_CONTENT_NEBO_RADIUS + PROGRAMS_SLIDE_CONTENT_NEBO_RADIUS_EXTERNAL)}px`);
  });
};
updateProgramsSlidesContentNeboHeight();

export {initProgramsSlider, updateProgramsSlidesContentNeboHeight};
