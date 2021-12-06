function chart(data, name, gasName, colour) {

    // parse time based on date format
    var parseTime = d3.timeParse("%Y-%m-%d"),
        formatDate = d3.timeFormat("%b %d, %Y"),
        passDateToView3 = d3.timeFormat("%d/%m/%Y"), //day/month/year
        bisectDate = d3.bisector(d => d.date).left;

    data.forEach(function (d) {
        d.date = parseTime(d.date);
        return d;
    })

    var svgElement = d3.select("#" + name),
        margin = {top: 25, right: 35, bottom: 25, left: 60},
        width = +svgElement.attr("width") - margin.left - margin.right,
        height = +svgElement.attr("height") - margin.top - margin.bottom;

    var xAxis = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain(d3.extent(data, d => d.date))

    var yAxis = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);

    var lineColour = d3.scaleOrdinal().range([colour])

    var line = d3.line()
        .curve(d3.curveBasis)
        .x(d => xAxis(d.date))
        .y(d => yAxis(d.amount))

    svgElement.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xAxis).tickFormat(d3.timeFormat("%b")));

    svgElement.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + margin.left + ",0)");

    // text label for the x axis
    svgElement.append("text")
        .attr("transform", "translate(" + (width/2) + " ," + (height + margin.top - 17) + ")")
        .style("text-anchor", "middle")
        .text("Date (Jan 2019 - Dec 2020)");

    // text label for the y axis
    svgElement.append("text")
        .attr("transform", "translate(" + 22 + "," + (height / 2) + ")rotate(-90)")
        .attr("text-anchor", "middle")
        .text("Amount of Gas Emitted (ppb)");

    // text label for the title
    svgElement.append("text")
        .attr("x", width/10)
        .attr("y", -height/2 + margin.top + margin.bottom + 100)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", colour)
        .text(gasName);

    var hover = svgElement.append("g")
        .attr("class", "hover")
        .style("display", "none");

    hover.append("line").attr("class", "lineHover")
        .style("stroke", "#999")
        .attr("stroke-width", 1)
        .style("shape-rendering", "crispEdges")
        .style("opacity", 0.5)
        .attr("y1", -height)
        .attr("y2", 0);

    hover.append("text").attr("class", "lineHoverDate")
        .attr("text-anchor", "middle")
        .attr("font-size", 12);

    var interaction = svgElement.append("rect")
        .attr("class", "interaction")
        .attr("x", margin.left)
        .attr("width", width - margin.right - margin.left)
        .attr("height", height)

    let columns = data.columns
    for (d of data) {
        for (var i = 1, n = columns.length, c; i < n; ++i)
            d[c = columns[i]] = +d[c];
    }

    var gasMapped = columns.slice(1).map(function (id) {
        return {
            id: id,
            gas: data.map(function (d) {
                return {
                    date: d.date,
                    amount: d[id]
                };
            })
        };
    });

    yAxis.domain([
        d3.min(gasMapped, d => d3.min(d.gas, c => c.amount)),
        d3.max(gasMapped, d => d3.max(d.gas, c => c.amount))
    ]);

    svgElement.selectAll(".y-axis").transition()
        .call(d3.axisLeft(yAxis).tickSize(-width + margin.right + margin.left))

    var gasData = svgElement.selectAll(".gasMapped")
        .data(gasMapped);

    gasData.enter().insert("g", ".hover").append("path")
        .attr("class", "line gasMapped")
        .style("stroke", d => lineColour(d.id))
        .merge(gasData)
        .attr("d", d => line(d.gas))

    svgElement.selectAll(".interaction")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("mousemove", handleMouseMove)
        .on("click", handleMouseClick);

    function handleMouseOver() {
        hover.style("display", null);
    }

    function handleMouseOut() {
        hover.style("display", "none");
    }

    function handleMouseMove() {
        var x0 = xAxis.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        hover.select(".lineHover")
            .attr("transform", "translate(" + xAxis(d.date) + "," + height + ")");

        hover.select(".lineHoverDate")
            .attr("transform", "translate(" + xAxis(d.date) + "," + (height + margin.bottom) + ")")
            .text(formatDate(d.date));

    }

    function handleMouseClick() {
        var x0 = xAxis.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        console.log(passDateToView3(d.date))
        localStorage.setItem("view2_date", passDateToView3(d.date));
        window.location.href = "view3.html";

    }
}