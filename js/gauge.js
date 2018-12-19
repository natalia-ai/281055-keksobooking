'use strict';

(function () {

  var MODIFY_GAUGE = 20;
  var UPPER_BOUND = 45;

  var pinMain = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var changeAddress = new Event('changeAddress', {bubbles: true, cancelable: true});

  function mouseDownHandler(event) {
    event.preventDefault();
    var pinMainCoords = getCoords(pinMain);
    var shiftX = event.clientX - pinMainCoords.left;
    var shiftY = event.clientY - pinMainCoords.top;
    pinMain.style.zIndex = 1000;

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);

    var mapCoords = getCoords(pinMain.offsetParent);
    function mouseMoveHandler(moveEvent) {
      moveEvent.preventDefault();
      var newLeft = moveEvent.clientX - shiftX - mapCoords.left;
      var newTop = moveEvent.clientY - shiftY - mapCoords.top;

      if (newLeft < (pinMain.offsetWidth / -2)) {
        newLeft = (pinMain.offsetWidth / -2);
      }
      var rightBond = Math.round(pinMain.offsetParent.offsetWidth - pinMain.offsetWidth / 2);

      if (newTop < UPPER_BOUND) {
        newTop = UPPER_BOUND;
      }
      var bottomBond = pinMain.offsetParent.offsetHeight - mapFiltersContainer.offsetHeight - pinMain.offsetHeight;

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
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      changeAddress.coords = window.utilites.getAddress(pinMain, MODIFY_GAUGE);
      adForm.dispatchEvent(changeAddress);
    }
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
