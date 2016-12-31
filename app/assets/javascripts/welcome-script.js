var app = angular.module('myApp', ['ngMap']);
app.controller('CustomControlCtrl', function(NgMap) {
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