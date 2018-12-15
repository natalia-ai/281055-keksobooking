'use strict';
(function () {
  var ESC_KEYCODE = 27;

  function getAddress(label, modify) {
    var x = label.offsetLeft + label.offsetWidth / 2;
    var y = modify ? label.offsetTop + label.offsetHeight + modify : label.offsetTop + label.offsetHeight / 2;
    return {
      x: x,
      y: y
    };
  }

  function escPress(cb) {
    return function (event) {
      if (event.keyCode === ESC_KEYCODE) {
        event.preventDefault();
        cb();
      }
    };
  }

  window.utilites = {
    escPress: escPress,
    getAddress: getAddress,
  };

})();
