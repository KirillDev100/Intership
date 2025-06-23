import Swiper from 'swiper';
import { Scrollbar, Navigation } from 'swiper/modules';

let reviewsSlider = null;
const initReviewsSlider = () => {
  if (reviewsSlider) {
    reviewsSlider.destroy(true, true);
  }

  reviewsSlider = new Swiper('#reviews-slider', {
    modules: [Scrollbar, Navigation],
    slidesPerView: 1,
    spaceBetween: 15,
    scrollbar: {
      el: '#reviews-slider-scrollbar',
      hide: false,
      draggable: true
    },
    navigation: {
      nextEl: '#reviews-slider-next',
      prevEl: '#reviews-slider-prev'
    },
    breakpoints: {
      768: {
        spaceBetween: 30,
        slidesPerView: 'auto'
      },
      1440: {
        slidesPerView: 2,
        spaceBetween: 32
      }
    }
  });
};
initReviewsSlider();

export {initReviewsSlider};
