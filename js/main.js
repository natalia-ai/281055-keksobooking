'use strict';

(function () {
  var MODIFY = 20;
  var ELEMENT_N = 8;

  var defaultCoords = null;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdList = Array.from(adForm.querySelectorAll('fieldset'));
  var pinMain = document.querySelector('.map__pin--main');
  var changeAddress = new Event('changeAddress', {bubbles: true, cancelable: true});

  var getAddress = function (label, modify) {
    var x = label.offsetLeft + label.offsetWidth / 2;
    var y = modify ? label.offsetTop + label.offsetHeight + modify : label.offsetTop + label.offsetHeight / 2;
    return {
      x: x,
      y: y
    };
  };

  function addressSetHandler(event) {
    adForm.address.value = event.coords.x + ', ' + event.coords.y;
  }

  function pageActivateHandler() {
    window.add.renderPins(window.data.makeObject(ELEMENT_N));
    changeAddress.coords = getAddress(pinMain, MODIFY);
    adForm.dispatchEvent(changeAddress);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsetAdList.forEach(function (item) {
      item.disabled = false;
    });

    pinMain.removeEventListener('mouseup', pageActivateHandler);
  }

  function deactivatePage() {
    window.add.removePins();
    pinMain.style.left = defaultCoords.x;
    pinMain.style.top = defaultCoords.y;

    setTimeout(function () {
      changeAddress.coords = getAddress(pinMain);
      adForm.dispatchEvent(changeAddress);
    }, 200);

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    fieldsetAdList.forEach(function (item) {
      item.disabled = true;
    });

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
    adForm.addEventListener('changeAddress', addressSetHandler);
    adForm.addEventListener('reset', function () {
      deactivatePage();
    });
    deactivatePage();
  });
  window.main = {
    changeAddress: changeAddress,
    getAddress: getAddress,
  };
})();
