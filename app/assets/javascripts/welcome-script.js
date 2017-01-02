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

angular.module('ngMap').run(function($rootScope) {
    $rootScope.directions = [
        {origin:"Palo Alto", destination:"Gilroy", panelName:"p1"},
        {origin:"San Jose", destination:"Mountain View", panelName:"p2"}
    ];
});


