'use strict';
(function () {
  function fieldFocusHandler(event) {
    event.preventDefault();
    window.data.valid = true;
    if (window.data.error) {
      window.data.error.remove();
    }
  }
  function fieldBlurHandler(event) {
    event.preventDefault();
    event.target.removeEventListener('focus', fieldFocusHandler);
    event.target.removeEventListener('focus', fieldBlurHandler);
  }
  function renderError(field, errorText) {
    if (!field.parentElement.querySelector('.error')) {
      window.data.error = document.createElement('p');
      window.data.error.classList.add('errorField');
      window.data.error.textContent = errorText;
      field.parentElement.appendChild(window.data.error);
      field.style.borderColor = '#FF0000';
      field.style.borderWidth = '2';
      field.addEventListener('focus', fieldFocusHandler);
      field.addEventListener('focus', fieldBlurHandler);
    }
  }

  window.error = {
    renderError: renderError,
  };

})();
