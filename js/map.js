var N_ElEMENT = 8;
var MAP_WIDTH = 1150;
var MAP_HEIGHT_MIN = 130;
var MAP_HEIGHT_MAX = 630;
var PIN_WIDTH = 50;
var PIN_HEIGTH = 70;
var CARD_IMG_WIDTH = 45;
var CARD_IMG_HEIGTH = 40;

var titles = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];
var types = ["palace", "flat", "house", "bungalo"];
var times = ["12:00", "13:00", "14:00"];
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var typeMap = {
  "palace": 'Дворец',
  "house": 'Дом',
  "flat": 'Квартира',
  "bungalo": 'Бунгало'
};

var map = document.querySelector('.map');
var pinsContainer = document.querySelector('.map__pins'); // pinsContainer, pinsBox
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardsContainer = document.querySelector('.map');
var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

var getSortArr = function (arr) {
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

var makeObject = function (N_ELEMENT) {
  var objectArray = Array(N_ELEMENT);
  for (var i = 0; i < N_ELEMENT; i++) {
    var objectTemplate = {};
    objectTemplate.author = {};
    objectTemplate.offer = {};
    objectTemplate.location = {};

    objectTemplate.author.avatar = "img/avatars/user0" + (i + 1) + ".png";
    objectTemplate.offer.title = titles[randomInteger(0, titles.length - 1)];
    objectTemplate.offer.address = randomInteger(0, 1000) + ', ' + randomInteger(0, 1000);
    objectTemplate.offer.price = randomInteger(1000, 1000000);
    objectTemplate.offer.type = types[randomInteger(0, types.length - 1)];
    objectTemplate.offer.rooms = randomInteger(1, 5);
    objectTemplate.offer.guests = randomInteger(1, 100);
    objectTemplate.offer.checkin = times[randomInteger(0, times.length - 1)];
    objectTemplate.offer.checkout = times[randomInteger(0, times.length - 1)];
    objectTemplate.offer.features = getSortArr(features).slice(randomInteger(0, features.length - 1));
    objectTemplate.offer.description = "";
    objectTemplate.offer.photos = getSortArr(photos);
    objectTemplate.location.x = randomInteger(0, MAP_WIDTH);
    objectTemplate.location.y = randomInteger(MAP_HEIGHT_MIN, MAP_HEIGHT_MAX);

    objectArray[i] = objectTemplate;
  }
  return objectArray;
}

map.classList.remove('map--faded');

var createPin = function (data) {
  var pinTemplate = mapPinTemplate.cloneNode(true);
  pinTemplate.style.left = data.location.x - PIN_WIDTH / 2 + 'px';
  pinTemplate.style.top = data.location.y - PIN_HEIGTH + 'px';
  var avatarPin = pinTemplate.querySelector('img');
  avatarPin.src = data.author.avatar;
  avatarPin.alt = data.offer.title;
  return pinTemplate;
}

var renderPins = function (data) {
  var fragment = document.createDocumentFragment();
  data.forEach(function (item) {
    var pin = createPin(item);
    fragment.appendChild(pin);
  });
  pinsContainer.appendChild(fragment);
}

var createCard = function (card) {
  var cardTemplate = mapCardTemplate.cloneNode(true);
  var titleCard = cardTemplate.querySelector('.popup__title');
  titleCard.textContent = card.offer.title;
  var addressCard = cardTemplate.querySelector('.popup__text--address');
  addressCard.textContent = card.offer.address;
  var priceCard = cardTemplate.querySelector('.popup__text--price');
  priceCard.textContent = card.offer.price + ' ₽/ночь';
  var buildingTypeCard = cardTemplate.querySelector('.popup__type');
  buildingTypeCard.textContent = typeMap[card.offer.type];
  var roomAndGuestsCard = cardTemplate.querySelector('.popup__text--capacity');
  roomAndGuestsCard.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  var timeCard = cardTemplate.querySelector('.popup__text--time');
  timeCard.textContent = 'Заезд после ' + card.offer.checkin + ' выезд до ' + card.offer.checkout;
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
  return cardTemplate;
}

var objectArray = makeObject(N_ElEMENT);
renderPins(objectArray);

cardsContainer.insertBefore(createCard(objectArray[0]), cardsContainer.lastElementChild);
