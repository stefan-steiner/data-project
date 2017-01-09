// Takes all available data as addresses, filters by search input, and runs the Google Distance Matrix

function findDistances() {
  clickable = false;
  // window.alert("finddist");
  updated = true;
  addresses = gon.addresses
  destinations = [];
  origins = [];
  destinationNames = [];
  originNames = [];
  var seen = new Set();
  if (!$("#search input").val()) {
      for (i = 0; i < 10; i++) {
      var index = Math.floor((Math.random() * addresses.length));
      var a = addresses[index];
      if (!seen.has(a.address)) {
        origins.push(a.address);
        originNames.push(a.name);
        seen.add(a.address);
        // console.log(a.address);
      }
    }
    for (i = 0; i < 10; i++) {
      var index = Math.floor((Math.random() * addresses.length));
      var a = addresses[index];
      if (!seen.has(a.address)) {
        destinations.push(a.address);
        destinationNames.push(a.name);
        seen.add(a.address);
        // console.log(a.address);
      }
    }
  } else {
    for (var i = 0; i < addresses.length; i++) {
      var a = addresses[i];
      if (a.name.toString().toLowerCase().includes($("#search input").val().toString().toLowerCase())) {
        origins.push(a.address);
        originNames.push(a.name);
        seen.add(a.address);
        // console.log(a.address);
        break;
      }
    }
    for (i = 0; i < 25; i++) {
      var index = Math.floor((Math.random() * addresses.length));
      var a = addresses[index];
      if (!seen.has(a.address)) {
        destinations.push(a.address);
        destinationNames.push(a.name);
        seen.add(a.address);
        // console.log(a.address);
      }
    }
  }
  routes = [];
  if (origins.length == 0 || destinations.length == 0) {
    clickable = true;
    return;
  }
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
      for (var i = 0; i < origins.length; i++) {
        if (response.rows[i] != null) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if (element.status == 'OK') {
              var distance = element.distance.text;
              var intDist = Number(distance.substring(0, distance.indexOf(" ")));
              if (distance.split(" ")[1] == "ft") {
                intDist = intDist / 5280;
                intDist = Math.round(intDist * 100) / 100
              }
              var route = { start:origins[i], end:destinations[j], dist:intDist, startName:originNames[i], endName:destinationNames[j] };
              routes.push(route);
            } else {
              console.log("destination-error");
              console.log(element.status);
            }
          }
        } else {
          console.log("origin-error");
          console.log(response.rows.status);
        }
      }
      clickable = true;
    } else {
      // window.alert(status);
      setTimeout(findDistances(), 300);
    }
  }
}

