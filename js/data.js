'use strict';
(function () {
  var MODIFY = 20;
  var ELEMENT_N = 8;
  var MAP_WIDTH = 1150;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;
  var PIN_WIDTH = 50;
  var PIN_HEIGTH = 70;
  var CARD_IMG_WIDTH = 45;
  var CARD_IMG_HEIGTH = 40;
  var MAX_PRICE = 1000000;

  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var renderedPins = [];

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
  var currentCard = null;
  var defaultCoords = null;
  var error = null;
  var pinsContainer = document.querySelector('.map__pins');
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var map = document.querySelector('.map');
  var mapCardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdList = Array.from(adForm.querySelectorAll('fieldset'));
  var pinMain = document.querySelector('.map__pin--main');
  var rooms = adForm.rooms;
  var guests = adForm.capacity;
  var mapFilters = document.querySelector('.map__filters');

  window.data = {
    MODIFY: MODIFY,
    ELEMENT_N: ELEMENT_N,
    MAP_WIDTH: MAP_WIDTH,
    MAP_HEIGHT_MIN: MAP_HEIGHT_MIN,
    MAP_HEIGHT_MAX: MAP_HEIGHT_MAX,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGTH: PIN_HEIGTH,
    CARD_IMG_WIDTH: CARD_IMG_WIDTH,
    CARD_IMG_HEIGTH: CARD_IMG_HEIGTH,
    MAX_PRICE: MAX_PRICE,

    titles: titles,
    types: types,
    times: times,
    features: features,
    photos: photos,
    renderedPins: renderedPins,

    TypeMap: TypeMap,
    PriceMap: PriceMap,
    OptionMapping: OptionMapping,

    valid: valid,
    currentCard: currentCard,
    defaultCoords: defaultCoords,
    error: error,
    pinsContainer: pinsContainer,
    mapPinTemplate: mapPinTemplate,
    map: map,
    mapCardTemplate: mapCardTemplate,
    adForm: adForm,
    fieldsetAdList: fieldsetAdList,
    pinMain: pinMain,
    rooms: rooms,
    guests: guests,
    mapFilters: mapFilters,
  };
})();
