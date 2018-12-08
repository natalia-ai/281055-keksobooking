'use strict';
(function () {
  function formSubmitHandler(event) {
    event.preventDefault();
    var errors = Array.from(window.data.adForm.querySelectorAll('.errorField'));
    window.data.valid = true;
    errors.forEach(function (item) {
      item.remove();
    });
    if (window.data.adForm.title.value.length < 30) {
      window.error.renderError(window.data.adForm.title, 'Поле не должно быть менее 30 символов');
      window.data.valid = false;
    }
    if (window.data.adForm.title.value.length > 100) {
      window.error.renderError(window.data.adForm.title, 'Поле не должно превышать 100 символов');
      window.data.valid = false;
    }
    var type = window.data.adForm.type.options[window.data.adForm.type.selectedIndex].value;
    var price = parseInt(window.data.adForm.price.value, 10);
    if (price < window.data.PriceMap[type]) {
      window.error.renderError(window.data.adForm.price, 'Для поля  ' + window.data.TypeMap[type] + ' минимальная цена должна быть не менее ' + window.data.PriceMap[type]);
      window.data.valid = false;
    }
    if (price > window.data.MAX_PRICE) {
      window.error.renderError(window.data.adForm.price, 'Для поля  ' + window.data.TypeMap[type] + ' максимальная цена не должна превышать ' + window.data.MAX_PRICE);
      window.data.valid = false;
    }
    if (window.data.valid) {
      window.data.adForm.submit();
    }
  }

  window.formSubmitHandler = {
    formSubmitHandler: formSubmitHandler,
  };

})();
