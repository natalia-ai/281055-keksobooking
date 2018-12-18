'use strict';
(function () {
  var LOW_PRICE = 10000;
  var HEIGHT_PRICE = 50000;
  var TIME = 500;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var lastTimeout;

  function activateFilters() {
    mapFilters.addEventListener('change', filterPinsChangeHandler);
  }


  function filterPinsChangeHandler() {
    window.ads.remove();
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      window.ads.renderPins(filterPins());
    }, TIME);
  }

  function checkFeature(featureList, item) {
    for (var i = 0; i < featureList.length; ++i) {
      if (item === featureList[i]) {
        return true;
      }
    }
    return false;
  }

  function filterPins(data) {
    data = window.data.get();
    var newPinsArray = [];
    for (var i = 0; (i < data.length) && (newPinsArray.length < 5); i++) {
      var housingTypeSelected = false;
      var housingPriceSelected = false;
      var housingRoomsSelected = false;
      var housingGuestsSelected = false;
      var housingFeaturesSelected = true;

      if (housingType.value === 'any') {
        housingTypeSelected = true;
      } else {
        housingTypeSelected = data[i].offer.type === housingType.value;
      }
      switch (housingPrice.value) {
        case 'low':
          housingPriceSelected = data[i].offer.price < LOW_PRICE;
          break;

        case 'middle':
          housingPriceSelected = data[i].offer.price >= LOW_PRICE && data[i].offer.price < HEIGHT_PRICE;
          break;

        case 'high':
          housingPriceSelected = data[i].offer.price >= HEIGHT_PRICE;
          break;

        default:
          housingPriceSelected = true;
          break;
      }

      if (housingRooms.value === 'any') {
        housingRoomsSelected = true;
      } else {
        housingRoomsSelected = parseInt(data[i].offer.rooms, 10) === parseInt(housingRooms.value, 10);
      }
      if (housingGuests.value === 'any') {
        housingGuestsSelected = true;
      } else {
        housingGuestsSelected = parseInt(data[i].offer.guests, 10) === parseInt(housingGuests.value, 10);
      }

      if (!housingFeatures.querySelector('#filter-wifi').checked &&
        !housingFeatures.querySelector('#filter-dishwasher').checked &&
        !housingFeatures.querySelector('#filter-parking').checked &&
        !housingFeatures.querySelector('#filter-washer').checked &&
        !housingFeatures.querySelector('#filter-elevator').checked &&
        !housingFeatures.querySelector('#filter-conditioner').checked) {
        housingFeaturesSelected = true;
      } else {
        var features = data[i].offer.features;
        housingFeaturesSelected = true;
        if (housingFeatures.querySelector('#filter-wifi').checked) {
          housingFeaturesSelected = housingFeaturesSelected && checkFeature(features, 'wifi');
        }
        if (housingFeatures.querySelector('#filter-dishwasher').checked) {
          housingFeaturesSelected = housingFeaturesSelected && checkFeature(features, 'dishwasher');
        }
        if (housingFeatures.querySelector('#filter-parking').checked) {
          housingFeaturesSelected = housingFeaturesSelected && checkFeature(features, 'parking');
        }
        if (housingFeatures.querySelector('#filter-washer').checked) {
          housingFeaturesSelected = housingFeaturesSelected && checkFeature(features, 'washer');
        }
        if (housingFeatures.querySelector('#filter-elevator').checked) {
          housingFeaturesSelected = housingFeaturesSelected && checkFeature(features, 'elevator');
        }
        if (housingFeatures.querySelector('#filter-conditioner').checked) {
          housingFeaturesSelected = housingFeaturesSelected && checkFeature(features, 'conditioner');
        }
      }
      if (housingTypeSelected && housingPriceSelected && housingRoomsSelected && housingGuestsSelected && housingFeaturesSelected) {
        newPinsArray.push(data[i]);
      }
    }
    return newPinsArray;
  }
  function deActivateFilters() {
    mapFilters.removeEventListener('change', filterPinsChangeHandler);
    }
  window.filters = {
    deActivate: deActivateFilters,
    activate: activateFilters,
  };

})();
