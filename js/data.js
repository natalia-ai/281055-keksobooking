'use strict';

(function () {
  var data = null;
  window.data = {
    set: function (newData) {
      data = newData;
    },
    get: function () {
      return data;
    }
  };
})();


