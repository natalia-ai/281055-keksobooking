'use strict';
(function () {
  function deactivatePage() {
    window.pinsAndCards.removePins();
    window.data.pinMain.style.left = window.data.defaultCoords.x;
    window.data.pinMain.style.top = window.data.defaultCoords.y;

    setTimeout(function () {
      window.address.changeAddress.coords = window.address.getAddress(window.data.pinMain);
      window.data.adForm.dispatchEvent(window.address.changeAddress);
    }, 200);

    window.data.map.classList.add('map--faded');
    window.data.adForm.classList.add('ad-form--disabled');
    window.data.fieldsetAdList.forEach(function (item) {
      item.disabled = true;
    });

    window.data.pinMain.addEventListener('mouseup', window.pageActivate.pageActivateHandler);
    window.data.adForm.timeout.addEventListener('change', window.timeHandler.timeOutChangeHandler);
    window.data.adForm.timein.addEventListener('change', window.timeHandler.timeInChangeHandler);
    window.data.adForm.addEventListener('submit', window.formSubmitHandler.formSubmitHandler);
    window.data.pinMain.addEventListener('mousedown', window.dragAndDrop.mouseDownHandler);
  }

  window.deactivatePage = {
    deactivatePage: deactivatePage,
  };

})();
