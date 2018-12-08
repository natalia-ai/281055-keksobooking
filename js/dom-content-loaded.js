'use strict';
(function () {
  document.addEventListener('DOMContentLoaded', function (event) {
    event.preventDefault();
    window.data.defaultCoords = {
      x: window.data.pinMain.style.left,
      y: window.data.pinMain.style.top
    };
    window.data.adForm.address.readOnly = true;
    window.data.adForm.addEventListener('changeAddress', window.address.addressSetHandler);
    window.data.adForm.addEventListener('reset', function () {
      window.deactivatePage.deactivatePage();
    });
    window.deactivatePage.deactivatePage();
  });
})();
