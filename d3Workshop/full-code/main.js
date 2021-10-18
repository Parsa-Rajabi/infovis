/**
 * Global Variables
 */
var _data = [];

/**
 * Do the following when the browser window loads
 */
window.onload = function(){
    loadData("betterlifeindex.csv");
};

/**
 * Load data from a CSV file as JSON objects
 * @param path the location of the CSV file to load
 */
function loadData(path){
    d3.csv(path).then(function(data){
        //do something with the data
        _data = data;
        console.log(_data);

        drawCountries(_data);
        drawBars(_data);
        drawCircles(_data);

        let flowerVis = new FlowerVis(_data);
        flowerVis.width = $("#vis5").width();
        flowerVis.height = $("#vis5").height();
        flowerVis.svgContainer = d3.select("#vis5");
        flowerVis.createFlowers();

        let interactive_flowerVis = new FlowerVis_Interactive(_data);
        interactive_flowerVis.width = $("#vis6").width();
        interactive_flowerVis.height = $("#vis6").height();
        interactive_flowerVis.svgContainer = d3.select("#vis6");
        interactive_flowerVis.createFlowers();
    });
}

function drawCountries(data){
    let svg = d3.select("#vis2");
    svg.attr("viewBox", `0, 0, ${$("#vis2").width()}, ${$("#vis2").height()}`); // for dynamic sizing

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
            return (i+1.5) * 15;
        })
        .attr("y", 10)
        .attr("width", 10)
        .attr("height", 200);
}

function drawBars(data){
    let svg = d3.select("#vis3");
    svg.attr("viewBox", `0, 0, ${$("#vis3").width()}, ${$("#vis3").height()}`); // for dynamic sizing

    // setup margins and dimensions
    let width = $("#vis3").width(),
        height = $("#vis3").height();
    let barWidth = width / data.length;

    // setup D3 scales
    // Here we create linear scales to map our x values
    // to the width of the svg viewport
    let xScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, width]); // limit our range within the margins

    // Here we create linear scales to map our y values
    // to the height of the svg viewport
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return d['Water quality']; })])
        .range([height, 0]);

    svg.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d,i){
            return xScale(i);
        })
        .attr("y", function(d){
            return yScale(d['Water quality']);
        })
        .attr("width", barWidth)
        .attr("height", height)
        .style("stroke", "white")
        .style("stroke-width", 2);
}

function drawCircles(data){
    let svg = d3.select("#vis4");
    // for dynamic sizing
    svg.attr("viewBox", `0, 0, ${$("#vis4").width()}, ${$("#vis4").height()}`);

    // setup margins and dimensions
    let width = $("#vis4").width(),
        height = $("#vis4").height();

    let maxDiameter = 40;

    // setup D3 scales
    // Here we create linear scales to map our x values
    // to the width of the svg viewport
    let xScale = d3.scaleLinear()
        .domain([30, d3.max(data, function(d) {
            return d['Feeling safe walking alone at night']; })])
        // limit our range within the margins
        .range([maxDiameter, width-maxDiameter]);

    // Here we create linear scales to map our y values
    // to the height of the svg viewport
    let yScale = d3.scaleLinear()
        .domain([d3.min(data, function(d) {
            return d['Life expectancy']; }),
            d3.max(data, function(d) { return d['Life expectancy']; })])
        .range([height-maxDiameter, maxDiameter]);

    let rScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) {
            return d['Homicide rate']; })])
        .range([5, 15]);

    let colorScale = d3.scaleLinear()
        .interpolate(d3.interpolateHcl)
        .domain([d3.min(data, function(d) { return d['Life satisfaction']; }),
            d3.max(data, function(d) { return d['Life satisfaction']; })])
        // .range(['rgb(0,191,255)', 'rgb(255,51,102)'])
        .range(['rgb(0,0,0)', 'rgb(0,191,255)'])
        .clamp(true);

    svg.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("cx", function(d){
            return xScale(d['Feeling safe walking alone at night']);
        })
        .attr("cy", function(d){
            return yScale(d['Life expectancy']);
        })
        .attr("r", function(d){
            return rScale(d['Homicide rate']);
        })
        .style("fill", function(d){
            return colorScale(d['Life satisfaction']);
        })
        .style("stroke", "white")
        .style("stroke-width", 2);
}