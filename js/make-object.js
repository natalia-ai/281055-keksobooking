'use strict';

(function () {
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
    var objectArray = Array(window.data.ELEMENT_N);
    for (var i = 0; i < window.data.ELEMENT_N; i++) {
      var objectTemplate = {};
      objectTemplate.author = {};
      objectTemplate.offer = {};
      objectTemplate.location = {};

      objectTemplate.author.avatar = 'img/avatars/user0' + (i + 1) + '.png';
      objectTemplate.offer.title = window.data.titles[randomInteger(0, window.data.titles.length - 1)];
      objectTemplate.offer.address = randomInteger(0, 1000) + ', ' + randomInteger(0, 1000);
      objectTemplate.offer.price = randomInteger(1000, 1000000);
      objectTemplate.offer.type = window.data.types[randomInteger(0, window.data.types.length - 1)];
      objectTemplate.offer.rooms = randomInteger(1, 5);
      objectTemplate.offer.guests = randomInteger(1, 100);
      objectTemplate.offer.checkin = window.data.times[randomInteger(0, window.data.times.length - 1)];
      objectTemplate.offer.checkout = window.data.times[randomInteger(0, window.data.times.length - 1)];
      objectTemplate.offer.features = getSortArr(window.data.features).slice(randomInteger(0, window.data.features.length - 1));
      objectTemplate.offer.description = '';
      objectTemplate.offer.photos = getSortArr(window.data.photos);
      objectTemplate.location.x = randomInteger(0, window.data.MAP_WIDTH);
      objectTemplate.location.y = randomInteger(window.data.MAP_HEIGHT_MIN, window.data.MAP_HEIGHT_MAX);
      objectArray[i] = objectTemplate;
    }
    return objectArray;
  }

  window.makeObject = {
    makeObject: makeObject,
  };

})();
