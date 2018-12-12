'use strict';
(function () {

  function queryData() {
    var URL = 'https://js.dump.academy/keksobooking/data';

    function onLoad(data) {
      var typeHousingObject = document.querySelector('#housing-type');
      var resortObject = window.ads.renderPins(data);
      var selIndex = typeHousingObject.options.selectedIndex;
      typeHousingObject.addEventListener('change' housingTypeChooseHandler);
      function housingTypeChooseHandler(){


      }
    }

    function onError(message) {
      console.error(message);
    }

    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;

        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', URL);
    xhr.send();
  }
  var url = 'https://js.dump.academy/keksobooking';
  function upLoad(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });
    xhr.open('POST', url);
    xhr.send(data);
  }

  window.backend = {
    queryData: queryData,
    upLoad: upLoad,
  };
})();


