'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;
  var CARD_IMG_WIDTH = 45;
  var CARD_IMG_HEIGTH = 40;

  var TypeMap = {
    'palace': 'Дворец',
    'house': 'Дом',
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
  };

  var currentCard = null;
  var renderedPins = [];
  var pinsContainer = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

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

  window.add = {
    renderPins: renderPins,
    removePins: removePins,
  };

})();
