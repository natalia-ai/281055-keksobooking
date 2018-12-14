'use strict';

(function () {

  var MODIFY = 20;
  var UPPER_BOUND = 45;
  var BOTTOM_LINE = 205;

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var changeAddress = new Event('changeAddress', {bubbles: true, cancelable: true});

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

      if (newTop < UPPER_BOUND) {
        newTop = UPPER_BOUND;
      }
      var bottomBond = map.offsetHeight - BOTTOM_LINE;

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
      changeAddress.coords = window.utilites.getAddress(pinMain, MODIFY);
      adForm.dispatchEvent(changeAddress);
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
