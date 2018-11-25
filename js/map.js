var N_ElEMENT = 8;

var makeObject = function (N_ELEMENT) {
  var objectArray = Array(N_ELEMENT);
  for (var i = 0; i < N_ELEMENT; ++i) {
    var objectTemplate = {
      "author": {
        "avatar": "",
      },
      "offer": {
        "title": "",
        "address": "",
        "price": 0,
        "type": "",
        "rooms": 0,
        "guests": 0,
        "checkin": "",
        "checkout": "",
        "features": [],
        "description": "",
        "photos": [],
      },
      "location": {
        "x": 0,
        "y": 0,
      },
    }

    objectTemplate.author.avatar = "img/avatars/user0" + (i + 1) + ".png";

    objectTemplate.offer.title = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"][Math.round(Math.random() * 7)];

    objectTemplate.offer.address = Math.round(Math.random() * 1000) + 1, Math.round(Math.random() * 1000) + 1;

    objectTemplate.offer.price = Math.round(Math.random(1000) * 999000) + 1000;

    objectTemplate.offer.type = {"palace": "Дворец", "flat": "Квартира", "house": "Дом", "bungalo": "Бунгало"};

    objectTemplate.offer.rooms = Math.round(Math.random() * 4) + 1;

    objectTemplate.offer.guests = Math.round(Math.random() * 1000) + 1;

    objectTemplate.offer.checkin = ["12:00", "13:00", "14:00"][Math.round(Math.random() * 2)];

    objectTemplate.offer.checkout = ["12:00", "13:00", "14:00"][Math.round(Math.random() * 2)];

    objectTemplate.offer.features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"][Math.round(Math.random() * 5)];

    objectTemplate.offer.description = "";

    objectTemplate.offer.photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

    objectTemplate.location["x"] = Math.round(Math.random() * 1125) + 25;
    objectTemplate.location["y"] = Math.round(Math.random() * 500) + 130;

    objectArray[i] = objectTemplate;
  }
  return objectArray;
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinElement = document.querySelector('.map__pins');
var mapPinTemplate = document.querySelector('#pin').content;

  var renderPin = function (pin) {
    var pinElement = mapPinTemplate.cloneNode(true);
    var locationPin = pinElement.querySelector('.map__pin');
    locationPin.style.left = pin.location["x"] + 'px';
    locationPin.style.top = pin.location["y"] + 'px';
    var avatarPin = pinElement.querySelector('img');
    avatarPin.src = pin.author.avatar;
    avatarPin.alt = pin.offer.title;
    return pinElement;
  }

var fragment = document.createDocumentFragment();
objectArray = makeObject(N_ElEMENT);
for (var i = 0; i < N_ElEMENT; i++) {
  fragment.appendChild(renderPin(objectArray[i]));
}

mapPinElement.appendChild(fragment);

var mapCardElement = document.querySelector('.map');
var lastChildOfMap = document.querySelector('.map__filters-container');
var mapCardTemplate = document.querySelector('#card').content;

var renderCard = function(card) {
  var cardElement = mapCardTemplate.cloneNode(true);
    var titleCard = cardElement.querySelector('.popup__title');
    titleCard.textContent = card.offer.title;
    var addressCard = cardElement.querySelector('.popup__text--address');
    addressCard.textContent = card.offer.address;
    var priceCard = cardElement.querySelector('.popup__text--price');
    priceCard.textContent = card.offer.price + ' ₽/ночь';
    var buildingTypeCard = cardElement.querySelector('.popup__type');
    var offerTypeKeys = Object.keys(card.offer.type);
    buildingTypeCard.textContent = card.offer.type[offerTypeKeys[Math.round(Math.random() * (offerTypeKeys.length - 1))]];
    var roomAndGuestsCard = cardElement.querySelector('.popup__text--capacity');
    roomAndGuestsCard.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    var timeCard = cardElement.querySelector('.popup__text--time');
    timeCard.textContent = 'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
    var featuresCard = cardElement.querySelector('.popup__features');

      featuresCard.textContent = card.offer.features;
      //for (var i = 0; i < card.offer.features.length; i++) {
      //  console.log(card.offer.features[i]);
      //}
    var descriptionCard = cardElement.querySelector('.popup__description');
    descriptionCard.textContent = card.offer.description;
    var photosCard = cardElement.querySelector('.popup__photos');
    for (var i = 0; i < 3; i++) {
      var imgTag = document.createElement('img');
      imgTag.src = card.offer.photos[i];
      imgTag.alt = 'Фотография жилья';
      imgTag.classList.add('popup__photo');
      imgTag.style.width = '45px';
      imgTag.style.height = '40px';
      photosCard.appendChild(imgTag);
    }
    return cardElement;
}

mapCardElement.insertBefore(renderCard(objectArray[0]), mapCardElement.lastChildOfMap);
