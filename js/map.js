'use strict';
var N_ElEMENT = 8;
var MAP_WIDTH = 1150;
var MAP_HEIGHT_MIN = 130;
var MAP_HEIGHT_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGTH = 70;
var CARD_IMG_WIDTH = 45;
var CARD_IMG_HEIGTH = 40;
var MODIFY = 20;
var MAX_PRICE = 1000000;

var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var types = ['palace', 'flat', 'house', 'bungalo'];
var times = ['12:00', '13:00', '14:00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
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
//var errorForm = null;
var currentCard = null;
var defaultCoords = null;
var renderedPins = [];

var pinsContainer = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var map = document.querySelector('.map');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adForm = document.querySelector('.ad-form');
var fieldsetAdList = Array.from(adForm.querySelectorAll('fieldset'));
var pinMain = document.querySelector('.map__pin--main');
//var successFormTemplate = document.querySelector('#success').content.querySelector('.success');
//var errorFormTemplate = document.querySelector('#error').content.querySelector('.error');
//var mainTag = document.querySelector('main');
var rooms = adForm.rooms;
var guests = adForm.capacity;

function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}

function getSortArr(arr) {
  var data = arr.slice();
  var length = data.length;
  for (var i = 0; i < length; i++) {
    var index = randomInteger(0, length - 1);
    var tmp = data[index];
    data[index] = data[i];
    data[i] = tmp;
  }
  return data;
}

function makeObject(N_ELEMENT) {
  var objectArray = Array(N_ELEMENT);
  for (var i = 0; i < N_ELEMENT; i++) {
    var objectTemplate = {};
    objectTemplate.author = {};
    objectTemplate.offer = {};
    objectTemplate.location = {};

    objectTemplate.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
    objectTemplate.offer.title = titles[randomInteger(0, titles.length - 1)];
    objectTemplate.offer.address = randomInteger(0, 1000) + ', ' + randomInteger(0, 1000);
    objectTemplate.offer.price = randomInteger(1000, 1000000);
    objectTemplate.offer.type = types[randomInteger(0, types.length - 1)];
    objectTemplate.offer.rooms = randomInteger(1, 5);
    objectTemplate.offer.guests = randomInteger(1, 100);
    objectTemplate.offer.checkin = times[randomInteger(0, times.length - 1)];
    objectTemplate.offer.checkout = times[randomInteger(0, times.length - 1)];
    objectTemplate.offer.features = getSortArr(features).slice(randomInteger(0, features.length - 1));
    objectTemplate.offer.description = '';
    objectTemplate.offer.photos = getSortArr(photos);
    objectTemplate.location.x = randomInteger(0, MAP_WIDTH);
    objectTemplate.location.y = randomInteger(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX);
    objectArray[i] = objectTemplate;
  }
  return objectArray;
}

function createPin(data) {
  var pinTemplate = mapPinTemplate.cloneNode(true);
  pinTemplate.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
  pinTemplate.style.top = data.location.y - PIN_HEIGTH + 'px';
  var avatarPin = pinTemplate.querySelector('img');
  avatarPin.src = data.author.avatar;
  avatarPin.alt = data.offer.title;
  return pinTemplate;
}

function renderPins(data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    var pin = createPin(item);
    pin.addEventListener('click', function (event) {
      event.preventDefault();
      showPopUp(item);
    });
    renderedPins.push(pin);
    fragment.appendChild(pin);
  });
  pinsContainer.appendChild(fragment);
}

function showPopUp(data) {
  var card = createCard(data);
  if (currentCard && currentCard.querySelector('.popup__text--address').textContent === card.querySelector('.popup__text--address').textContent) {
    return;
  }
  if (currentCard) {
    closePopUp();
  }
  currentCard = card;
  map.insertBefore(card, map.lastElementChild);
}

function closePopUp() {
  currentCard.remove();
  currentCard = null;
}

function removePins() {
  renderedPins.forEach(function (item) {
    item.remove();
  });
  renderedPins = [];
}

