// Copyright 2021 Observable, Inc.
// Released under the ISC license.
// https://observablehq.com/@d3/sunburst
class SunBurst {

  constructor(_config, _data) {
    this.config = {
      parentElement: _config.parentElement,
      containerWidth: _config.containerWidth || 900,
      containerHeight: _config.containerHeight || 900,
    }
    this.data = _data;

    this.initVis();
  }

  initVis() {

    let vis = this;

    vis.BC = {
      "01 - Vancouver Island": ["Colwood City Hall", "Courtenay Elementary School", "Crofton Elementary", "Crofton Substation", "Duncan College Street", "Duncan Deykin Avenue", "Elk Falls Dogwood", "Harmac Cedar Woobank", "Harmac Nanaimo Dukepoint", "Harmac Pacific Met_15", "Harmac Pacific Met_60", "Nanaimo Labieux Road", "Port Alberni Elementary", "Victoria Topaz", "Victoria Topaz Met_15", "Victoria Topaz Met_60"],
      "02 - Lower Mainland": ["Abbotsford A Columbia Street", "Abbotsford A Columbia Street Met", "Abbotsford Central", "Agassiz Municipal Hall", "Agassiz Municipal Hall Met", "Burnaby Burmount", "Burnaby Kensington Park", "Burnaby Mountain", "Burnaby North Eton", "Burnaby South", "Chilliwack Airport", "Coquitlam Douglas College", "CSpice Met_01", "CSpice_Met_60", "Hope Airport", "Hope Othello Compressor Station_15", "Hope Othello Compressor Station_60", "Horseshoe Bay", "Langdale Elementary", "Langley Central", "Maple Ridge Golden Ears School", "Mission School Works Yard", "Mission School Works Yard Met", "New Westminster Sapperton Park", "New Westminster Sapperton Park Met", "North Burnaby Capitol Hill", "North Delta", "North Vancouver Mahon Park", "North Vancouver Second Narrows", "Pitt Meadows Meadowlands School", "Port Mellon_15", "Port Mellon_60", "Port Moody Rocky Point Park", "Port Moody Rocky Point Park Met", "Powell River James Thomson School", "Powell River Pacifica Met_15", "Powell River Pacifica Met_60", "Powell River Townsite Helipad", "Richmond South", "Squamish Elementary", "Squamish Elementary_15", "Squamish Elementary_60", "Surrey East", "Tsawwassen", "Vancouver Clark Drive", "Vancouver Clark Drive Met", "Vancouver International Airport #2", "Vancouver Robson Square", "Whistler Meadow Park"],
      "03 - Southern Interior": ["Kamloops Federal Building", "Kelowna KLO Road", "Merritt Parcel Street Met_15", "Merritt Parcel Street Met_60", "Penticton Industrial Place", "Vernon Science Centre", "Vernon Science Centre_15", "Vernon Science Centre_60"],
      "04 - Kootenay": ["Birchbank Golf Course", "Birchbank Golf Course_15", "Birchbank Golf Course_60", "Castlegar Hospital", "Castlegar Zinio Park", "Celgar Pulp Met_15", "Celgar Pulp Met_60", "Cranbrook Muriel Baxter", "Golden Helipad", "Golden Lady Grey School Met_15", "Golden Lady Grey School Met_60", "Grand Forks Airport Met_15", "Grand Forks Airport Met_60", "Grand Forks City Hall", "Robson", "Scotties Marina", "Skookumchuck Farstad Way", "Skookumchuck Farstad Way_60", "Trail Butler Park", "Trail Butler Park Met_15", "Trail Butler Park Met_60", "Trail Columbia Gardens Airport", "Trail Columbia Gardens Airport_15", "Trail Columbia Gardens Airport_60", "Warfield Elementary", "Warfield Elementary Met_15", "Warfield Elementary Met_60"],
      "05 - Cariboo": ["Quesnel Anderson Drive", "Quesnel CP Met_15", "Quesnel CP Met_60", "Quesnel Kinchant St MAML", "Williams Lake Columneetza School", "Williams Lake Columneetza School_15", "Williams Lake Columneetza School_60"],
      "06 - Skeena": ["Burns Lake Fire Centre", "Burns Lake Fire Centre_15", "Burns Lake Fire Centre_60", "Burns Lake Sheraton East Met_15", "Burns Lake Sheraton East Met_60", "Fraser Lake Endako Mines_15", "Fraser Lake Endako Mines_60", "Houston Firehall", "Houston Firehall_15", "Houston Firehall_60", "Kitimat Haisla Village", "Kitimat Haul Road", "Kitimat Haul Road Met_15", "Kitimat Haul Road Met_60", "Kitimat Industrial Ave", "Kitimat Riverlodge", "Kitimat Whitesail", "Kitimat Whitesail Met_15", "Kitimat Whitesail Met_60", "Kitimat Yacht Club_15", "Kitimat Yacht Club_60", "Prince Rupert Fairview", "Prince Rupert Roosevelt Park School Met_15", "Prince Rupert Roosevelt Park School Met_60", "Smithers Muheim Memorial", "Smithers Muheim Memorial_15", "Smithers Muheim Memorial_60", "Stewart Youth Centre Met_15", "Stewart Youth Centre Met_60", "Telkwa_15", "Telkwa_60", "Terrace Skeena Middle School", "Terrace Skeena Middle School_15", "Terrace Skeena Middle School_60"],
      "07 - Omineca-Peace": ["Bessborough 237 Road", "Farmington Community Hall", "Farmington Community Hall Met_1", "Farmington Community Hall Met_15", "Farmington Community Hall Met_60", "Fort St John 85th Avenue_1", "Fort St John 85th Avenue_60", "Fort St John Key Learning Centre", "Fort St John North Camp C_1", "Fort St John North Camp C_60", "Fort St John North Camp C_Met_60", "Fort St John Old Fort_1", "Fort St John Old Fort_60", "Hudsons Hope Dudley Drive", "Peace Valley Attachie Flat Upper Terrace_1", "Peace Valley Attachie Flat Upper Terrace_60", "Peace Valley Attachie Flat Upper Terrace_Met_60", "PG Marsulex Met_1", "PG Marsulex Met_15", "PG Marsulex Met_60", "Pine River Gas Plant_60", "Pine River Hasler_60", "Prince George Exploration Place", "Prince George Exploration Place_1", "Prince George Exploration Place_60", "Prince George Jail", "Prince George Lakewood", "Prince George Marsulex Acid Plant", "Prince George Plaza 400", "Prince George Plaza 400 Met_15", "Prince George Plaza 400 Met_60", "Prince George Pulp Met_15", "Prince George Pulp Met_60", "Taylor South Hill", "Taylor Townsite", "Valemount", "Valemount Met_15", "Valemount Met_60", "Vanderhoof Courthouse", "Vanderhoof Courthouse Met_15", "Vanderhoof Courthouse Met_60"]
    }

    vis.tooltip = d3.select('body')
      .append("div").attr("class", "tooltip").style("opacity", 0);

    vis.format = d3.format(",d")

    vis.MARGIN = { LEFT: 60, RIGHT: 30, TOP: 30, BOTTOM: 20 };
    vis.width = 1000
    vis.height = 900
    vis.radius = vis.config.containerWidth / 11

    vis.svg = d3.create("svg")
      .attr("viewBox", [10, 250, vis.width, vis.height])
      .style("font", "5px sans-serif");

    vis.g = vis.svg.append("g")
      .attr("transform", `translate(${vis.width / 2},${vis.width / 2})`);
    
    vis.updateVis()

  }

