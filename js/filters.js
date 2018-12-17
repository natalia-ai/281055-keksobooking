'use strict';
(function () {
  var LOW_PRICE = 10000;
  var HEIGT_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters');

  var selectCriteria = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false,
    feature: []
  };

  function initFilters(data, elem, callback) {
    function filtrate(field, item) {
      var result = true;

      if (selectCriteria[field] !== 'any') {
        result = selectCriteria[field] === item.offer[field];
      }
      return result;
    }

    function filtratePrice(item) {
      var result = true;

      if (selectCriteria.price !== 'any') {
        switch (selectCriteria.price) {
          case 'middle':
            result = item.offer.price >= LOW_PRICE && item.offer.price <= HEIGT_PRICE;
            break;
          case 'low':
            result = item.offer.price < LOW_PRICE;
            break;
          case 'heigh':
            result = item.offer.price > HEIGT_PRICE;
            break;
          default:
            break;
        }
      }
      return result;
    }
    mapFilters.addEventListener('change', function (event) {
      event.preventDefault();
      var newData = [];
      var target = event.target;
      var filteredField = target.nodeName.toLowerCase() === 'input' ? target.value : target.id.slice(target.id.indexOf('-') + 1);
      var filteredValue = target.nodeName.toLowerCase() === 'input' ? target.checked : target.options[target.selectedIndex].value;
      selectCriteria[filteredField] = typeof filteredValue === 'boolean' || isNaN(filteredValue) ? filteredValue : parseInt(filteredValue, 10);
      for (var key in selectCriteria) {
        if (selectCriteria.hasOwnProperty(key)) {
          if (typeof selectCriteria[key] === 'boolean') {
            if (selectCriteria[key]) {
              if (!selectCriteria.features.includes(key)) {
                selectCriteria.features.push(key);
              }
            } else {
              if (selectCriteria.features.includes(key)) {
                var index = selectCriteria.features.indexOf(key);
                selectCriteria.features.splice(index, 1);
              }
            }
          }
        }
      }
      data.forEach(function (item) {
        if (selectCriteria.features.length > 0) {
          var checkFeatures = window.ads.renderPins.checkEntry(item.offer.features, selectCriteria.features);
          if (checkFeatures) {
            newData.push(item);
          }
        } else {
          newData = data.slice();
        }
      });

      newData = newData.filters(function (item) {
        return filtrate('type', item) && filtrate('guests', item) && filtrate('rooms', item) && filtratePrice(item);
      });
      callback(newData);
    });
  }
  window.filters = {
    initFilters: initFilters,
  };
})();

