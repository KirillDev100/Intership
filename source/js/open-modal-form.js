const openModalButton = document.querySelector('#modal-form-open-button');
const closeModalButton = document.querySelector('#modal-form-close-button');
const modal = document.querySelector('.modal');
const modalInteractiveElements = modal.querySelectorAll('a, button, input, textarea, select');
const openModal = () => {
  modal.classList.add('modal--open');
  document.body.classList.add('page__body--modal-opened');
  window.addEventListener('click', handleClickOutside);
  modalInteractiveElements[0].focus();
  window.addEventListener('keydown', modalOnEscape);
};
const closeModal = () => {
  modal.classList.remove('modal--open');
  document.body.classList.remove('page__body--modal-opened');
  window.removeEventListener('click', handleClickOutside);
  window.removeEventListener('keydown', modalOnEscape);
};
function modalOnEscape (evt) {
  if (evt.key === 'Escape' && modal.classList.contains('modal--open') && !Array.from(modal.querySelectorAll('input, textarea')).includes(document.activeElement)) {
    closeModal();
  }
}
function handleClickOutside (evt) {
  if (modal.classList.contains('modal--open') && !modal.querySelector('.modal__container').contains(evt.target) && !openModalButton.contains(evt.target)) {
    closeModal();
  }
}

openModalButton.addEventListener('click', () => {
  openModal();
});
closeModalButton.addEventListener('click', () => {
  closeModal();
});

modal.addEventListener('focusout', (evt) => {
  if (!modal.contains(evt.relatedTarget) && modal.classList.contains('modal--open') && document.body.contains(evt.relatedTarget)) {
    closeModal();
    openModalButton.focus();
  }
});

export {openModal, closeModal};
