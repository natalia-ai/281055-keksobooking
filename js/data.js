'use strict';

(function () {

  /*var ELEMENT_N = 8;
  var MAP_WIDTH = 1150;
  var MAP_HEIGHT_MIN = 130;
  var MAP_HEIGHT_MAX = 630;
  var titles = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

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

  function makeObject() {
    var objectArray = Array(ELEMENT_N);
    for (var i = 0; i < ELEMENT_N; i++) {
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

  window.data = {
    makeObject: makeObject,
  };*/
})();
