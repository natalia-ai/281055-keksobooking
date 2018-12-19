
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
      var housingTypeSelected = true;
      var housingPriceSelected = false;
      var housingRoomsSelected = false;
      var housingGuestsSelected = false;
      var housingFeaturesSelected = false;
      var allHousingFeaturesUnchecked = true;

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

      housingTypeSelected = housingType.value === 'any' || data[i].offer.type === housingType.value;
      housingRoomsSelected = housingRooms.value === 'any' || parseInt(data[i].offer.rooms, 10) === parseInt(housingRooms.value, 10);
      housingGuestsSelected = housingGuests.value === 'any' || parseInt(data[i].offer.guests, 10) === parseInt(housingGuests.value, 10);

      housingFeatures.childNodes.forEach(function (node) {
        if ((node.nodeName === 'INPUT') && (node.name === 'features')) {
          allHousingFeaturesUnchecked = allHousingFeaturesUnchecked && !node.checked;
          housingFeaturesSelected = housingFeaturesSelected || node.checked && checkFeature(data[i].offer.features, node.value);
        }
      });
      housingFeaturesSelected = allHousingFeaturesUnchecked || housingFeaturesSelected;
      
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
