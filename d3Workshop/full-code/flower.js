/**
 * Constructor function for a Visualization that displays data as "flowers"
 * @param data (not required) the data array to visualize
 * @constructor
 */
var FlowerVis = function(data){
    this.data = data;
    this.width;
    this.height;
    this.svgContainer;

    this.FLOWER_WIDTH = 150;    // width for each flower in the visualization
    this.FLOWER_HEIGHT = 200;   // height for each flower in the visualization
    this.flowers; // groups of svg containing svg shapes that form a "flower"

    /**
     * Function that creates all of the small multiple flowers in the visualization
     */
    this.createFlowers = function(){
        let _this = this;               // save the context of the visualization object
        let max_num_of_items = 8;      // max number of items on the x-axis

        // create an SVG:g element per item in our dataset that will group
        // the shapes that will form our flower
        this.flowers = this.svgContainer.selectAll("g")
            // .data([this.data[0]])
            .data(this.data)
            .enter()
            .append("g")
            .attr("class", "flower_group")
            .attr("width", this.FLOWER_WIDTH)
            .attr("height", this.FLOWER_HEIGHT)
            .attr("transform", function(d, i){
                let new_i = i + 1;
                let x_padding = new_i % max_num_of_items === 0 ? max_num_of_items : new_i % max_num_of_items,
                    y_padding = i >= max_num_of_items ? 1 + Math.floor(i/max_num_of_items) : 1;

                let x_translate = d3.select(this).attr("width") * (x_padding - 1),
                    y_translate = d3.select(this).attr("height") * (y_padding - 1);

                d3.select(this)
                    .attr("transform_origin_x", x_translate)
                    .attr("transform_origin_y", y_translate);

                return `translate(${x_translate}, ${y_translate})`;
            });

        // Add the petals to our flower
        this.addPetal(0, "Life satisfaction", 10, "gold", "orange");
        this.addPetal(45, "Life expectancy", 100, "paleturquoise", "mediumturquoise");
        this.addPetal(90, "Water quality", 100, "lightskyblue", "deepskyblue");
        this.addPetal(135, "Years in education", 20, "plum", "orchid");
        this.addPetal(225, "Feeling safe walking alone at night", 100, "tomato", "firebrick");
        this.addPetal(270, "Employment rate", 100, "orange", "darkorange");
        this.addPetal(315, "Student skills", 600, "peachpuff", "lightsalmon");

        // Add our stem
        this.flowers.append("line")
            .attr("x1", _this.FLOWER_WIDTH/2)
            .attr("y1", _this.FLOWER_HEIGHT/2)
            .attr("x2", _this.FLOWER_WIDTH/2)
            .attr("y2", _this.FLOWER_HEIGHT)
            .style("stroke-width", 8)
            .style("stroke", "yellowgreen")
            .style("opacity", 0)
            .transition()
            .style("opacity", 1);

        this.flowers.append("text")
            .attr("y", _this.FLOWER_WIDTH/2)
            .attr("x", _this.FLOWER_HEIGHT/2)
            .attr("transform", `translate(${_this.FLOWER_WIDTH},
                    15),rotate(90)`)
            .style("text-anchor", "start")
            .style("dominant-baseline", "central")
            .style("font-size", "10px")
            .style("text-transform", "uppercase")
            .text(function(d){
                return d["Country"];
            });

        // Add our flower head
        let flower_head = this.flowers.append("circle")
            .style("fill", "tomato")
            .attr("cx", this.FLOWER_WIDTH/2)
            .attr("cy", this.FLOWER_HEIGHT/2);

        flower_head
            .append("svg:title")
            .text(function(d){
                return d["Country"];
            });

        flower_head
            .attr("r", 0)
            .transition()
            .attr("r", 10);
    };

    /**
     * Function that adds a petal to a flower group. The petal's length is based off a data, accessed through a given
     * property selector
     * @param rotation_angle (number, degree) the angle of rotation for the petal
     * @param selector (string) the property of the data which will determine
     * @param max_val (number) the maximum value the data domain has (used for scaling values to screen pixels)
     * @param fill (colour string) the colour of the petal
     * @param stroke (colour string) the colour of the stroke outlining the petal on hover
     */
    this.addPetal = function(rotation_angle, selector, max_val, fill, stroke){
        let _this = this;   // save the context of the visualization

        // create a group that will contain the SVG:path for our petal
        let petal_group = this.flowers.append("g")
            .attr("transform", `rotate(${rotation_angle}, ${_this.FLOWER_WIDTH/2}, ${_this.FLOWER_HEIGHT/2})`);

        // Add a path into the group using a Quadratic Bezier curve definition
        // recall the quadratic curve definition: Mx y, Q cx cy, dx dy
        // where x and y are the coords of the point of origin, cx and cy is the control point,
        // and dx dy is the next point (this can be followed up by another control point and next point ...
        let petal = petal_group.append("path")
            .attr("class", "flower_petal")
            .attr("selector", selector)
            .attr("d", function(d){
                let origin = {x : _this.FLOWER_WIDTH/2, y : _this.FLOWER_HEIGHT/2};
                let scale = d3.scaleLinear()
                    .domain([0, max_val])
                    .range([0, _this.FLOWER_HEIGHT/2]);
                let top = {x : origin.x, y : origin.y - scale(d[selector])};
                let ctrl1 = {x : origin.x - (origin.x/4), y: top.y + ((_this.FLOWER_HEIGHT/2-top.y)/2)};
                let ctrl2 = {x : origin.x + (origin.x/4), y: top.y + ((_this.FLOWER_HEIGHT/2-top.y)/2)};
                let path = `M${origin.x} ${origin.y} Q ${ctrl1.x} ${ctrl1.y}, ${top.x} ${top.y} 
                        Q ${ctrl2.x} ${ctrl2.y}, ${origin.x} ${origin.y} Z`;
                return path;
            })
            .style("opacity", 0)
            .style("fill", fill);

        petal
            .transition()
            .style("opacity", 1)
            .duration(800);

        petal
            .append("svg:title")
            .text(function(d){
                return `${selector}: ${d[selector]}`;
            });
    }
};