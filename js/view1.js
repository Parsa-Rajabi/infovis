var tooltip = d3.select("#canva").append("div").attr("class", "tooltip").style("opacity", 0);

const BC = {
    "01 - Vancouver Island": ["Colwood City Hall", "Courtenay Elementary School", "Crofton Elementary", "Crofton Substation", "Duncan College Street", "Duncan Deykin Avenue", "Elk Falls Dogwood", "Harmac Cedar Woobank", "Harmac Nanaimo Dukepoint", "Harmac Pacific Met_15", "Harmac Pacific Met_60", "Nanaimo Labieux Road", "Port Alberni Elementary", "Victoria Topaz", "Victoria Topaz Met_15", "Victoria Topaz Met_60"],
    "02 - Lower Mainland": ["Abbotsford A Columbia Street", "Abbotsford A Columbia Street Met", "Abbotsford Central", "Agassiz Municipal Hall", "Agassiz Municipal Hall Met", "Burnaby Burmount", "Burnaby Kensington Park", "Burnaby Mountain", "Burnaby North Eton", "Burnaby South", "Chilliwack Airport", "Coquitlam Douglas College", "CSpice Met_01", "CSpice_Met_60", "Hope Airport", "Hope Othello Compressor Station_15", "Hope Othello Compressor Station_60", "Horseshoe Bay", "Langdale Elementary", "Langley Central", "Maple Ridge Golden Ears School", "Mission School Works Yard", "Mission School Works Yard Met", "New Westminster Sapperton Park", "New Westminster Sapperton Park Met", "North Burnaby Capitol Hill", "North Delta", "North Vancouver Mahon Park", "North Vancouver Second Narrows", "Pitt Meadows Meadowlands School", "Port Mellon_15", "Port Mellon_60", "Port Moody Rocky Point Park", "Port Moody Rocky Point Park Met", "Powell River James Thomson School", "Powell River Pacifica Met_15", "Powell River Pacifica Met_60", "Powell River Townsite Helipad", "Richmond South", "Squamish Elementary", "Squamish Elementary_15", "Squamish Elementary_60", "Surrey East", "Tsawwassen", "Vancouver Clark Drive", "Vancouver Clark Drive Met", "Vancouver International Airport #2", "Vancouver Robson Square", "Whistler Meadow Park"],
    "03 - Southern Interior":["Kamloops Federal Building", "Kelowna KLO Road", "Merritt Parcel Street Met_15", "Merritt Parcel Street Met_60", "Penticton Industrial Place", "Vernon Science Centre", "Vernon Science Centre_15", "Vernon Science Centre_60"],
    "04 - Kootenay": ["Birchbank Golf Course", "Birchbank Golf Course_15", "Birchbank Golf Course_60", "Castlegar Hospital", "Castlegar Zinio Park", "Celgar Pulp Met_15", "Celgar Pulp Met_60", "Cranbrook Muriel Baxter", "Golden Helipad", "Golden Lady Grey School Met_15", "Golden Lady Grey School Met_60", "Grand Forks Airport Met_15", "Grand Forks Airport Met_60", "Grand Forks City Hall", "Robson", "Scotties Marina", "Skookumchuck Farstad Way", "Skookumchuck Farstad Way_60", "Trail Butler Park", "Trail Butler Park Met_15", "Trail Butler Park Met_60", "Trail Columbia Gardens Airport", "Trail Columbia Gardens Airport_15", "Trail Columbia Gardens Airport_60", "Warfield Elementary", "Warfield Elementary Met_15", "Warfield Elementary Met_60"],
    "05 - Cariboo": ["Quesnel Anderson Drive", "Quesnel CP Met_15", "Quesnel CP Met_60", "Quesnel Kinchant St MAML", "Williams Lake Columneetza School", "Williams Lake Columneetza School_15", "Williams Lake Columneetza School_60"],
    "06 - Skeena": ["Burns Lake Fire Centre", "Burns Lake Fire Centre_15", "Burns Lake Fire Centre_60", "Burns Lake Sheraton East Met_15", "Burns Lake Sheraton East Met_60", "Fraser Lake Endako Mines_15", "Fraser Lake Endako Mines_60", "Houston Firehall", "Houston Firehall_15", "Houston Firehall_60", "Kitimat Haisla Village", "Kitimat Haul Road", "Kitimat Haul Road Met_15", "Kitimat Haul Road Met_60", "Kitimat Industrial Ave", "Kitimat Riverlodge", "Kitimat Whitesail", "Kitimat Whitesail Met_15", "Kitimat Whitesail Met_60", "Kitimat Yacht Club_15", "Kitimat Yacht Club_60", "Prince Rupert Fairview", "Prince Rupert Roosevelt Park School Met_15", "Prince Rupert Roosevelt Park School Met_60", "Smithers Muheim Memorial", "Smithers Muheim Memorial_15", "Smithers Muheim Memorial_60", "Stewart Youth Centre Met_15", "Stewart Youth Centre Met_60", "Telkwa_15", "Telkwa_60", "Terrace Skeena Middle School", "Terrace Skeena Middle School_15", "Terrace Skeena Middle School_60"],
    "07 - Omineca-Peace": ["Bessborough 237 Road", "Farmington Community Hall", "Farmington Community Hall Met_1", "Farmington Community Hall Met_15", "Farmington Community Hall Met_60", "Fort St John 85th Avenue_1", "Fort St John 85th Avenue_60", "Fort St John Key Learning Centre", "Fort St John North Camp C_1", "Fort St John North Camp C_60", "Fort St John North Camp C_Met_60", "Fort St John Old Fort_1", "Fort St John Old Fort_60", "Hudsons Hope Dudley Drive", "Peace Valley Attachie Flat Upper Terrace_1", "Peace Valley Attachie Flat Upper Terrace_60", "Peace Valley Attachie Flat Upper Terrace_Met_60", "PG Marsulex Met_1", "PG Marsulex Met_15", "PG Marsulex Met_60", "Pine River Gas Plant_60", "Pine River Hasler_60", "Prince George Exploration Place", "Prince George Exploration Place_1", "Prince George Exploration Place_60", "Prince George Jail", "Prince George Lakewood", "Prince George Marsulex Acid Plant", "Prince George Plaza 400", "Prince George Plaza 400 Met_15", "Prince George Plaza 400 Met_60", "Prince George Pulp Met_15", "Prince George Pulp Met_60", "Taylor South Hill", "Taylor Townsite", "Valemount", "Valemount Met_15", "Valemount Met_60", "Vanderhoof Courthouse", "Vanderhoof Courthouse Met_15", "Vanderhoof Courthouse Met_60"]
}

