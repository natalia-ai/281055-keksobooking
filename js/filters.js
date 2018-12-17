'use strict';
(function () {
  var LOW_PRICE = 10000;
  var HEIGHT_PRICE = 50000;

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var housingFeatures = mapFilters.querySelector('#housing-features');
  var lastTimeout;

  mapFilters.addEventListener('change', filterPinsChangeHandler);

  function filterPinsChangeHandler() {
    window.ads.remove();
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      window.ads.renderPins(filterPins());
    }, 500);
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
        housingRoomsSelected = data[i].offer.rooms === housingRooms.value;
      }
      if (housingGuests.value === 'any') {
        housingGuestsSelected = true;
      } else {
        housingGuestsSelected = data[i].offer.guests === housingGuests.value;
      }

      if (!housingFeatures.querySelector('#filter-wifi').checked &&
        !housingFeatures.querySelector('#filter-dishwasher').checked &&
        !housingFeatures.querySelector('#filter-parking').checked &&
        !housingFeatures.querySelector('#filter-washer').checked &&
        !housingFeatures.querySelector('#filter-elevator').checked &&
        !housingFeatures.querySelector('#filter-conditioner').checked) {
        housingFeaturesSelected = true;
      } else {
        var features = new Set(data[i].offer.features);
        housingFeaturesSelected = true;
        if (housingFeatures.querySelector('#filter-wifi').checked) {
          housingFeaturesSelected = housingFeaturesSelected && features.has('wifi');
        }
        if (housingFeatures.querySelector('#filter-dishwasher').checked) {
          housingFeaturesSelected = housingFeaturesSelected && features.has('dishwasher');
        }
        if (housingFeatures.querySelector('#filter-parking').checked) {
          housingFeaturesSelected = housingFeaturesSelected && features.has('parking');
        }
        if (housingFeatures.querySelector('#filter-washer').checked) {
          housingFeaturesSelected = housingFeaturesSelected && features.has('washer');
        }
        if (housingFeatures.querySelector('#filter-elevator').checked) {
          housingFeaturesSelected = housingFeaturesSelected && features.has('elevator');
        }
        if (housingFeatures.querySelector('#filter-conditioner').checked) {
          housingFeaturesSelected = housingFeaturesSelected && features.has('conditioner');
        }
      }
      if (housingTypeSelected && housingPriceSelected && housingRoomsSelected && housingGuestsSelected && housingFeaturesSelected) {
        newPinsArray.push(data[i]);
      }
    }
    return newPinsArray;
  }
})();
