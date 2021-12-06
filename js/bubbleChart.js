const date = localStorage.getItem("view2_date");

// 2020-01-01
const station = localStorage.getItem("view1_station");
const region = localStorage.getItem("view1_region");
      console.log(date,'FROM VIEW 3');
      console.log(station,'FROM VIEW 3');
      console.log(region,'FROM VIEW 3');
      var width = 900, height = 900, sizeDivisor = 900, nodePadding = 2.5;

      var svg = d3.select(".bubble")
          .append("svg")
          .attr("width", width)
          .attr("height", height);
  
      var color = d3.scaleOrdinal()
        .domain(['CO','NO2','O3','NOx','SO2','NO']) 
        .range(["#fc8d62", "#8da0cb","#66c2a5",'red','green','yellow']);
  
    //   var cxx = d3.scaleOrdinal().domain(['CO','NO2','O3','NOx','SO2','NO']).range([50,200,300,400,500,600])
  
      var simulation = d3.forceSimulation()
            .force("x", d3.forceX().strength(.1).x(width * .5))
            .force("y", d3.forceY().strength(.1).y(height * .5))
            .force("center", d3.forceCenter().x(width * .5).y(height * .5))
            .force("charge", d3.forceManyBody().strength(-15));
  
      var tooltip = d3.select(".canva")
        .append("div").attr("class","tooltip").style("opacity",0);
  
  d3.csv('data/view3.csv')


      .then(data => {
        
        data = data.filter(function(d,i){
                
            return (d.REGION == region && d.STATION_NAME==station && d.DATE == date);
            // return d.REGION == region;
        })
          data.forEach(d=>{
            
            d.ROUNDED_VALUE = Number(d.ROUNDED_VALUE);
            
            })
            

            console.log(data)
          
          const x= d3.scaleLinear().domain([0,d3.max(data,d=>d.ROUNDED_VALUE)]).range([0,200]);
            console.log(d3.max(data,d=>d.ROUNDED_VALUE)/10);
          data = data.sort(function(a,b){ return b.size - a.size; });
          simulation
          .nodes(data)
          .force("collide", d3.forceCollide().strength(.5).radius(function(d){ 
            
            if (d.PARAMETER=="CO"){
              return x(d.ROUNDED_VALUE)/2 + nodePadding; 
            }else{
              return x(d.ROUNDED_VALUE) + nodePadding; 
            }
  
            }).iterations(1))
          .on("tick", function(d){
            node
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
          });
  
          var node = svg.append("g")
            .attr("class", "node").selectAll("circle")
          .data(data)
          .enter().append("circle")
            .attr("stroke", "black")
            .style("stroke-width", 1)
            .attr("fill", function(d) { return color(d.PARAMETER); })
            .attr("cx", d=> { return d.x} )
            .attr("cy", d=> d.y)
            .attr("r", function(d,i,n) { 
              
              if (d.PARAMETER=="CO"){
                return x(d.ROUNDED_VALUE)/2;
              }else{
                return x(d.ROUNDED_VALUE);
              }
               });
  
            node.call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)).on('mouseover',function(event,i){
                  tooltip.transition().duration(200).style("opacity",0.9);
                  tooltip.html("<p>Gas: "+i.PARAMETER+"</p> <p>Hour: "+i.TIME+"</p> <p>Emitted Value (ppb): "+i.ROUNDED_VALUE+ "</p>").style("left",event.pageX+"px").style("top",event.pageY+"px");
  
                }).on('mouseout', function(event,i){
                  tooltip.transition().duration(200).style("opacity",0);
                  
                });
          })
          .catch(error => {
            console.error(error);
          });
  
      function dragstarted(event,d) {
        if (!d3.active) simulation.alphaTarget(.03).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
  
      function dragged(event,d) {
        d.fx = event.x;
        d.fy = event.y;
      }
  
      function dragended(event,d) {
        if (!event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
      }
  