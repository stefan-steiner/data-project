
// Update results
// refresh: new Distance Matrix request

function initMap(refresh) {
  hideSlides();

  if (refresh) {
    findDistances();
  }


  var include = [];
  var sortedInclude = [];
  
  for (var r = 0; r < routes.length; r++) {
    if (routes[r].dist <= maxDist && routes[r].dist >= minDist) {
      include.push(routes[r]);
    }
  }
  window.alert(include.length);


  if (include.length == 0) {
    window.alert("no results");
    $("#no-results").show();
    return;
  }


  if (include.length > 9) {
    var seen = new Set();
    for (var x = 0; x < 9; x++) {
      var index = Math.floor((Math.random() * include.length));
      if (!seen.has(index)) {
        sortedInclude.push(include[index]);
        seen.add(index);
      }
    }
  } else {
    sortedInclude = include;
  }



  if (document.getElementById('sort').value == "increasing") {
    sortedInclude.sort(function(a, b){return a.dist-b.dist});
  } else {
    sortedInclude.sort(function(a, b){return b.dist-a.dist});
  }
  numResults = sortedInclude.length;
  updateRoutes(sortedInclude);

  // Render included routes
  function updateRoutes(sortedInclude) {
    $("#page1").show();
    for (var x = 0; x < 3; x++) {
      $("#m" + 1 + String(x)).removeClass("hideRight");
    }
    // $("#page2").show();
    // $("#page3").show();
    currSlide = 1;
    window.alert(numResults);
    for (var x = 1; x < Math.floor(numResults / 3) + 1; x++) {
      for (var y = 0; y < 3; y++) {
      // window.alert(x);
      // window.alert(include[x].start);
      // window.alert(include[x].dist);
      // window.alert(include[x].end);
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        console.log('m' + String(x) + String(y));
        document.getElementById('m' + String(x) + String(y)).innerHTML = "";
        var map = new google.maps.Map(document.getElementById('m' + String(x) + String(y)), {
          zoom: 15,
          center: {lat: 39.29, lng: -76.61}
        });
        directionsDisplay.setMap(map);
        google.maps.event.trigger(map, 'resize');
        document.getElementById('rp' + String(x) + String(y)).innerHTML = "";
        directionsDisplay.setPanel(document.getElementById('rp' + String(x) + String(y)));
        var start = sortedInclude[(3 * (x - 1)) + y].start;
        var end = sortedInclude[(3 * (x - 1)) + y].end;
        calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
      }
      $("#next").show();
    }
    if (x < 4) {
      for (var y = 0; y < (numResults % 3); y++) {
        window.alert("")
        window.alert(x);
        window.alert(y);
        var directionsDisplay = new google.maps.DirectionsRenderer;
        var directionsService = new google.maps.DirectionsService;
        console.log('m' + String(x) + String(y));
        document.getElementById('m' + String(x) + String(y)).innerHTML = "";
        var map = new google.maps.Map(document.getElementById('m' + String(x) + String(y)), {
          zoom: 15,
          center: {lat: 39.29, lng: -76.61}
        });
        // $("#prev").click(function(){
        //   google.maps.event.trigger(map, 'resize');
        // });
        // $("#next").click(function(){
        //   google.maps.event.trigger(map, 'resize');
        // });
        directionsDisplay.setMap(map);
        google.maps.event.trigger(map, 'resize');
        document.getElementById('rp' + String(x) + String(y)).innerHTML = "";
        directionsDisplay.setPanel(document.getElementById('rp' + String(x) + String(y)));
        var start = include[(3 * (x - 1)) + y].start;
        var end = include[(3 * (x - 1)) + y].end;
        calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
      }
    }
    //$("#page2").css({"display": "none"});
    //$("#page3").css({"display": "none"});

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

