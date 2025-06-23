const TABLET_WIDTH = 768;
const DESKTOP_WIDTH = 1440;

const interactiveElementFirstFocusin = (evt) => {
  evt.currentTarget.setAttribute('tabindex', '1');
};
const interactiveElementFirstFocusout = (evt) => {
  evt.currentTarget.setAttribute('tabindex', '0');
};
const interactiveElementFirstKeydown = (evt) => {
  if (evt.key === 'Tab' && evt.shiftKey) {
    interactiveElementFirstFocusout(evt);
  }
};
const interactiveElementSecondFocusout = (evt) => {
  evt.currentTarget.setAttribute('tabindex', '2');
};
const updateContainerFocus = (currentContainerElements, minViewportWidth) => {
  const currentContainerElementsArray = Array.from(currentContainerElements);
  currentContainerElementsArray.sort((a, b) => {
    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();
    const aTop = Math.round(aRect.top + (aRect.height + (window.getComputedStyle(a).marginBottom.replace('px', '') - window.getComputedStyle(a).marginTop.replace('px', ''))) / 2);
    const bTop = Math.round(bRect.top + (bRect.height + (window.getComputedStyle(b).marginBottom.replace('px', '') - window.getComputedStyle(b).marginTop.replace('px', ''))) / 2);
    if (aTop !== bTop) {
      return aTop - bTop;
    }
    return aRect.left - bRect.left;
  });
  let tabIndex = 1;
  currentContainerElementsArray.forEach((currentContainerElement) => {
    const isInteractive = currentContainerElement.tagName === 'A' || currentContainerElement.tagName === 'BUTTON' || currentContainerElement.tagName === 'INPUT' || currentContainerElement.tagName === 'TEXTAREA' || currentContainerElement.tagName === 'SELECT';
    const interactiveElements = currentContainerElement.querySelectorAll('a, button, input, textarea, select');

    if (window.innerWidth >= minViewportWidth) {
      if (isInteractive) {
        currentContainerElement.setAttribute('tabindex', tabIndex);
      }
      if (interactiveElements.length) {
        interactiveElements.forEach((interactiveElement) => {
          interactiveElement.setAttribute('tabindex', tabIndex);
        });
      }
      if (tabIndex === 1) {
        if (isInteractive) {
          currentContainerElement.setAttribute('tabindex', '0');
          currentContainerElement.addEventListener('focusin', interactiveElementFirstFocusin);
          currentContainerElement.addEventListener('focusout', interactiveElementFirstFocusout);
          currentContainerElement.addEventListener('keydown', interactiveElementFirstKeydown);
        }
        if (interactiveElements.length) {
          interactiveElements.forEach((interactiveElement) => {
            interactiveElement.setAttribute('tabindex', '0');
          });
          interactiveElements[interactiveElements.length - 1].addEventListener('focusin', interactiveElementFirstFocusin);
          interactiveElements[interactiveElements.length - 1].addEventListener('focusout', interactiveElementFirstFocusout);
          interactiveElements[interactiveElements.length - 1].addEventListener('keydown', interactiveElementFirstKeydown);
        }
      }
      if (tabIndex === 2) {
        if (isInteractive) {
          currentContainerElement.addEventListener('keydown', interactiveElementFirstKeydown);
          currentContainerElement.addEventListener('focusout', interactiveElementSecondFocusout);
        }
        if (interactiveElements.length) {
          interactiveElements[0].addEventListener('keydown', interactiveElementFirstKeydown);
          interactiveElements[0].addEventListener('focusout', interactiveElementSecondFocusout);
        }
      }
      if (isInteractive || interactiveElements.length) {
        tabIndex++;
      }
    } else {
      if (tabIndex === 1) {
        if (isInteractive) {
          currentContainerElement.removeEventListener('focusin', interactiveElementFirstFocusin);
          currentContainerElement.removeEventListener('focusout', interactiveElementFirstFocusout);
          currentContainerElement.removeEventListener('keydown', interactiveElementFirstKeydown);
          currentContainerElement.setAttribute('tabindex', '0');
        }
        if (interactiveElements.length) {
          interactiveElements[interactiveElements.length - 1].removeEventListener('focusin', interactiveElementFirstFocusin);
          interactiveElements[interactiveElements.length - 1].removeEventListener('focusout', interactiveElementFirstFocusout);
          interactiveElements[interactiveElements.length - 1].removeEventListener('keydown', interactiveElementFirstKeydown);
          interactiveElements.forEach((interactiveElement) => {
            interactiveElement.setAttribute('tabindex', '0');
          });
        }
      }
    }
  });
};
const setSliderTabIndex = (slider) => {
  slider.slides.forEach((slide) => {
    const isVisible = slide.classList.contains('swiper-slide-visible');
    slide.querySelectorAll('a, button, input, textarea, select, [tabindex]')
      .forEach((el) => {
        el.tabIndex = isVisible ? 0 : -1;
      });
  });
};

export {TABLET_WIDTH, DESKTOP_WIDTH, updateContainerFocus, setSliderTabIndex};
