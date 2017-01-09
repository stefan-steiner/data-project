function findDistances() {
  // pairs = gon.pairs; // all possible pairs of addresses
  window.alert("finddist");
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
  } else {
    //window.alert($("#search input").val());
    //window.alert($("#search input").val().toString());
    //window.alert(addresses[0].name);
    //window.alert(addresses[0].name.toString());
    //window.alert(addresses[0].name.toString().toLowerCase() == $("#search input").val().toString().toLowerCase());
    //window.alert("City Hall" == "City Hall");
    for (var i = 0; i < addresses.length; i++) {
      var a = addresses[i];
      if (a.name.toString().toLowerCase().includes($("#search input").val().toString().toLowerCase())) {
        //window.alert("found");
        //window.alert(a.name);
        origins.push(a.address);
        originNames.push(a.name);
        seen.add(a.address);
        break;
      }
    }
    //window.alert("finished search");
    for (i = 0; i < 25; i++) {
      var index = Math.floor((Math.random() * addresses.length));
      var a = addresses[index];
      if (!seen.has(a.address)) {
        destinations.push(a.address);
        destinationNames.push(a.name);
        seen.add(a.address);

        console.log(a.address);
      }
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
      //window.alert("here");
      //window.alert(origins.length);
      for (var i = 0; i < origins.length; i++) {
        if (response.rows[i] != null) {
          var results = response.rows[i].elements;
          // //window.alert(results.length);
          //window.alert(results.length);
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            if (element.status == 'OK') {
              var distance = element.distance.text;
              var duration = element.duration.text;
              var from = origins[i];
              var to = destinations[j];
              var intDist = Number(distance.substring(0, distance.indexOf(" ")));
              if (distance.split(" ")[1] == "ft") {
                window.alert("ft");
                intDist = intDist / 5280;
                intDist = Math.round(intDist * 100) / 100
                window.alert(intDist);
              }
              var route = { start:origins[i], end:destinations[j], dist:intDist, startName:originNames[i], endName:destinationNames[j] };
              routes.push(route);
            } else {
              console.log("dest-error");
              console.log(element.status);
            }
          }
        } else {
          console.log("origin-error");
          console.log(response.rows.status);
        }
      }
    } else {
        //window.alert(status);
    }
  }
}

