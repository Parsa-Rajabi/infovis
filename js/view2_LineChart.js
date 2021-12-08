/*
References and resources used:

https://observablehq.com/@d3/learn-d3-interaction
https://medium.com/@sahilaug/line-graphs-using-d3-drawing-the-axes-8ffc0076a8be
https://medium.com/@sahilaug/line-graphs-using-d3-plotting-the-line-306b9cabf15e#.e30ytr7fy
https://www.d3-graph-gallery.com/graph/custom_axis.html
https://www.d3-graph-gallery.com/graph/line_basic.html
https://bl.ocks.org/d3noob/e5daff57a04c2639125e
https://bl.ocks.org/mbostock/3883245

*/
function chart(data, name, gasName, colour) {

    // create an SVG with a unique id
    var svgElement = d3.select("#" + name)

    // set margin, width and height
    var margin = {top: 25, right: 35, bottom: 25, left: 60}
    var width = +window.innerWidth - margin.left - margin.right
    var height = +svgElement.attr("height") - margin.top - margin.bottom;

    // parse time based on date format
    var parseTime = d3.timeParse("%Y-%m-%d"),
        formatDate = d3.timeFormat("%A, %b %d, %Y"),
        passDateToView3 = d3.timeFormat("%Y-%m-%d"), //day/month/year
        bisectDate = d3.bisector(d => d.date).left;

    // reformat the input date based on Year-Month-Day
    data.forEach(function (d) {
        d.date = parseTime(d.date);
        return d;
    })

    // create x axis based on width, set domain to date from data
    var xAxis = d3.scaleTime()
        .rangeRound([margin.left, width - margin.right])
        .domain(d3.extent(data, d => d.date))

    // create y axis based on height
    var yAxis = d3.scaleLinear()
        .rangeRound([height - margin.bottom, margin.top]);

    // set the colour of the line chart to the given colour passed in
    var lineColour = d3.scaleOrdinal().range([colour])

    // draw each line based on its x/y coordinates
    var line = d3.line()
        .curve(d3.curveBasis)
        .x(d => xAxis(d.date))
        .y(d => yAxis(d.amount))

    // add a class to x-axis, transform and display it on the bottom with a specific format i.e month
    svgElement.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(xAxis).tickFormat(d3.timeFormat("%b")));

    // add a class to x-axis, transform and display it on the left side
    svgElement.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(" + margin.left + ",0)");

    // text label for the x axis
    svgElement.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.top - 17) + ")")
        .attr("font-size", 11)
        .style("text-anchor", "middle")
        .text("Date (Jan 2019 - Dec 2020)");

    // text label for the y axis
    svgElement.append("text")
        .attr("transform", "translate(" + 22 + "," + (height / 2) + ")rotate(-90)")
        .attr("text-anchor", "middle")
        .attr("font-size", 11)
        .text("Amount of Gas Emitted (ppb)");

    // text label for the chart title, set the text and colour based on the parameters
    svgElement.append("text")
        .attr("x", width / 10)
        .attr("y", -height / 2 + margin.top + margin.bottom + 100)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("fill", colour)
        .text(gasName);

    // create a hover element for the date picker
    var datePickerBase = svgElement.append("g")
        .attr("class", "hover")
        .style("display", "none");

    // draw the date picker line
    datePickerBase.append("line")
        .attr("class", "datePicker")
        .style("stroke", "red")
        .attr("stroke-width", 2)
        .style("opacity", 0.5)
        .attr("y1", -height + margin.top)
        .attr("y2", 0);

    // draw the date picker date (text)
    datePickerBase.append("text")
        .attr("class", "datePickerText")
        .attr("text-anchor", "middle")
        .attr("font-size", 15);

    // create the interaction class to handle interactivity
    var interaction = svgElement.append("rect")
        .attr("class", "interaction")
        .attr("x", margin.left)
        .attr("width", width - margin.right - margin.left)
        .attr("height", height)

    // map the data to object with unique ID, gas[date, amount]
    let columns = data.columns
    for (row of data) {
        for (var item = 1, d; item < columns.length; ++item)
            row[d = columns[item]] = +row[d];
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

    // set the domain for y-axis based on the smallest and highest value of gas amount
    yAxis.domain([
        d3.min(gasMapped, d => d3.min(d.gas, c => c.amount)),
        d3.max(gasMapped, d => d3.max(d.gas, c => c.amount))
    ]);

    // set the y-axis to be on the left and draw line increments
    svgElement.selectAll(".y-axis").call(d3.axisLeft(yAxis).tickSize(-width + margin.right + margin.left))

    // add mapped gas data to gasData variable
    var gasData = svgElement.selectAll(".gasMapped").data(gasMapped);

    // draw the lien based on the mapped gas data, set the colour to
    gasData.enter().insert("g", ".hover").append("path")
        .attr("class", "line gasMapped")
        .style("stroke", d => lineColour(d.id))
        .merge(gasData)
        .attr("d", d => line(d.gas))

    // handle mouse interaction on the interaction class
    svgElement.selectAll(".interaction")
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
        .on("mousemove", handleMouseMove)
        .on("click", handleMouseClick);

    // handle when mouse is over element
    function handleMouseOver() {
        // show the dataPickerBase by removing the display none
        datePickerBase.style("display", null);
    }

    // handle when mouse leaves the element
    function handleMouseOut() {
        // hide the dataPickerBase by setting display to none
        datePickerBase.style("display", "none");
    }

    // handle when mouse is moving on the element
    function handleMouseMove() {
        // d3 Bisector
        var x0 = xAxis.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        // show the line on DataPicker from base on the chart to the top (height)
        datePickerBase.select(".datePicker").attr("transform", "translate(" + xAxis(d.date) + "," + height + ")");

        // set the text on dataPicker to be the date
        datePickerBase.select(".datePickerText")
            .attr("transform", "translate(" + xAxis(d.date) + "," + (height + margin.bottom) + ")")
            .text(formatDate(d.date));
    }

    // handle mouse when user clicks on the element
    function handleMouseClick() {
        // d3 Bisector
        var x0 = xAxis.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            d = x0 - d0.date > d1.date - x0 ? d1 : d0;

        // for debugging
        console.log(passDateToView3(d.date))
        // store the date selected by the user in localStorage to be used in view 3
        localStorage.setItem("view2_date", passDateToView3(d.date));
        localStorage.setItem("view2_date_title", formatDate(d.date));
        // redirect user to view 3
        window.location.href = "view3.html";

    }
}
