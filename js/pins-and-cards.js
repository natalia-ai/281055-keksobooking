'use strict';
(function () {
  function createPin(data) {
    var pinTemplate = window.data.mapPinTemplate.cloneNode(true);
    pinTemplate.style.left = data.location.x - window.data.PIN_WIDTH / 2 + 'px';
    pinTemplate.style.top = data.location.y - window.data.PIN_HEIGTH + 'px';
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
      window.data.renderedPins.push(pin);
      fragment.appendChild(pin);
    });
    window.data.pinsContainer.appendChild(fragment);
  }

  function showPopUp(data) {
    var card = createCard(data);
    if (window.data.currentCard && window.data.currentCard.querySelector('.popup__text--address').textContent === card.querySelector('.popup__text--address').textContent) {
      return;
    }
    if (window.data.currentCard) {
      closePopUp();
    }
    window.data.currentCard = card;
    window.data.map.insertBefore(card, window.data.map.lastElementChild);
  }

  function closePopUp() {
    window.data.currentCard.remove();
    window.data.currentCard = null;
  }

  function removePins() {
    window.data.renderedPins.forEach(function (item) {
      item.remove();
    });
    window.data.renderedPins = [];
  }

  function createCard(card) {
    var cardTemplate = window.data.mapCardTemplate.cloneNode(true);
    cardTemplate.querySelector('.popup__avatar').src = card.author.avatar;
    cardTemplate.querySelector('.popup__title').textContent = card.offer.title;
    cardTemplate.querySelector('.popup__text--address').textContent = card.offer.address;
    cardTemplate.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
    cardTemplate.querySelector('.popup__type').textContent = window.data.TypeMap[card.offer.type];
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
      imgTag.style.width = window.data.CARD_IMG_WIDTH + 'px';
      imgTag.style.height = window.data.CARD_IMG_HEIGTH + 'px';
      photosCard.appendChild(imgTag);
    });
    cardTemplate.querySelector('.popup__close').addEventListener('click', function (event) {
      event.preventDefault();
      closePopUp();
    });
    return cardTemplate;
  }

  window.pinsAndCards = {
    renderPins: renderPins,
    removePins: removePins,
  };

})();
