'use strict';
(function () {
  var SOURCE_URL = 'https://js.dump.academy/keksobooking/data';
  var DESTINATION_URL = 'https://js.dump.academy/keksobooking';
  var XHR_STATUS = 200;

  function queryData(onError) {
    function onLoad(data) {
      window.data.set(data);
    }
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case XHR_STATUS:
          onLoad(xhr.response);
          break;

        default:
          onError('Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.open('GET', SOURCE_URL);
    xhr.send();
  }

  function upLoad(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });
    xhr.open('POST', DESTINATION_URL);
    xhr.send(data);
  }

  window.backend = {
    queryData: queryData,
    upLoad: upLoad,
  };
})();


