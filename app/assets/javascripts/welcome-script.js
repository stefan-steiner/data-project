// var app = angular.module('myApp', ['ngMap']);
// app.controller('CustomControlCtrl', function(NgMap) {
//   var vm = this;
//   var baltimore = new google.maps.LatLng(39.29, -76.61);
//   NgMap.getMap().then(function(map) {
//     vm.map = map;
//   });
//   vm.click = function() {
//     vm.map.setCenter(baltimore);
//     vm.map.setZoom(13);
//   };
// });

// angular.module('ngMap').run(function($rootScope) {
//     $rootScope.directions = gon.pairs
// });

var app = angular.module('myApp', ['ngMap']);
app.controller('CustomControlCtrl', function(NgMap) {
  //window.alert(map.directionsRenderers[0].directions.routes[0].legs[0].distance.text);
  var vm = this;
  var baltimore = new google.maps.LatLng(39.29, -76.61);
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });
  vm.click = function() {
    vm.map.setCenter(baltimore);
    vm.map.setZoom(13);
  };

});
/*
angular.module('ngMap').run(function($rootScope) {
    $rootScope.directions = gon.pairs

});
*/

function initMap() {
  addresses = gon.addresses;
  pairs = gon.pairs
  destinations = [];
  origins = [];
  for (i = 0; i < 10; i++) {
    destinations.push(pairs[i].destination);
    origins.push(pairs[i].origin);
  }
  //console.log(destinations);
  //console.log(origins);


  var origin1 = new google.maps.LatLng(55.930385, -3.118425);
  var origin2 = 'Greenwich, England';
  var destinationA = 'Stockholm, Sweden';
  var destinationB = new google.maps.LatLng(50.087692, 14.421150);

  var service = new google.maps.DistanceMatrixService();

  service.getDistanceMatrix(
    {
      origins: origins,
      destinations: destinations,
      travelMode: 'WALKING',
      unitSystem: google.maps.UnitSystem.IMPERIAL
    }, callback);
  function callback(response, status) {
    if (status == 'OK') {
      var origins = response.originAddresses;
      var destinations = response.destinationAddresses;
      for (var i = 0; i < 10; i++) {
        var results = response.rows[i].elements;
        //window.alert(results.length);
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var duration = element.duration.text;
          var from = origins[i];
          var to = destinations[j];
          window.alert(distance);
        }
      }
    } else {
      window.alert("error");
    }
  }
}

// get element id event listener
initMap();


