//Partial Credit to: https://www.d3indepth.com/force-layout/
//Partial Credit to: https://www.d3-graph-gallery.com/graph/circularpacking_group.html
const date = localStorage.getItem("view2_date");
const date_title = localStorage.getItem("view2_date_title");
const station = localStorage. getItem("view1_station");
const region = localStorage.getItem("view1_region");

MARGIN = { LEFT: 60, RIGHT: 30, TOP: 280, BOTTOM: 100 };
const width = 1200 - MARGIN.RIGHT - MARGIN.LEFT
const height = 1200 - MARGIN.TOP - MARGIN.BOTTOM
sizeDivisor = 900, nodePadding = 2.5;

d3.select('h1').text(function(){
  return ('Hourly Gas Emission for '+ date_title)
});

d3.select('#loading').text(function(){
    return ('Loading hourly gas data for '+ date_title + "...")
});

d3.select('#loading').attr("font-size", 15);

window.onload = function () {
  const station = localStorage.getItem("view1_station")
  const region = localStorage.getItem("view1_region")

  if (station && region) {
      displayRegion.textContent = "Region [" + region.slice(5) + "]"
      displayStation.textContent = "Air Station [" + station + "]"
  } else if (!region && station) {
      displayRegion.textContent = getKeyByValue(BC, station)
      displayStation.textContent = station
  }
}

var svg = d3.select(".bubble")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var color = d3.scaleOrdinal()
  .domain(['CO', 'NO2', 'O3', 'NOx', 'SO2', 'NO'])
  .range(["#FFA500", "#228B22", "#808080", '#000000', '#852415', '#800080']);

var simulation = d3.forceSimulation()
  .force("center", d3.forceCenter().x(width / 2).y(height / 2)) 
  .force("charge", d3.forceManyBody().strength(1)) 
  .force("collide", d3.forceCollide().strength(.1).radius(30).iterations(1));

var tooltip = d3.select("body")
  .append("div").attr("class", "tooltipbubble").style("opacity", 0);

var x = d3.scaleSqrt().range([6, 45]);

d3.csv('data/view3.csv').
  then(data => {

    data = data.filter(function (d, i) {
      if (d.REGION == region && d.STATION_NAME == station && d.DATE == date) {
        return d;
      }

    })
    d3.select('#loading').style("display", "none");
    data.forEach(d => {
      d.ROUNDED_VALUE = Number(d.ROUNDED_VALUE);
    })

    x.domain(d3.extent(data, d => d.ROUNDED_VALUE));

    data = data.sort(function (a, b) { return b.size - a.size; });

    simulation
      .nodes(data)
      .force("collide", d3.forceCollide().strength(.5).radius(function (d) {

        if (d.PARAMETER == "CO") {
          return x(d.ROUNDED_VALUE) + nodePadding;
        } else {
          return x(d.ROUNDED_VALUE) + nodePadding;
        }

      }).iterations(1))
      .on("tick", function (d) {
        node
          .attr("cx", function (d) { return d.x; })
          .attr("cy", function (d) { return d.y; })
      });

    var node = svg.append("g")
      .attr("class", "node").selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("stroke", "black")
      .style("stroke-width", 1)
      .attr("fill", function (d) { return color(d.PARAMETER); })
      .attr("cx", d => { return d.x })
      .attr("cy", d => d.y)
      .attr("r", function (d, i, n) {

        if (d.PARAMETER == "CO") {
          return x(d.ROUNDED_VALUE);
        } else {
          return x(d.ROUNDED_VALUE);
        }
      });

    node.call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)).on('mouseover', function (event, i) {
        tooltip.transition().duration(200).style("opacity", 0.9);
        tooltip.html("<p>Gas: " + i.PARAMETER + "</p> <p>Hour: " + i.TIME + "</p> <p>Emitted Value (ppb): " + i.ROUNDED_VALUE + "</p>").style("left", event.pageX + "px").style("top", event.pageY + "px");

      }).on('mouseout', function (event, i) {
        tooltip.transition().duration(200).style("opacity", 0);

      });
  })
  .catch(error => {
    console.error(error);
  });

function dragstarted(event, d) {
  if (!event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(event, d) {
  d.fx = event.x;
  d.fy = event.y;
}

function dragended(event, d) {
  if (!event.active) simulation.alphaTarget(0.3);
  d.fx = null;
  d.fy = null;
}


