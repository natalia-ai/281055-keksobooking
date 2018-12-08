'use strict';
(function () {
  var changeAddress = new Event('changeAddress', {bubbles: true, cancelable: true});

  var getAddress = function (label, modify) {
    var x = label.offsetLeft + label.offsetWidth / 2;
    var y = modify ? label.offsetTop + label.offsetHeight + modify : label.offsetTop + label.offsetHeight / 2;
    return {
      x: x,
      y: y
    };
  };

  function addressSetHandler(event) {
    window.data.adForm.address.value = event.coords.x + ', ' + event.coords.y;
  }

  window.address = {
    changeAddress: changeAddress,
    getAddress: getAddress,
    addressSetHandler: addressSetHandler,
  };

})();
