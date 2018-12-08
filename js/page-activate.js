'use strict';
(function () {
  function pageActivateHandler() {
    window.pinsAndCards.renderPins(window.makeObject.makeObject(window.data.ELEMENT_N));
    window.address.changeAddress.coords = window.address.getAddress(window.data.pinMain, window.data.MODIFY);
    window.data.adForm.dispatchEvent(window.address.changeAddress);
    window.data.map.classList.remove('map--faded');
    window.data.adForm.classList.remove('ad-form--disabled');
    window.data.fieldsetAdList.forEach(function (item) {
      item.disabled = false;
    });

    window.data.pinMain.removeEventListener('mouseup', pageActivateHandler);
    window.data.adForm.timeout.addEventListener('change', window.timeHandler.timeOutChangeHandler);
    window.data.adForm.timein.addEventListener('change', window.timeHandler.timeInChangeHandler);
    window.data.adForm.addEventListener('submit', window.formSubmitHandler.formSubmitHandler);
    window.data.rooms.addEventListener('change', window.roomGuestHandler.roomsAndGuestBindHandler(window.data.rooms, window.data.guests));
    window.roomGuestHandler.roomsAndGuestBindHandler(window.data.rooms, window.data.guests)();
  }

  window.pageActivate = {
    pageActivateHandler: pageActivateHandler,
  };

})();
