var app = angular.module('ngMap');
app.controller('CustomControlCtrl', function(NgMap) {
  var vm = this;
  var chicago = new google.maps.LatLng(41.850033, -87.6500523);
  NgMap.getMap().then(function(map) {
    vm.map = map;
  });
  vm.click = function() {
    vm.map.setCenter(chicago);
  };
});