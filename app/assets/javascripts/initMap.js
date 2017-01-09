// Updates visible results

function initMap() {
  include = [];
  var includeAll = [];

  // Check ranges and search params
  for (var r = 0; r < routes.length; r++) {
    if (routes[r].dist <= maxDist && routes[r].dist >= minDist) {
     if (!$("#search input").val() || routes[r].startName.toLowerCase().includes($("#search input").val().toLowerCase())) {
        includeAll.push(routes[r]);
      }
    }
  }

  // Reset search bar
  if ($("#search input").val()) {
    $("#search input").val('');
  }

  // Check for and handle no results
  if (includeAll.length == 0) {
    $("#sort").css({"display": "none"});
    $("body").addClass("stop-scrolling");
    $("#no-results").css({"display": "block"});
    findDistances();
    return;
  } else {
    $("#no-results").css({"display": "none"});
    $("#sort").css({"display": "unset"});
  }

  // Only display at most 9 routes
  if (includeAll.length > 9) {
    var seen = new Set();
    for (var x = 0; x < 9; x++) {
      var index = Math.floor((Math.random() * includeAll.length));
      if (!seen.has(index)) {
        include.push(includeAll[index]);
        seen.add(index);
      }
    }
  } else {
    include = includeAll;
  }

  sortAndUpdateRoutes(include);
  findDistances()

}

// Render included routes
function sortAndUpdateRoutes(include) {
  var stackSize = 0;
  if (document.getElementById('sort').value == "increasing") {
    include.sort(function(a, b){return a.dist-b.dist});
  } else {
    include.sort(function(a, b){return b.dist-a.dist});
  }
  for (var x = 0; x < 9; x++) {
    document.getElementById('m' + String(x)).innerHTML = "";
    document.getElementById('rp' + String(x)).innerHTML = "<p></p><h2></h2>";
  }
  for (var x = 0; x < include.length; x++) {
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var directionsService = new google.maps.DirectionsService;
    var map = new google.maps.Map(document.getElementById('m' + String(x)), {
      zoom: 15,
      center: {lat: 39.29, lng: -76.61}
    });
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(document.getElementById('rp' + String(x)));
    if (!include[x].startName) {
      console.log("undefined-s");
      include[x].startName = "Monument";
      console.log(include[x].startName);
    }
    if (!include[x].endName) {
      console.log("undefined-e");
      include[x].endName = "Monument";
      console.log(include[x].endName);
    }
    var title = include[x].startName + " to " + include[x].endName;
    $("#rp" + String(x) + " p").html(title);
    $("#rp" + String(x) + " h2").html(String(include[x].dist) + " mi");
    var start = include[x].start;
    var end = include[x].end;
    calculateAndDisplayRoute(directionsService, directionsDisplay, start, end);
  }
  function calculateAndDisplayRoute(directionsService, directionsDisplay, start, end) {
    directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'WALKING'
    }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          if (stackSize < 3) {
            setTimeout(calculateAndDisplayRoute(directionsService, directionsDisplay, start, end), 1000);
            stackSize += 1;
          }
        }
    });
  }
}

