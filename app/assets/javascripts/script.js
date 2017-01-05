var minDist = 0;
var maxDist = 20;
var routes;


$(document).ready(function() {
  var handle1 = $( "#custom-handle1" );
  var handle2 = $( "#custom-handle2" );
  $( "#slider-range" ).slider({
    range: true,
    min: minDist,
    max: maxDist,
    step: 0.1,
    values: [ 4.0, 6.0],
    create: function() {
      handle1.text( $( this ).slider( "values", 0 ) );
      handle2.text( $( this ).slider( "values", 1 ) );
      $( "#amount" ).val("I want to run " + $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) + " miles.");
      minDist = Number($( this ).slider( "values", 0 ));
      maxDist = Number($( this ).slider( "values", 1 ));
    },
    slide: function( event, ui ) {
      $( "#amount" ).val("I want to run " + ui.values[ 0 ] + " - " + ui.values[ 1 ] + " miles.");
      handle1.text( ui.values[0] );
      handle2.text( ui.values[1] );
      minDist = Number(ui.values[0]);
      maxDist = Number(ui.values[1]);
    }
  });

  $('#button').click(function() {
    initMap(false);
  });

  var nav = $(".nav-bar");
  var navtop = nav.offset().top;

  $(window).scroll(function() {
    console.log($(window).scrollTop());
    if ($(window).scrollTop() > navtop) {
      nav.addClass("nav-scrolled");
    } else {
      nav.removeClass("nav-scrolled");
    }
  });

});

function findDistances() {
  pairs = gon.pairs; // all possible pairs of addresses
  destinations = [];
  origins = [];

  for (i = 0; i < 10; i++) {
    var index = Math.floor((Math.random() * pairs.length)); //come back to this b/c could select same index
    destinations.push(pairs[index].destination);
    origins.push(pairs[index].origin);
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
            var route = { start:origins[i], end:destinations[j], dist:intDist };
            routes.push(route);
          } else {
            window.alert(element.status);
            window.alert(origins[i]);
            window.alert(destinations[j]);
          }
        }
      }
    } else {
        window.alert(status);
    }
  }
}

// Update results
// refresh: new Distance Matrix request

function initMap(refresh) {

  if (refresh) {
    findDistances();
  }


  var include = [];
  var sortedInclude = [];
  
  for (var r = 0; r < routes.length; r++) {
    console.log(routes[r].dist);
    console.log(routes[r].start);
    console.log(routes[r].end);


    if (routes[r].dist <= maxDist && routes[r].dist >= minDist) {
      console.log("pass");
      include.push(routes[r]);

    }
  }

  if (include.length == 0) {
      window.alert("No routes found. Please try a different range.")
      return
  }

  for (var x = 0; x < 5 && x < include.length; x++) {
    var index = Math.floor((Math.random() * include.length));
    sortedInclude.push(include[index]);
  }

  if (document.getElementById('sort').value == "increasing") {
    sortedInclude.sort(function(a, b){return a.dist-b.dist});
  } else {
    sortedInclude.sort(function(a, b){return b.dist-a.dist});
  }
  updateRoutes(sortedInclude);

  // Render included routes
  function updateRoutes(include) {

    for (var x = 0; x < include.length; x++) {

      // window.alert(x);
      // window.alert(include[x].start);
      // window.alert(include[x].dist);
      // window.alert(include[x].end);
      var directionsDisplay = new google.maps.DirectionsRenderer;
      var directionsService = new google.maps.DirectionsService;
      var map = new google.maps.Map(document.getElementById('m' + String(x)), {
        zoom: 15,
        center: {lat: 39.29, lng: -76.61}
      });
      directionsDisplay.setMap(map);
      document.getElementById('rp' + String(x)).innerHTML = "";
      directionsDisplay.setPanel(document.getElementById('rp' + String(x)));
      var start = include[x].start;
      var end = include[x].end;
      calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
    }
    function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) {
      //window.alert(start);
      // window.alert(end);
      directionsService.route({
        origin: start,
        destination: end,
        travelMode: 'WALKING'
      }, function(response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
      });
    }
  }
}

