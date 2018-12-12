'use strict';

(function () {

  var MODIFY = 20;

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var mapFilters = document.querySelector('.map__filters');
  function mouseDownHandler(event) {
    event.preventDefault();
    var pinMainCoords = getCoords(pinMain);
    var shiftX = event.clientX - pinMainCoords.left;
    var shiftY = event.clientY - pinMainCoords.top;
    pinMain.style.zIndex = 1000;

    pinMain.addEventListener('mousemove', mouseMoveHandler);
    pinMain.addEventListener('mouseup', mouseUpHandler);

    var mapCoords = getCoords(map);
    function mouseMoveHandler(moveEvent) {
      moveEvent.preventDefault();
      var newLeft = moveEvent.clientX - shiftX - mapCoords.left;
      var newTop = moveEvent.clientY - shiftY - mapCoords.top;

      if (newLeft < (-pinMain.offsetWidth / 2)) {
        newLeft = (-pinMain.offsetWidth / 2);
      }
      var rightBond = map.offsetWidth - pinMain.offsetWidth / 2;

      if (newTop < 45) {
        newTop = 45;
      }
      var bottomBond = map.offsetHeight - mapFilters.offsetHeight - pinMain.offsetHeight - 20;

      if (newLeft > rightBond) {
        newLeft = rightBond;
      }
      pinMain.style.left = newLeft + 'px';

      if (newTop > bottomBond) {
        newTop = bottomBond;
      }
      pinMain.style.top = newTop + 'px';
    }
    function mouseUpHandler(upEvent) {
      upEvent.preventDefault();
      pinMain.removeEventListener('mousemove', mouseMoveHandler);
      pinMain.removeEventListener('mouseup', mouseUpHandler);
      window.main.changeAddress.coords = window.main.getAddress(pinMain, MODIFY);
      adForm.dispatchEvent(window.main.changeAddress);
    }
    return false;
  }

  function getCoords(elem) {
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    };
  }

  window.gauge = {
    mouseDownHandler: mouseDownHandler,
  };

})();
