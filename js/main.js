'use strict';

(function () {
  var MODIFY = 20;

  var defaultCoords = null;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var changeAddress = new Event('changeAddress', {bubbles: true, cancelable: true});

  function addressSetHandler(event) {
    adForm.address.value = event.coords.x + ', ' + event.coords.y;
  }

  function pageActivateHandler() {
    window.form.activate();
    changeAddress.coords = window.utilites.getAddress(pinMain, MODIFY);
    document.dispatchEvent(changeAddress);
    map.classList.remove('map--faded');
    window.ads.renderPins(window.data.get());
    pinMain.removeEventListener('mouseup', pageActivateHandler);
  }

  function deactivatePage() {
    window.form.deActivate();
    window.ads.removePins();
    pinMain.style.left = defaultCoords.x;
    pinMain.style.top = defaultCoords.y;

    setTimeout(function () {
      changeAddress.coords = window.utilites.getAddress(pinMain);
      document.dispatchEvent(changeAddress);
    }, 1);

    map.classList.add('map--faded');
    pinMain.addEventListener('mouseup', pageActivateHandler);
    pinMain.addEventListener('mousedown', window.gauge.mouseDownHandler);
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
    defaultCoords = {
      x: pinMain.style.left,
      y: pinMain.style.top
    };
    adForm.address.readOnly = true;
    document.addEventListener('changeAddress', addressSetHandler);

    deactivatePage();
    window.backend.queryData();
    window.form.setHandlers(deactivatePage);
  });

})();