  updateVis() {
    let vis = this;

    vis.boot = d3.stratify().id(d => d.children).parentId(d => d.name)(vis.data);
    vis.root = partition(vis.boot);
    vis.color = d3.scaleOrdinal(d3.quantize(d3.interpolateViridis, vis.root.children.length + 1))
    vis.root.each(d => d.current = d);

    vis.arc = d3.arc()
      .startAngle(d => d.x0)
      .endAngle(d => d.x1)
      .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
      .padRadius(vis.radius * 1.5)
      .innerRadius(d => d.y0 * vis.radius)
      .outerRadius(d => Math.max(d.y0 * vis.radius, d.y1 * vis.radius - 1))

    vis.path = vis.g.append("g")
      .selectAll("path")
      .data(vis.root.descendants().slice(1))
      .join("path")
      .attr("fill", d => {
        while (d.depth > 1) d = d.parent;

        return vis.color(d.data.children);
      })
      .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
      .attr("d", d => vis.arc(d.current)).attr('stroke', 'black')
      .attr('stroke-width', '0.5px')
      .on('mouseover', function (event, p) {
        vis.tooltip.transition().duration(200).style("opacity", 0.7);

        if (p.data.id == '02 - Lower Mainland' || p.data.id == '01 - Vancouver Island' || p.data.id == 'BC'
          || p.data.id == '03 - Southern Interior' || p.data.id == '04 - Kootenay' || p.data.id == '05 - Cariboo' || p.data.id == '06 - Skeena'
          || p.data.id == '07 - Omineca-Peace'
        ) {

          vis.tooltip.html("<p>Region: " + p.data.id + "</p>").style("left", event.pageX + "px").style("top", event.pageY + "px");
        } else {

          vis.tooltip.html("<p>Station: " + (p.data.id) + "</p>").style("left", event.pageX + "px").style("top", event.pageY + "px");
        }

      }).on('mouseout', function (event, i) {
        vis.tooltip.transition().duration(200).style("opacity", 0);

      });

    vis.path.filter(d => d.data.data.children)
      .style("cursor", "pointer")
      .on("click", clicked);

    vis.label = vis.g.append("g")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .style("user-select", "none")
      .selectAll("text")
      .data(vis.root.descendants().slice(1))
      .join("text")
      .attr("dy", "0.35em")
      .attr("fill-opacity", d => +labelVisible(d.current))
      .attr("transform", d => labelTransform(d.current))
      .text(d => {

        return d.data.data.children
      });

    vis.parent = vis.g.append("circle")
      .datum(vis.root)
      .attr("r", vis.radius)
      .attr("fill", "none")
      .attr("pointer-events", "all")
      .on("click", clicked)
      .text(d => {
        return d.data.data.children;
      });

    function clicked(event, p) {

      if (p.data.id == '02 - Lower Mainland' || p.data.id == '01 - Vancouver Island' || p.data.id == 'BC'
        || p.data.id == '03 - Southern Interior' || p.data.id == '04 - Kootenay' || p.data.id == '05 - Cariboo' || p.data.id == '06 - Skeena'
        || p.data.id == '07 - Omineca-Peace'
      ) {
        transitions(event, p);
        passData(event, p);
      } else {
        passData(event, p);
      }


    }

    function passData(event, p) {
      let userSelected = p.data.id

      // if selected item is a region
      if (userSelected in vis.BC) {
        console.log("Selected region " + userSelected)
        localStorage.setItem("view1_region", p.data.id);
      } else if (userSelected !== "BC") {
        // selected item is a station
        console.log("Selected station " + userSelected)
        localStorage.setItem("view1_station", p.data.id);
        window.location.href = "view2.html";
      }

    }

    function transitions(event, p) {

      vis.parent.datum(p.parent || vis.root);

      vis.root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });

      vis.t = vis.g.transition().duration(750);


      vis.path.transition(vis.t)
        .tween("data", d => {

          const i = d3.interpolate(d.current, d.target);
          return t => d.current = i(t);
        })
        .filter(function (d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
        .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
        .attrTween("d", d => () => vis.arc(d.current));

      vis.label.filter(function (d) {
        return +this.getAttribute("fill-opacity") || labelVisible(d.target);
      }).transition(vis.t)
        .attr("fill-opacity", d => +labelVisible(d.target))
        .attrTween("transform", d => () => labelTransform(d.current));

    }

    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * vis.radius;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    function partition(data) {

      const root = d3.hierarchy(data)
        .sum(d => {

          return d.data.value
        })
        .sort((a, b) => b.data.value - a.data.value);

      return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root);
    }
    console.log(vis.root);
    vis.canvas = d3.select(vis.config.parentElement).node().appendChild(vis.svg.node());

  }

  renderVis() {
    let vis = this;

  }

}
