'use strict';

(function () {

  var MAX_PRICE = 1000000;

  var TypeMap = {
    'palace': 'Дворец',
    'house': 'Дом',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
  };

  var PriceMap = {
    'bungalo': '0',
    'flat': '1000',
    'house': '5000',
    'palace': '10000',
  };

  var OptionMapping = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0],
  };

  var valid = true;
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var rooms = adForm.rooms;
  var guests = adForm.capacity;
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var main = document.querySelector('main');

  function timeInChangeHandler(event) {
    event.preventDefault();
    adForm.timeout.selectedIndex = adForm.timein.selectedIndex;
  }
  function timeOutChangeHandler(event) {
    event.preventDefault();
    adForm.timein.selectedIndex = adForm.timeout.selectedIndex;
  }

  function roomsAndGuestBindHandler(roomsSelect, guestsSelect) {
    return function () {
      var value = +roomsSelect.value;
      var options = guestsSelect.options;
      var optionsLength = options.length;
      var availableOptions = OptionMapping[value];

      for (var i = 0; i < optionsLength; i++) {
        if (availableOptions.indexOf(+options[i].value) !== -1) {
          options[i].disabled = false;
          if (+options[i].value === value || availableOptions.length === 1) {
            options[i].selected = true;
          }
        } else {
          options[i].disabled = true;
        }
      }
    };
  }

  var error = null;
  function fieldFocusHandler(event) {
    event.preventDefault();
    valid = true;
    if (error) {
      error.remove();
    }
  }
  function fieldBlurHandler(event) {
    event.preventDefault();
    event.target.removeEventListener('focus', fieldFocusHandler);
    event.target.removeEventListener('focus', fieldBlurHandler);
  }
  function renderError(field, errorText) {
    if (!field.parentElement.querySelector('.error')) {
      error = document.createElement('p');
      error.classList.add('errorField');
      error.textContent = errorText;
      field.parentElement.appendChild(error);
      field.style.borderColor = '#FF0000';
      field.style.borderWidth = '2';
      field.addEventListener('focus', fieldFocusHandler);
      field.addEventListener('focus', fieldBlurHandler);
    }
  }

  function formSubmitHandler(event) {
    event.preventDefault();

    var errors = Array.from(adForm.querySelectorAll('.errorField'));
    valid = true;
    errors.forEach(function (item) {
      item.remove();
    });
    if (adForm.title.value.length < 30) {
      renderError(adForm.title, 'Поле не должно быть менее 30 символов');
      valid = false;
    }
    if (adForm.title.value.length > 100) {
      renderError(adForm.title, 'Поле не должно превышать 100 символов');
      valid = false;
    }
    var type = adForm.type.options[adForm.type.selectedIndex].value;
    var price = parseInt(adForm.price.value, 10);
    if (price < PriceMap[type]) {
      renderError(adForm.price, 'Для поля  ' + TypeMap[type] + ' минимальная цена должна быть не менее ' + PriceMap[type]);
      valid = false;
    }
    if (price > MAX_PRICE) {
      renderError(adForm.price, 'Для поля  ' + TypeMap[type] + ' максимальная цена не должна превышать ' + MAX_PRICE);
      valid = false;
    }
    if (valid) {
      adForm.submit();
      window.backend.upLoad(new FormData(adForm), function (response) {
        successTemplate.cloneNode(true);
        main.appendChild(successTemplate);
      });
    }
  }

  function pageActivateHandler() {
    pinMain.removeEventListener('mouseup', pageActivateHandler);
    adForm.timeout.addEventListener('change', timeOutChangeHandler);
    adForm.timein.addEventListener('change', timeInChangeHandler);
    adForm.addEventListener('submit', formSubmitHandler);
    rooms.addEventListener('change', roomsAndGuestBindHandler(rooms, guests));
    roomsAndGuestBindHandler(rooms, guests)();
  }

  function deactivatePage() {
    pinMain.addEventListener('mouseup', pageActivateHandler);
    adForm.timeout.addEventListener('change', timeOutChangeHandler);
    adForm.timein.addEventListener('change', timeInChangeHandler);
    adForm.addEventListener('submit', formSubmitHandler);
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
    adForm.addEventListener('reset', function () {
      deactivatePage();
    });
    deactivatePage();
  });
})();
