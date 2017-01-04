// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

var minDist = 0
var maxDist = 20

$(document).ready(function() {
	var handle1 = $( "#custom-handle1" );
	var handle2 = $( "#custom-handle2" );
    $( "#slider-range" ).slider({
      range: true,
      min: 0.0,
      max: 20.0,
      step: 0.1,
      values: [ 4.0, 6.0],
      create: function() {
        handle1.text( $( this ).slider( "values", 0 ) );
        handle2.text( $( this ).slider( "values", 1 ) );
        $( "#amount" ).val("Run " + $( "#slider-range" ).slider( "values", 0 ) + " - " + $( "#slider-range" ).slider( "values", 1 ) + " miles");
        minDist = Number($( this ).slider( "values", 0 ));
        maxDist = Number($( this ).slider( "values", 1 ));
      },
      slide: function( event, ui ) {
        $( "#amount" ).val("Run " + ui.values[ 0 ] + " - " + ui.values[ 1 ] + " miles");
        handle1.text( ui.values[0] );
        handle2.text( ui.values[1] );
        minDist = Number(ui.values[0]);
        maxDist = Number(ui.values[1]);
      }
    });
    $('#button').click(initMap);
});

function initMap() {
  //window.alert('start');
  pairs = gon.pairs // all possible pairs of addresses
  destinations = [];
  origins = [];
  for (i = 0; i < 10; i++) {
  	var index = Math.floor((Math.random() * pairs.length)); //come back to this b/c could select same index
    // window.alert(index);
    destinations.push(pairs[index].destination);
    origins.push(pairs[index].origin);
  }
  var include = [];

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
        // window.alert("start")
        // window.alert(results.length);
        for (var j = 0; j < results.length; j++) {
          var element = results[j];
          var distance = element.distance.text;
          var duration = element.duration.text;
          var from = origins[i];
          var to = destinations[j];
          var intDist = Number(distance.substring(0, distance.indexOf(" ")));
          console.log("intDist: " + intDist);
          console.log("minDist: " + minDist);
          console.log("maxDist: " + maxDist);

          if ((intDist < maxDist) && (intDist > minDist)) {
          		//window.alert('got one');
          		console.log(origins[i]);
          		console.log(destinations[j]);
          		var route = { start:origins[i], end:destinations[j], dist:intDist };
          		include.push(route);

          }
        }
      }

      var directionsDisplay;
  	  var directionsService;
  	  var map;

	  for (var x = 0; x < 10; x++) {
      	directionsDisplay = new google.maps.DirectionsRenderer;
      	directionsService = new google.maps.DirectionsService;
	  	map = new google.maps.Map(document.getElementById('m' + String(x)), {
          zoom: 15,
          center: {lat: 39.29, lng: -76.61}
      	});
      	directionsDisplay.setMap(map);
	    directionsDisplay.setPanel(document.getElementById('rp' + String(x)));
	  	calculateAndDisplayRoute(directionsService, directionsDisplay);
	  }

	  function calculateAndDisplayRoute(directionsService, directionsDisplay) {
	        var start = include[0].start;
	        var end = include[0].end;
	        window.alert(start);
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
    } else {
      window.alert(status);
    }
  }

  

  

}



// get element id event listener
//initMap();
