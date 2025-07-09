import './vendor/imask.js';
import {openModal, closeModal} from './open-modal-form.js';

const modalForm = document.querySelector('.modal-form');
const modalSelect = document.querySelector('.modal-form__select');
const modalSelectDisplay = document.querySelector('.modal-form__select-display');
const modalSelectOptions = modalSelect.querySelectorAll('option');
const modalSelectWrapper = document.querySelector('.modal-form__select-wrapper');
const modalInputs = document.querySelectorAll('.modal-form__input');
const modalCheckboxes = document.querySelectorAll('.modal-form__checkbox');
const modalPhoneInput = document.querySelector('#modal-callback-phone-input');

const phoneMaskOptions = {
  mask: '+7 (000) 000-00-00'
};
new window.IMask(modalPhoneInput, phoneMaskOptions);

const closeModalSelect = () => {
  modalSelectDisplay.classList.remove('modal-form__select-display--opened');
  modalSelect.classList.remove('modal-form__select--opened');
  document.querySelectorAll('.modal-form__select-option').forEach((modalSelectOptionClone) => {
    modalSelectOptionClone.setAttribute('tabindex', '-1');
  });
  modalSelect.removeEventListener('keydown', modalSelectOnKeydown);
  modalSelectDisplay.removeEventListener('keydown', modalSelectOnKeydown);
};

const openModalSelect = () => {
  modalSelectDisplay.classList.add('modal-form__select-display--opened');
  modalSelect.classList.add('modal-form__select--opened');
  document.querySelectorAll('.modal-form__select-option').forEach((modalSelectOptionClone) => {
    modalSelectOptionClone.setAttribute('tabindex', '0');
  });
  modalSelect.addEventListener('keydown', modalSelectOnKeydown);
  modalSelectDisplay.addEventListener('keydown', modalSelectOnKeydown);
};

function modalSelectOnKeydown (evt) {
  if (evt.key === 'Escape') {
    closeModalSelect();
    modalSelect.blur();
    openModal();
  }
}

const updateModalClonedOptionsState = () => {
  modalSelectOptions.forEach((modalSelectOption) => {
    if (modalSelectOption.selected === true) {
      document.querySelectorAll('.modal-form__select-option').forEach((modalSelectOptionClone) => {
        modalSelectOptionClone.classList.remove('modal-form__select-option--selected');
        if (modalSelectOptionClone.dataset.value === modalSelectOption.value) {
          modalSelectOptionClone.classList.add('modal-form__select-option--selected');
        }
      });
    }
  });
};

modalSelectOptions.forEach((modalSelectOption) => {
  const modalSelectOptionClone = document.createElement('button');
  modalSelectOptionClone.setAttribute('type', 'button');
  modalSelectOptionClone.classList.add('modal-form__select-option');
  modalSelectOptionClone.textContent = modalSelectOption.textContent;
  modalSelectOptionClone.dataset.value = modalSelectOption.value;
  modalSelectOptionClone.setAttribute('tabindex', '-1');
  if (modalSelectOptionClone.dataset.value) {
    modalSelectDisplay.appendChild(modalSelectOptionClone);
  }
  modalSelectOptionClone.addEventListener('click', () => {
    modalSelectOption.selected = true;
    document.querySelectorAll('.modal-form__select-option').forEach((modalOptionClone) => {
      modalOptionClone.classList.remove('modal-form__select-option--selected');
    });
    modalSelectOptionClone.classList.add('modal-form__select-option--selected');
    modalSelect.classList.remove('modal-form__select--error');
    closeModalSelect();
  });
});

modalSelect.addEventListener('mousedown', (evt) => {
  evt.preventDefault();

  if (!modalSelect.classList.contains('modal-form__select--opened')) {
    openModalSelect();
  }
  modalSelect.focus();
});

modalSelect.addEventListener('change', () => {
  updateModalClonedOptionsState();
  modalSelect.classList.remove('modal-form__select--error');
});

modalSelect.addEventListener('focusin', () => {
  openModalSelect();
});

modalSelect.addEventListener('focusout', () => {
  closeModalSelect();
});

modalSelectDisplay.addEventListener('focusin', () => {
  openModalSelect();
});

modalSelectDisplay.addEventListener('focusout', () => {
  closeModalSelect();
});

window.addEventListener('click', (evt) => {
  if (!modalSelectWrapper.contains(evt.target)) {
    closeModalSelect();
  }
});

modalInputs.forEach((modalInput) => {
  modalInput.addEventListener('invalid', () => {
    modalInput.classList.add('modal-form__input--error');
  });
  modalInput.addEventListener('input', () => {
    modalInput.classList.remove('modal-form__input--error');
  });
});

modalCheckboxes.forEach((modalCheckbox) => {
  modalCheckbox.addEventListener('invalid', () => {
    modalCheckbox.classList.add('modal-form__checkbox--error');
  });
  modalCheckbox.addEventListener('change', () => {
    modalCheckbox.classList.remove('modal-form__checkbox--error');
  });
});

modalSelect.addEventListener('invalid', () => {
  modalSelect.classList.add('modal-form__select--error');
});

modalForm.addEventListener('submit', () => {
  closeModal();
});


export {updateModalClonedOptionsState};
