var numResults;
var currSlide = 0;

$(document).ready(function(){
    // $(".divs div").each(function(e) {
    //     if (e != 0) {
    //         $(this).hide();
    //     }
    // });

    hideSlides();
    

    $("#next").click(function(){
        currSlide += 1;
        if (currSlide * 3 >= numResults || currSlide == 3) {
            $("#next").hide();
        }
        $("#prev").show();  
        $("#page" + String(currSlide-1)).css({"display": "none"});
        for (var x = 0; x < 3; x++) {
            $("#m" + String(currSlide-1) + String(x)).addClass("hideRight");
        }
        $("#page" + String(currSlide)).css({"display": "unset"});
        for (var x = 0; x < 3; x++) {
            $("#m" + String(currSlide) + String(x)).removeClass("hideRight");
        }

        $("#page" + String(currSlide)).show();
    });

    $("#prev").click(function(){
        currSlide -= 1;
        if (currSlide == 1) {
            $("#prev").hide();
        }
        $("#next").show();  
        $("#page" + String(currSlide+1)).css({"display": "none"});
        for (var x = 0; x < 3; x++) {
            $("#m" + String(currSlide+1) + String(x)).addClass("hideRight");
        }
        $("#page" + String(currSlide)).css({"display": "unset"});
        for (var x = 0; x < 3; x++) {
            $("#m" + String(currSlide) + String(x)).removeClass("hideRight");
        }

        $("#page" + String(currSlide)).show();
    });
});

function hideSlides() {
    $("#page1").css({"display": "none"});
    $("#page2").css({"display": "none"});
    $("#page3").css({"display": "none"});
    $(".map").addClass("hideRight");
    $("#no-results").hide();
    $("#next").hide();
    $("#prev").hide();
}