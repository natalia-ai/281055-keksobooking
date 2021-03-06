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

  var cardTemplate = null;
  var pinActive = null;
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

        if (pinActive) {
          pinActive.classList.remove('map__pin--active');
        }
        pin.classList.add('map__pin--active');
        pinActive = pin;
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
    document.addEventListener('keydown', window.utilites.escPress(closePopUp));
  }

  function closePopUp() {
    currentCard.remove();
    currentCard = null;
    document.removeEventListener('keydown', window.utilites.escPress(closePopUp));
  }

  function removePins() {
    renderedPins.forEach(function (item) {
      item.remove();
    });
    renderedPins = [];
  }

  function createCard(card) {
    cardTemplate = mapCardTemplate.cloneNode(true);
    if (card.author && card.author.avatar) {
      cardTemplate.querySelector('.popup__avatar').src = card.author.avatar;
    } else {
      cardTemplate.querySelector('.popup__avatar').classList.add('visually-hidden');
    }
    if (card.offer && card.offer.title) {
      cardTemplate.querySelector('.popup__title').textContent = card.offer.title;
    } else {
      cardTemplate.querySelector('.popup__title').classList.add('visually-hidden');
    }
    if (card.offer && card.offer.address) {
      cardTemplate.querySelector('.popup__text--address').textContent = card.offer.address;
    } else {
      cardTemplate.querySelector('.popup__text--address').classList.add('visually-hidden');
    }
    if (card.offer && card.offer.price) {
      cardTemplate.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    } else {
      cardTemplate.querySelector('.popup__text--price').classList.add('visually-hidden');
    }
    if (TypeMap[card.offer.type]) {
      cardTemplate.querySelector('.popup__type').textContent = TypeMap[card.offer.type];
    } else {
      cardTemplate.querySelector('.popup__type').classList.add('visually-hidden');
    }
    if ('rooms' in card.offer && 'guests' in card.offer) {
      cardTemplate.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    } else {
      cardTemplate.querySelector('.popup__text--capacity').classList.add('visually-hidden');
    }

    if ((card.offer && card.offer.checkin) && (card.offer && card.offer.checkout)) {
      cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
    } else {
      cardTemplate.querySelector('.popup__text--time').classList.add('visually-hidden');
    }

    addFeaturesCard(card);

    if (card.offer && card.offer.description) {
      cardTemplate.querySelector('.popup__description').textContent = card.offer.description;
    } else {
      cardTemplate.querySelector('.popup__description').classList.add('visually-hidden');
    }

    addPhotosCard(card);

    cardTemplate.querySelector('.popup__close').addEventListener('click', function (event) {
      event.preventDefault();
      closePopUp();
    });

    return cardTemplate;
  }

  function addFeaturesCard(card) {
    var featuresCard = cardTemplate.querySelector('.popup__features');
    if (('features' in card.offer) && (card.offer && card.offer.features.length > 0)) {
      featuresCard.innerHTML = '';
      card.offer.features.forEach(function (item) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + item);
        featuresCard.appendChild(feature);
      });
    } else {
      featuresCard.classList.add('visually-hidden');
    }
  }
  function addPhotosCard(card) {
    var photosCard = cardTemplate.querySelector('.popup__photos');
    if (('photos' in card.offer) && (card.offer && card.offer.photos.length > 0)) {
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
    } else {
      photosCard.classList.add('visually-hidden');
    }
  }

  window.ads = {
    renderPins: renderPins,
    removePins: removePins,
    closePopUp: closePopUp,
  };

})();

