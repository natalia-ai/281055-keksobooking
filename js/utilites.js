'use strict';
(function () {
  var ESC_KEYCODE = 27;

  var adForm = document.querySelector('.ad-form');
  var changeAddress = new Event('changeAddress', {bubbles: true, cancelable: true});

  function getAddress(label, modify) {
    var x = label.offsetLeft + label.offsetWidth / 2;
    var y = modify ? label.offsetTop + label.offsetHeight + modify : label.offsetTop + label.offsetHeight / 2;
    return {
      x: x,
      y: y
    };
  }

  function addressSetHandler(event) {
    adForm.address.value = event.coords.x + ', ' + event.coords.y;
  }

  function escPressHandler(event) {
    if (event.keyCode === ESC_KEYCODE) {
      event.preventDefault();
      window.ads.closePopUp();
    }
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
    escPressHandler: escPressHandler,
    escPress: escPress,
    changeAddress: changeAddress,
    getAddress: getAddress,
    addressSetHandler: addressSetHandler,
  };

})();
