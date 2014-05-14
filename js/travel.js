console.log("travel.js is opened");
$(document).ready(function() { 
	var width = 600,
	height = 500;

	var places = [
		{
			name: "Toronto, Canada",
			location: {
				latitude: 43.7,
				longitude: -79.4
			}
		},
		{
			name: "Reykjavic, Iceland",
			location: {
				latitude: 64.1333,
				longitude: -21.9333
			}
		},
		{
			name: "Auchterhouse, Scotland",
			location: {
				latitude: 56.3129,
				longitude: -3.0518
			}
		},
		{
			name: "London, England",
			location: {
				latitude: 51.4800,
				longitude: 0.0000
			}
		},
		{
			name: "Paris, France",
			location: {
				latitude: 48.8567,
				longitude: 2.3508
			}
		},
		{
			name: "Zurich, Switzerland",
			location: {
				latitude: 47.3667,
				longitude: 8.5500
			}
		},
		{
			name: "Venice, Italy",
			location: {
				latitude: 45.4375,
				longitude: 12.3358
			}
		},
		{
			name: "Rome, Italy",
			location: {
				latitude: 41.9000,
				longitude: 12.5000
			}
		},
		{
			name: "Frankfurt, Germany",
			location: {
				latitude: 50.1117,
				longitude: 8.6858
			}
		},
		{
			name: "Berlin, Germany",
			location: {
				latitude: 52.5167,
				longitude:  13.3833
			}
		},
		{
			name: "Bangkok, Thailand",
			location: {
				latitude: 13.7500,
				longitude: 100.4667
			}
		},
		{
			name: "Seoul, South Korea",
			location: {
				latitude: 37.5500,
				longitude: 126.9667
			}
		},
		{
			name: "Tokyo, Japan",
			location: {
				latitude: 35.6895,
				longitude: 139.6917
			}
		}
	]

	var projection = d3.geo.mercator()
		.scale(width / 2 / Math.PI)
		.translate([width / 2, height / 2])
		.precision(.1);

	var svg = d3.select(".map").append("svg")
		.attr("width", width)
		.attr("height", height);

	var path = d3.geo.path()
	.projection(projection);

	var g = svg.append("g");

	var routes = [
	{
		type: "LineString", 
		coordinates: [[-79.4,43.7], [-21.9333,64.1333]]
	}, {
		type: "LineString", 
		coordinates: [[-21.9333,64.1333], [-3.0518,56.3129]]
	}, {
		type: "LineString", 
		coordinates: [[8.6858,50.1117], [100.4667,13.7500]]
	}, {
		type: "LineString", 
		coordinates: [[100.4667,13.7500], [126.9667,37.5500]]
	}, {
		type: "LineString", 
		coordinates: [[126.9667,37.5500], [139.6917,35.6895]]
	}, {
		type: "LineString", 
		coordinates: [ [139.6917,35.6895], [-79.4,43.7]]
	},
	];
	var h = svg.selectAll("routes")
		.data(routes)
		.enter().append("path")
 		.attr("class", "route")
		.attr("d", path);



	// load and display the World
	d3.json("json/countries.topo.json", function(error, topology) {
		g.selectAll("path")
		.data(topojson.feature(topology, topology.objects.countries)
			.features)
		.enter()
		.append("path")
		.attr("d", path)		
	});

	svg.selectAll("places")
	.data(places)
	.enter().append("circle", ".pin")
	.attr("r", 3.5)
	.attr("transform", function(d) {
		return "translate(" + projection([
			d.location.longitude,
			d.location.latitude
			]) + ")"
});  
});
console.log("p should be purple");