import Swiper from 'swiper';
import { Grid, Navigation, Pagination } from 'swiper/modules';
import {TABLET_WIDTH, DESKTOP_WIDTH, setSliderTabIndex} from './common-constants';

const NEWS_SLIDES_NEBO_RADIUS_INTERNAL = 16;
const NEWS_SLIDES_NEBO_RADIUS_EXTERNAL = 12;
const MAX_BULLETS_COUNT = 4;
const newsSlides = document.querySelectorAll('.news-slide');

const updateNewsSliderHeight = () => {
  const newsSliderElement = document.querySelector('#news-slider');
  const newsSliderSlides = newsSliderElement.querySelectorAll('.swiper-slide');
  const sliderHeightsArray = [];
  for (let i = 0; i < newsSliderSlides.length; i += 2) {
    newsSliderSlides[i].style.height = 'unset';
    newsSliderSlides[i + 1].style.height = 'unset';
    const sum = newsSliderSlides[i].offsetHeight + (newsSliderSlides[i + 1]?.offsetHeight || 0);
    sliderHeightsArray.push(sum);
  }
  sliderHeightsArray.sort((a, b) => b - a);
  const totalHeight = sliderHeightsArray[0];
  newsSliderElement.querySelector('.swiper-wrapper').style.height = `${totalHeight + 20}px`;
  if (window.innerWidth >= TABLET_WIDTH) {
    newsSliderElement.querySelector('.swiper-wrapper').style.height = 'unset';
  }
};
updateNewsSliderHeight();

const renderNewsCustomPagination = (currentSlider) => {
  let currentIndex = currentSlider.activeIndex;
  let totalSlidesPages = Math.ceil(currentSlider.slides.length / 2);
  const currentPagination = document.querySelector('#news-slider-pagination');
  currentPagination.innerHTML = '';
  const slidesPerGroup = 3;
  if (window.innerWidth >= DESKTOP_WIDTH) {
    totalSlidesPages = Math.ceil(currentSlider.slides.length / 3);
    currentIndex = Math.ceil(currentSlider.activeIndex / slidesPerGroup);
  }

  let end = MAX_BULLETS_COUNT;
  let start = end - MAX_BULLETS_COUNT;
  if (currentIndex >= 2 && currentIndex < totalSlidesPages - 1) {
    end = currentIndex + 2;
  } else if (currentIndex >= totalSlidesPages - 1) {
    end = totalSlidesPages;
  }
  start = end - MAX_BULLETS_COUNT;

  if (totalSlidesPages <= MAX_BULLETS_COUNT) {
    end = totalSlidesPages;
    start = 0;
  }
  for (let i = start; i < end; i++) {
    const bullet = document.createElement('button');
    bullet.setAttribute('type', 'button');
    bullet.classList.add('news-pagination__bullet');
    if (i === currentIndex) {
      bullet.classList.add('news-pagination__bullet--current');
    }
    bullet.textContent = i + 1;
    bullet.addEventListener('click', () => {
      currentSlider.slideTo(i);
      if (window.innerWidth >= DESKTOP_WIDTH) {
        currentSlider.slideTo(i * slidesPerGroup);
      }
    });
    currentPagination.appendChild(bullet);
  }
};

function updateNewsSlidesNeboSize () {
  newsSlides.forEach((newsSlide) => {
    const newsSlideContent = newsSlide.querySelector('.news-slide__content');
    const newsSlideDateWrapper = newsSlide.querySelector('.news-slide__date-wrapper');
    const newsSlideTitleWrapper = newsSlide.querySelector('.news-slide__title-wrapper');
    const newsSlideTextWrapper = newsSlide.querySelector('.news-slide__text-wrapper');
    newsSlideContent.style.setProperty('--nb-w', `${newsSlideContent.offsetWidth - NEWS_SLIDES_NEBO_RADIUS_INTERNAL * 2 - 1.3}px`);
    newsSlideDateWrapper.style.setProperty('--nb-h', `${newsSlideDateWrapper.offsetHeight - (NEWS_SLIDES_NEBO_RADIUS_INTERNAL + NEWS_SLIDES_NEBO_RADIUS_EXTERNAL) - 1}px`);
    newsSlideTitleWrapper.style.setProperty('--nb-h', `${newsSlideTitleWrapper.offsetHeight - (NEWS_SLIDES_NEBO_RADIUS_INTERNAL + NEWS_SLIDES_NEBO_RADIUS_EXTERNAL) - 1}px`);
    newsSlideTextWrapper.style.setProperty('--nb-h', `${newsSlideTextWrapper.offsetHeight - (NEWS_SLIDES_NEBO_RADIUS_INTERNAL + NEWS_SLIDES_NEBO_RADIUS_EXTERNAL) - 1}px`);
  });
}
updateNewsSlidesNeboSize();

let newsSlider;
const updateNewsSlider = () => {
  if (newsSlider) {
    newsSlider.destroy(true, true);
  }
  newsSlider = new Swiper('#news-slider', {
    modules: [Grid, Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    grid: {
      rows: 2,
      fill: window.innerWidth >= TABLET_WIDTH ? 'row' : 'column'
    },
    navigation: {
      nextEl: '#news-slider-next',
      prevEl: '#news-slider-prev'
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 'auto',
        spaceBetween: 32,
        grid: {
          rows: 1,
        },
        slidesPerGroup: 3,
      },
    },
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    on: {
      init: function () {
        updateNewsSliderHeight();
        updateNewsSlidesNeboSize();
        renderNewsCustomPagination(this);
        setSliderTabIndex(this);
        this.slides.forEach((newsSlide) => {
          newsSlide.style.height = 'unset';
        });
      },
      resize: function () {
        setSliderTabIndex(this);
        updateNewsSlidesNeboSize();
        this.slides.forEach((newsSlide) => {
          newsSlide.style.height = 'unset';
        });
      },
      slideChange: function () {
        renderNewsCustomPagination(this);
        setSliderTabIndex(this);
        updateNewsSlidesNeboSize();
        this.slides.forEach((newsSlide) => {
          newsSlide.style.height = 'unset';
        });
      },
    },
  });
  newsSlider.slides.forEach((newsSlide) => {
    newsSlide.style.height = 'unset';
  });
};
updateNewsSlider();

export {updateNewsSliderHeight, updateNewsSlider, updateNewsSlidesNeboSize};