function createCard(card) {
  var cardTemplate = mapCardTemplate.cloneNode(true);
  cardTemplate.querySelector('.popup__avatar').src = card.author.avatar;
  cardTemplate.querySelector('.popup__title').textContent = card.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = card.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardTemplate.querySelector('.popup__type').textContent = TypeMap[card.offer.type];
  cardTemplate.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
  var featuresCard = cardTemplate.querySelector('.popup__features');
  featuresCard.innerHTML = '';
  card.offer.features.forEach(function (item) {
    var feature = document.createElement('li');
    feature.classList.add('popup__feature');
    feature.classList.add('popup__feature--' + item);
    featuresCard.appendChild(feature);
  });
  var descriptionCard = cardTemplate.querySelector('.popup__description');
  descriptionCard.textContent = card.offer.description;
  var photosCard = cardTemplate.querySelector('.popup__photos');
  photosCard.innerHTML = '';
  card.offer.photos.forEach(function (item) {
    var imgTag = document.createElement('img');
    imgTag.src = item;
    imgTag.alt = 'Фотография жилья';
    imgTag.classList.add('popup__photo');
    imgTag.style.width = CARD_IMG_WIDTH + 'px';
    imgTag.style.height = CARD_IMG_HEIGTH + 'px';
    photosCard.appendChild(imgTag);
  });
  cardTemplate.querySelector('.popup__close').addEventListener('click', function (event) {
    event.preventDefault();
    closePopUp();
  });
  return cardTemplate;
}

var changeAddress = new Event('changeAddress', {bubbles: true, cancelable: true});

var getAddress = function (label, modify) {
  var x = label.offsetLeft + label.offsetWidth / 2;
  var y = modify ? label.offsetTop + label.offsetHeight + modify : label.offsetTop + label.offsetHeight / 2;
  return {
    x: x,
    y: y
  };
};

function setAddressHandler(event) {
  adForm.address.value = event.coords.x + ', ' + event.coords.y;
}

function timeInChangeHandler(event) {
  event.preventDefault();
  adForm.timeout.selectedIndex = adForm.timein.selectedIndex;
}
function timeOutChangeHandler(event) {
  event.preventDefault();
  adForm.timein.selectedIndex = adForm.timeout.selectedIndex;
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

/*function showSuccessForm() {
  var successForm = successFormTemplate.cloneNode(true);
  mainTag.appendChild(successForm);
  return successForm;
}*/

/*function showErrorForm() {
  errorForm = errorFormTemplate.cloneNode(true);
  mainTag.appendChild(errorForm);
  return errorForm;
}*/

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
    if (adForm.submit()) {
      /*showSuccessForm();
    } else {
      showErrorForm();*/
    }
  }
}

function pageActivateHandler() {
  renderPins(makeObject(N_ElEMENT));
  changeAddress.coords = getAddress(pinMain, MODIFY);
  adForm.dispatchEvent(changeAddress);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  fieldsetAdList.forEach(function (item) {
    item.disabled = false;
  });
  pinMain.removeEventListener('mouseup', pageActivateHandler);
  adForm.timeout.addEventListener('change', timeOutChangeHandler);
  adForm.timein.addEventListener('change', timeInChangeHandler);
  adForm.addEventListener('submit', formSubmitHandler);
  rooms.addEventListener('change', roomsAndGuestBindHandler(rooms, guests));
  roomsAndGuestBindHandler(rooms, guests)();
}

function deactivatePage() {
  removePins();
  pinMain.style.left = defaultCoords.x;
  pinMain.style.top = defaultCoords.y;

  setTimeout(function () {
    changeAddress.coords = getAddress(pinMain);
    adForm.dispatchEvent(changeAddress);
  }, 200);

  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  fieldsetAdList.forEach(function (item) {
    item.disabled = true;
  });

  pinMain.addEventListener('mouseup', pageActivateHandler);
  adForm.timeout.addEventListener('change', timeOutChangeHandler);
  adForm.timein.addEventListener('change', timeInChangeHandler);
  adForm.addEventListener('submit', formSubmitHandler);
}

document.addEventListener('DOMContentLoaded', function (event) {
  event.preventDefault();
  defaultCoords = {
    x: pinMain.style.left,
    y: pinMain.style.top
  };
  adForm.address.readOnly = true;
  adForm.addEventListener('changeAddress', setAddressHandler);
  adForm.addEventListener('reset', function () {
    deactivatePage();
  });
  deactivatePage();
});
