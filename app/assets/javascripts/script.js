var minDist = 0;
var maxDist = 20;

var routes = [];
var include = [];



$(document).ready(function() {
  $("#sort").css({"display": "none"});
  $("body").addClass("stop-scrolling");
  $("#no-results").css({"display": "none"});
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
    $("body").removeClass("stop-scrolling");
    $("#loading").hide();
    initMap();
  });

  $('#sort').change(function () {
    window.alert("sorted");
    sortAndUpdateRoutes(include);
  });

  var nav = $(".nav-bar");
  var navtop = nav.offset().top;

  $(window).scroll(function() {
    if ($(window).scrollTop() > navtop) {
      nav.addClass("nav-scrolled");
    } else {
      nav.removeClass("nav-scrolled");
    }
  });
});

