function unitTests() {

	var pass = 0;

	// slider
	if ($("#slider-range").slider( "values", 0 ) == minDist) {
		pass += 1;
	}

	// findDistances
	// if (routes.length > 0) {
	// 	pass += 1;
	// }

	// undefined park name
	routes = [];
	routes.push({start:"301 32nd St, Baltimore, MD", end:"5200 Alhambra Ave, Baltimore, MD", dist:4, startName:"", endName:""})
	initMap();
	if (include[0].startName == "Monument") {
		pass += 1;
	}

	window.alert("You passed " + String(pass) + " tests.");
}