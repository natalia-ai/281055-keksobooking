'use strict';

(function () {
  var MODIFY = 20;

  var defaultCoords = null;
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdList = Array.from(adForm.querySelectorAll('fieldset'));
  var pinMain = document.querySelector('.map__pin--main');
  var rooms = adForm.rooms;
  var guests = adForm.capacity;

  function pageActivateHandler() {
    window.utilites.changeAddress.coords = window.utilites.getAddress(pinMain, MODIFY);
    adForm.dispatchEvent(window.utilites.changeAddress);
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    fieldsetAdList.forEach(function (item) {
      item.disabled = false;
    });
    window.backend.queryData();
    //window.ads.renderPins(window.data.get());
    pinMain.removeEventListener('mouseup', pageActivateHandler);
    adForm.timeout.addEventListener('change', window.form.timeOutChangeHandler);
    adForm.timein.addEventListener('change', window.form.timeInChangeHandler);
    adForm.addEventListener('submit', window.form.formSubmitHandler);
    rooms.addEventListener('change', window.form.roomsAndGuestBindHandler(rooms, guests));
    window.form.roomsAndGuestBindHandler(rooms, guests)();
  }

  function deactivatePage() {
    window.ads.removePins();
    pinMain.style.left = defaultCoords.x;
    pinMain.style.top = defaultCoords.y;

    setTimeout(function () {
      window.utilites.changeAddress.coords = window.utilites.getAddress(pinMain);
      adForm.dispatchEvent(window.utilites.changeAddress);
    }, 200);

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    fieldsetAdList.forEach(function (item) {
      item.disabled = true;
    });

    pinMain.addEventListener('mouseup', pageActivateHandler);
    adForm.timeout.addEventListener('change', window.form.timeOutChangeHandler);
    adForm.timein.addEventListener('change', window.form.timeInChangeHandler);
    adForm.addEventListener('submit', window.form.formSubmitHandler);
    pinMain.addEventListener('mousedown', window.gauge.mouseDownHandler);
  }

  document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
    defaultCoords = {
      x: pinMain.style.left,
      y: pinMain.style.top
    };
    adForm.address.readOnly = true;
    adForm.addEventListener('changeAddress', window.utilites.addressSetHandler);
    adForm.addEventListener('reset', function () {
      deactivatePage();
    });
    deactivatePage();
  });

  window.main = {
    deactivatePage: deactivatePage,
  };

})();
