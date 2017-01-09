// Update results
// refresh: new Distance Matrix request

function initMap() {
  // if ($("#search input").val()) {
  //   findDistances();
  // }

  include = [];
  var includeAll = [];
  // window.alert("here1");
  // window.alert(routes.length);

  for (var r = 0; r < routes.length; r++) {
    if (routes[r].dist <= maxDist && routes[r].dist >= minDist) {
     if (!$("#search input").val() || routes[r].startName.toLowerCase().includes($("#search input").val().toLowerCase())) {
        includeAll.push(routes[r]);
      }
    }
  }

  // window.alert(includeAll.length);

  if ($("#search input").val()) {
    $("#search input").val('');
    window.alert("input val reset");
    window.alert($("#search input").val());
  }

  if (includeAll.length == 0) {
    $("#sort").css({"display": "none"});
    $("body").addClass("stop-scrolling");
    window.alert("no results");
    $("#no-results").css({"display": "block"});
    findDistances();
    return;
  } else {
    $("#no-results").css({"display": "none"});
    $("#sort").css({"display": "unset"});
  }

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

  findDistances(); //update routes after b/c of initial callback

}

// Render included routes
function sortAndUpdateRoutes(include) {

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
    // document.getElementById('rp' + String(x)).innerHTML = "";
    directionsDisplay.setPanel(document.getElementById('rp' + String(x)));
    if (!include[x].startName) {
      window.alert("undefined-s");
      include[x].startName = "Monument";
      window.alert(include[x].startName);
    }
    if (!include[x].endName) {
      window.alert("undefined-e");
      include[x].endName = "Monument";
      window.alert(include[x].endName);
    }
    var title = include[x].startName + " to " + include[x].endName;
    $("#rp" + String(x) + " p").html(title);
    $("#rp" + String(x) + " h2").html(String(include[x].dist) + " mi");
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

