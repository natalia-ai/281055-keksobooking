'use strict';
(function () {
  function roomsAndGuestBindHandler(roomsSelect, guestsSelect) {
    return function () {
      var value = +roomsSelect.value;
      var options = guestsSelect.options;
      var optionsLength = options.length;
      var availableOptions = window.data.OptionMapping[value];

      for (var i = 0; i < optionsLength; i++) {
        if (availableOptions.indexOf(+options[i].value) !== -1) {
          options[i].disabled = false;
          if (+options[i].value === value || availableOptions.length === 1) {
            options[i].selected = true;
          }
        } else {
          options[i].disabled = true;
        }
      }
    };
  }

  window.roomGuestHandler = {
    roomsAndGuestBindHandler: roomsAndGuestBindHandler,
  };
})();
