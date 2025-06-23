import {TABLET_WIDTH, DESKTOP_WIDTH, updateContainerFocus} from './common-constants';
import './navigation-toggle';
import {updateHeroSlidesContentsMargin, updateHeroSlidesTextWrappersNeboHeight, updateHeroPaginationNeboHeight} from './hero-slider';
import {initProgramsSlider, updateProgramsSlidesContentNeboHeight} from './programs-slider';
import {updateNewsSliderHeight, updateNewsSlider, updateNewsSlidesNeboSize} from './news-slider';
import {changeAccordeonsState, faqAccordeonsOnResize} from './accordeon';
import {initReviewsSlider} from './reviews-slider';
import {updateCallbackClonedOptionsState} from './callback-form';
import './open-modal-form';
import {updateModalClonedOptionsState} from './modal-form';
import {mainFooterElements} from './footer-focus';

window.addEventListener('load', () => {
  changeAccordeonsState();
  updateCallbackClonedOptionsState();
  updateModalClonedOptionsState();
});

let lastWindowWidth = window.innerWidth;
window.addEventListener('resize', () => {
  if ((lastWindowWidth < TABLET_WIDTH && window.innerWidth >= TABLET_WIDTH) || (lastWindowWidth < DESKTOP_WIDTH && window.innerWidth >= DESKTOP_WIDTH) || (lastWindowWidth >= TABLET_WIDTH && window.innerWidth < TABLET_WIDTH) || (lastWindowWidth >= DESKTOP_WIDTH && window.innerWidth < DESKTOP_WIDTH)) {
    updateHeroSlidesContentsMargin();
    updateHeroSlidesTextWrappersNeboHeight();
    updateHeroPaginationNeboHeight();
    initProgramsSlider();
    updateProgramsSlidesContentNeboHeight();
    updateNewsSliderHeight();
    updateNewsSlider();
    updateNewsSlidesNeboSize();
    faqAccordeonsOnResize();
    initReviewsSlider();
    updateContainerFocus(mainFooterElements, DESKTOP_WIDTH);
  }
  lastWindowWidth = window.innerWidth;
});
