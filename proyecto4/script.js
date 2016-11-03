var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['Smartphone','Tablet'];

//Data
var d = [
		  [
			{axis:"Antioquia",value:0.57},
			{axis:"Atlantico",value:0.20},
			{axis:"Bogota D.C.",value:0.42},
			{axis:"Bolivar",value:0.39},
			{axis:"Boyaca",value:0.56},
			{axis:"Caldas",value:0.61},
			{axis:"Caqueta",value:0.63},
			{axis:"Cauca",value:0.25},
			{axis:"Cesar",value:0.37},
			{axis:"Cordoba",value:0.34},
			{axis:"Cundinamarca",value:0.54},
			{axis:"Choco",value:0.33},
			{axis:"Huila",value:0.70},
			{axis:"La Guajira",value:0.27},
			{axis:"Magdalena",value:0.30},
			{axis:"Meta",value:0.63},
			{axis:"Nariño",value:0.31},
			{axis:"Norte de Santander",value:0.46},
			{axis:"Quindio",value:0.50},
			{axis:"Risaralda",value:0.52},
			{axis:"Santander",value:0.43},
			{axis:"Sucre",value:0.38},
			{axis:"Tolima",value:0.59},
			{axis:"Valle del Cauca",value:0.34},
			{axis:"Arauca",value:0.47},
			{axis:"Casanare",value:0.77}
		  ],[
			{axis:"Antioquia",value:0.62},
			{axis:"Atlantico",value:0.39},
			{axis:"Bogota D.C.",value:0.43},
			{axis:"Bolivar",value:0.39},
			{axis:"Boyaca",value:0.49},
			{axis:"Caldas",value:0.57},
			{axis:"Caqueta",value:0.53},
			{axis:"Cauca",value:0.32},
			{axis:"Cesar",value:0.49},
			{axis:"Cordoba",value:0.32},
			{axis:"Cundinamarca",value:0.56},
			{axis:"Choco",value:0.20},
			{axis:"Huila",value:0.60},
			{axis:"La Guajira",value:0.38},
			{axis:"Magdalena",value:0.39},
			{axis:"Meta",value:0.63},
			{axis:"Nariño",value:0.35},
			{axis:"Norte de Santander",value:0.64},
			{axis:"Quindio",value:0.60},
			{axis:"Risaralda",value:0.56},
			{axis:"Santander",value:0.55},
			{axis:"Sucre",value:0.38},
			{axis:"Tolima",value:0.59},
			{axis:"Valle del Cauca",value:0.47},
			{axis:"Arauca",value:0.51},
			{axis:"Casanare",value:0.71}
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("What % of owners use a specific service in a week");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	