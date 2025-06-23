const navigation = document.querySelector('.main-header__navigation');
const navigationToggle = document.querySelector('.main-header__navigation-toggle');
const navigationItemsWithButtons = document.querySelectorAll('.header-navigation__item:has(.header-navigation__button)');
navigation.querySelectorAll('a, button').forEach((element) => {
  element.setAttribute('tabindex', '-1');
});

const navigationObserver = new ResizeObserver(() => {
  if (navigation.classList.contains('main-header__navigation--open')) {
    navigation.style.maxHeight = `${navigation.scrollHeight + 1}px`;
  }
});
const closeNavigation = () => {
  navigation.classList.remove('main-header__navigation--open');
  navigationToggle.classList.remove('main-header__navigation-toggle--open');
  document.body.classList.remove('page__body--modal-opened');
  window.removeEventListener('click', handleClickOutside);
  navigation.style.maxHeight = 0;
  navigationObserver.unobserve(navigation);
  navigationItemsWithButtons.forEach((navigationItem) => {
    const navigationButton = navigationItem.querySelector('.header-navigation__button');
    const navigationItemList = navigationItem.querySelector('.header-navigation__item-list');
    navigationButton.classList.remove('header-navigation__button--current');
    navigationItemList.style.maxHeight = 0;
  });
  navigation.querySelectorAll('a, button').forEach((element) => {
    element.setAttribute('tabindex', '-1');
  });
  window.removeEventListener('keydown', navigationOnEscape);
};
const openNavigation = () => {
  navigation.classList.add('main-header__navigation--open');
  navigationToggle.classList.add('main-header__navigation-toggle--open');
  document.body.classList.add('page__body--modal-opened');
  window.addEventListener('click', handleClickOutside);
  navigation.style.maxHeight = `${navigation.scrollHeight + 1}px`;
  navigation.querySelectorAll('a:not(.header-navigation__item-subitem-link), button').forEach((element) => {
    element.setAttribute('tabindex', '0');
  });
  window.addEventListener('keydown', navigationOnEscape);
};
function handleClickOutside (evt) {
  if (navigation.classList.contains('main-header__navigation--open') && !navigation.contains(evt.target) && !navigationToggle.contains(evt.target)) {
    closeNavigation();
  }
}
function navigationOnEscape (evt) {
  if (evt.key === 'Escape' && navigation.classList.contains('main-header__navigation--open')) {
    closeNavigation();
  }
}

navigationToggle.addEventListener('click', () => {
  if (navigationToggle.classList.contains('main-header__navigation-toggle--open')) {
    closeNavigation();
  } else {
    openNavigation();
  }
});
navigationToggle.addEventListener('focusout', (evt) => {
  if (!navigation.contains(evt.relatedTarget) && !navigationToggle.contains(evt.relatedTarget) && document.body.contains(evt.relatedTarget)) {
    closeNavigation();
  }
});
navigation.addEventListener('focusout', (evt) => {
  if (!navigation.contains(evt.relatedTarget) && document.body.contains(evt.relatedTarget) && !navigationToggle.contains(evt.relatedTarget)) {
    closeNavigation();
  }
});
navigationItemsWithButtons.forEach((navigationItem) => {
  const navigationButton = navigationItem.querySelector('.header-navigation__button');
  const navigationItemList = navigationItem.querySelector('.header-navigation__item-list');
  navigationItemList.querySelectorAll('.header-navigation__item-subitem-link').forEach((navigationSublink) => {
    navigationSublink.setAttribute('tabindex', '-1');
  });
  navigationButton.addEventListener('click', () => {
    if (navigationButton.classList.contains('header-navigation__button--current')) {
      navigationItemList.style.maxHeight = 0;
      navigationItemList.querySelectorAll('.header-navigation__item-subitem-link').forEach((navigationSublink) => {
        navigationSublink.setAttribute('tabindex', '-1');
      });
    } else {
      navigationItemList.style.maxHeight = `${navigationItemList.scrollHeight}px`;
      navigationItemList.querySelectorAll('.header-navigation__item-subitem-link').forEach((navigationSublink) => {
        navigationSublink.setAttribute('tabindex', '0');
      });
    }
    navigationButton.classList.toggle('header-navigation__button--current');
    navigationObserver.observe(navigation);
  });
});
