import './vendor/imask.js';

const callbackSelect = document.querySelector('.callback-form__select');
const callbackSelectDisplay = document.querySelector('.callback-form__select-display');
const callbackSelectOptions = callbackSelect.querySelectorAll('option');
const callbackSelectWrapper = document.querySelector('.callback-form__select-wrapper');
const callbackInputs = document.querySelectorAll('.callback-form__input');
const callbackCheckboxes = document.querySelectorAll('.callback-form__checkbox');
const callbackPhoneInput = document.querySelector('#callback-phone-input');

const phoneMaskOptions = {
  mask: '+7 (000) 000-00-00'
};
new window.IMask(callbackPhoneInput, phoneMaskOptions);

const closeCallbackSelect = () => {
  callbackSelectDisplay.classList.remove('callback-form__select-display--opened');
  callbackSelect.classList.remove('callback-form__select--opened');
  document.querySelectorAll('.callback-form__select-option').forEach((callbackSelectOptionClone) => {
    callbackSelectOptionClone.setAttribute('tabindex', '-1');
  });
  callbackSelect.removeEventListener('keydown', callbackSelectOnKeydown);
  callbackSelectDisplay.removeEventListener('keydown', callbackSelectOnKeydown);
};

const openCallbackSelect = () => {
  callbackSelectDisplay.classList.add('callback-form__select-display--opened');
  callbackSelect.classList.add('callback-form__select--opened');
  document.querySelectorAll('.callback-form__select-option').forEach((callbackSelectOptionClone) => {
    callbackSelectOptionClone.setAttribute('tabindex', '0');
  });
  callbackSelect.addEventListener('keydown', callbackSelectOnKeydown);
  callbackSelectDisplay.addEventListener('keydown', callbackSelectOnKeydown);
};

function callbackSelectOnKeydown (evt) {
  if (evt.key === 'Escape') {
    closeCallbackSelect();
    callbackSelect.blur();
  }
}

const updateCallbackClonedOptionsState = () => {
  callbackSelectOptions.forEach((callbackSelectOption) => {
    if (callbackSelectOption.selected === true) {
      document.querySelectorAll('.callback-form__select-option').forEach((callbackSelectOptionClone) => {
        callbackSelectOptionClone.classList.remove('callback-form__select-option--selected');
        if (callbackSelectOptionClone.dataset.value === callbackSelectOption.value) {
          callbackSelectOptionClone.classList.add('callback-form__select-option--selected');
        }
      });
    }
  });
};

callbackSelectOptions.forEach((callbackSelectOption) => {
  const callbackSelectOptionClone = document.createElement('button');
  callbackSelectOptionClone.setAttribute('type', 'button');
  callbackSelectOptionClone.classList.add('callback-form__select-option');
  callbackSelectOptionClone.textContent = callbackSelectOption.textContent;
  callbackSelectOptionClone.dataset.value = callbackSelectOption.value;
  callbackSelectOptionClone.setAttribute('tabindex', '-1');
  if (callbackSelectOptionClone.dataset.value) {
    callbackSelectDisplay.appendChild(callbackSelectOptionClone);
  }
  callbackSelectOptionClone.addEventListener('click', () => {
    callbackSelectOption.selected = true;
    document.querySelectorAll('.callback-form__select-option').forEach((callbackOptionClone) => {
      callbackOptionClone.classList.remove('callback-form__select-option--selected');
    });
    callbackSelectOptionClone.classList.add('callback-form__select-option--selected');
    callbackSelect.classList.remove('callback-form__select--error');
    closeCallbackSelect();
  });
});

callbackSelect.addEventListener('keydown', (evt) => {
  if (evt.key === 'Enter') {
    evt.preventDefault();
  }
});
callbackSelect.addEventListener('mousedown', (evt) => {
  evt.preventDefault();

  if (!callbackSelect.classList.contains('callback-form__select--opened')) {
    openCallbackSelect();
  }
  callbackSelect.focus();
});

callbackSelect.addEventListener('change', () => {
  updateCallbackClonedOptionsState();
  callbackSelect.classList.remove('callback-form__select--error');
});

callbackSelect.addEventListener('focusin', () => {
  openCallbackSelect();
});

callbackSelect.addEventListener('focusout', () => {
  closeCallbackSelect();
});

callbackSelectDisplay.addEventListener('focusin', () => {
  openCallbackSelect();
});

callbackSelectDisplay.addEventListener('focusout', () => {
  closeCallbackSelect();
});

window.addEventListener('click', (evt) => {
  if (!callbackSelectWrapper.contains(evt.target)) {
    closeCallbackSelect();
  }
});

callbackInputs.forEach((callbackInput) => {
  callbackInput.addEventListener('invalid', () => {
    callbackInput.classList.add('callback-form__input--error');
  });
  callbackInput.addEventListener('input', () => {
    callbackInput.classList.remove('callback-form__input--error');
  });
});

callbackCheckboxes.forEach((callbackCheckbox) => {
  callbackCheckbox.addEventListener('invalid', () => {
    callbackCheckbox.classList.add('callback-form__checkbox--error');
  });
  callbackCheckbox.addEventListener('change', () => {
    callbackCheckbox.classList.remove('callback-form__checkbox--error');
  });
});

callbackSelect.addEventListener('invalid', () => {
  callbackSelect.classList.add('callback-form__select--error');
});

export {updateCallbackClonedOptionsState};
