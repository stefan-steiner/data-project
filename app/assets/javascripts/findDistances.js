function findDistances() {
  // pairs = gon.pairs; // all possible pairs of addresses
  window.alert("finddist");
  addresses = gon.addresses
  destinations = [];
  origins = [];
  destinationNames = [];
  originNames = [];
  var seen = new Set();

  for (i = 0; i < 10; i++) {
    var index = Math.floor((Math.random() * addresses.length));
    var a = addresses[index];
    if (!seen.has(a.address)) {
      origins.push(a.address);
      originNames.push(a.name);
      seen.add(a.address);

      console.log(a.address);
    }
  }
  for (i = 0; i < 10; i++) {
    var index = Math.floor((Math.random() * addresses.length));
    var a = addresses[index];
    if (!seen.has(a.address)) {
      destinations.push(a.address);
      destinationNames.push(a.name);
      seen.add(a.address);

      console.log(a.address);
    }
  }
  routes = [];
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
        if (response.rows[i] != null) {
          var results = response.rows[i].elements;
          // window.alert(results.length);
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if (element.status == 'OK') {
              var distance = element.distance.text;
              var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
              var intDist = Number(distance.substring(0, distance.indexOf(" ")));
              var route = { start:origins[i], end:destinations[j], dist:intDist, startName:originNames[i], endName:destinationNames[j] };
              routes.push(route);
            } else {
              console.log(element.status);
            }
          }
        } else {
          console.log("here");
          console.log(response.rows.status);
        }
      }
    } else {
        window.alert(status);
    }
  }
}
