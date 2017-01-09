// Script for page load and global variables

// Go button clickable
var clickable = true;

// Minimum range
var minDist = 0;

// Maximum range
var maxDist = 10;

// List of all valid routes with starting address and name, ending address and name, and distance.
var routes = [];

// List of all routes that satisfy the range set by the user and can be displayed in the available divs.
var include = [];

// Initialization script
$(document).ready(function() {
  $("#sort").css({"display": "none"});
  $("body").addClass("stop-scrolling");
  $("#no-results").css({"display": "none"});

  // Slider
  var handle1 = $( "#custom-handle1" );
  var handle2 = $( "#custom-handle2" );
  $( "#slider-range" ).slider({
    range: true,
    min: minDist,
    max: maxDist,
    step: 0.1,
    values: [ 1.0, 5.0],
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

  // Go button
  $('#button').click(function() {
    if (clickable) {
      clickable = false;
      $("body").removeClass("stop-scrolling");
      $("#loading").hide();
      initMap();
    } else {
      console.log("unclickable");
    }
  });

  // Sorting
  $('#sort').change(function () {
    sortAndUpdateRoutes(include);
  });

  // Navigaton bar
  var nav = $(".nav-bar");
  var navtop = nav.offset().top;
  $(window).scroll(function() {
    if ($(window).scrollTop() > navtop) {
      nav.addClass("nav-scrolled");
    } else {
      nav.removeClass("nav-scrolled");
    }
  });

  // Search bar updates after typing
  var timerid;
  $("#searchInput").on("input",function(e) {
    var value = $(this).val();
    if($(this).data("lastval")!= value){
      $(this).data("lastval",value);
      clearTimeout(timerid);
      timerid = setTimeout(function() {
        findDistances();
      },500);
    };
  });

  // unitTests();
});

