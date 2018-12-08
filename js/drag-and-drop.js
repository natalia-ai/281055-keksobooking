'use strict';
(function () {
  function mouseDownHandler(event) {
    event.preventDefault();
    var pinMainCoords = getCoords(window.data.pinMain);
    var shiftX = event.clientX - pinMainCoords.left;
    var shiftY = event.clientY - pinMainCoords.top;
    window.data.pinMain.style.zIndex = 1000;

    window.data.pinMain.addEventListener('mousemove', mouseMoveHandler);
    window.data.pinMain.addEventListener('mouseup', mouseUpHandler);

    var mapCoords = getCoords(window.data.map);
    function mouseMoveHandler(moveEvent) {
      moveEvent.preventDefault();
      var newLeft = moveEvent.clientX - shiftX - mapCoords.left;
      var newTop = moveEvent.clientY - shiftY - mapCoords.top;

      if (newLeft < (-window.data.pinMain.offsetWidth / 2)) {
        newLeft = (-window.data.pinMain.offsetWidth / 2);
      }
      var rightBond = window.data.map.offsetWidth - window.data.pinMain.offsetWidth / 2;

      if (newTop < 45) {
        newTop = 45;
      }

      if (newLeft > rightBond) {
        newLeft = rightBond;
      }
      window.data.pinMain.style.left = newLeft + 'px';

      var bottomBond = window.data.map.offsetHeight - window.data.pinMain.offsetHeight * 3 - 10;
      if (newTop > bottomBond) {
        newTop = bottomBond;
      }
      window.data.pinMain.style.top = newTop + 'px';
    }
    function mouseUpHandler(upEvent) {
      upEvent.preventDefault();
      window.data.pinMain.removeEventListener('mousemove', mouseMoveHandler);
      window.data.pinMain.removeEventListener('mouseup', mouseUpHandler);
      window.address.changeAddress.coords = window.address.getAddress(window.data.pinMain, window.data.MODIFY);
      window.data.adForm.dispatchEvent(window.address.changeAddress);
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

  window.dragAndDrop = {
    mouseDownHandler: mouseDownHandler,
  };

})();