d3.csv('data/view1_full.csv')
    .then(data => {

        data.forEach(d => {
            d.value = Number(d.value)
        })

        boot = d3.stratify().id(d => d.children).parentId(d => d.name)(data);
        svg = chart(boot)
        const canvas = d3.select('#canva').node().appendChild(svg);

        // svg = Sunburst(boot, {
        //   // value: d => d.value, // size of each node (file); null for internal nodes (folders)
        //   label: d => d.data.children, // display name for each cell
        //   // title: (d, n) => `${n.ancestors().reverse().map(d => d.data.name).join(".")}\n${n.value.toLocaleString("en")}`, // hover text
        //   width: 950,
        //   height: 950,
        //   padding: 10
        // })

        // d3.select('.canva').append(function(){return svg.node();});
    })
    .catch(error => {
        console.error(error);
    });


//   // Copyright 2021 Observable, Inc.
// // Released under the ISC license.
// // https://observablehq.com/@d3.sunburst
function chart(data) {

    const root = partition(data);

    root.each(d => d.current = d);

    color = d3.scaleOrdinal(d3.quantize(d3.interpolateReds, data.children.length + 1))

    const format = d3.format(",d")

    const width = 300

    const radius = width / 14

    arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

    const svg = d3.create("svg")
        .attr("viewBox", [50, 80, width, width])
        .style("font", "1.2px sans-serif");

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);

    const path = g.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", d => {
            while (d.depth > 1) d = d.parent;
            return color(d.data.data.children);
        })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("d", d => arc(d.current)).attr('stroke', 'black')
        .attr('stroke-width', '0.1px')
        .on('mouseover', function (event, i) {
            tooltip.transition().duration(200).style("opacity", 0.9);
            tooltip.html("<p>Name: " + i.data.id + "</p>").style("left", (event.pageX - 120) + "px").style("top", (event.pageY - 120) + "px");
        }).on('mouseout', function (event, i) {
            tooltip.transition().duration(200).style("opacity", 0);

        });

    path.filter(d => d.data.data.children)
        .style("cursor", "pointer")
        .on("click", clicked);

    // path.append("title")
    // .text(d => `${d.ancestors().map(d => d.data.data.children).reverse().join("/")}\n${format(d.value)}`)


    const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .text(d => {
            // console.log(d);
            // console.log('yo',d.data.data.name)
            return d.data.data.children
        });

    const parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

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
        if(userSelected in BC){
            console.log("Selected region " + userSelected)
            localStorage.setItem("view1_region", p.data.id);
        }else if(userSelected !== "BC"){
            // selected item is a station
            console.log("Selected station " + userSelected)
            localStorage.setItem("view1_station", p.data.id);
            window.location.href="view2.html";
        }
    }

    function transitions(event, p) {


        parent.datum(p.parent || root);

        root.each(d => d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
        });

        const t = g.transition().duration(750);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
            .tween("data", d => {

                const i = d3.interpolate(d.current, d.target);
                return t => d.current = i(t);
            })
            .filter(function (d) {
                return +this.getAttribute("fill-opacity") || arcVisible(d.target);
            })
            .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attrTween("d", d => () => arc(d.current));


        label.filter(function (d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
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
        const y = (d.y0 + d.y1) / 2 * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    return svg.node();
}

partition = data => {

    const root = d3.hierarchy(data)
        .sum(d => {

            return d.data.value
        })
        .sort((a, b) => b.data.value - a.data.value);

    return d3.partition()
        .size([2 * Math.PI, root.height + 1])
        (root);
}


