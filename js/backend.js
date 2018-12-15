'use strict';
(function () {
  function queryData() {
    var URL = 'https://js.dump.academy/keksobooking/data';

    function onLoad(data) {
      window.data.set(data);
    }
    function onError() {
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
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
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
