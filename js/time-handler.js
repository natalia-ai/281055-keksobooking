'use strict';
(function () {
  function timeInChangeHandler(event) {
    event.preventDefault();
    window.data.adForm.timeout.selectedIndex = window.data.adForm.timein.selectedIndex;
  }
  function timeOutChangeHandler(event) {
    event.preventDefault();
    window.data.adForm.timein.selectedIndex = window.data.adForm.timeout.selectedIndex;
  }

  window.timeHandler = {
    timeInChangeHandler: timeInChangeHandler,
    timeOutChangeHandler: timeOutChangeHandler,
  };

})();
