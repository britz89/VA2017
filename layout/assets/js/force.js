var width = 960,
    height = 500;

var color = d3.scale.category20();

var force = d3.layout.force()
	.charge(-150)
	.linkDistance(30)
	.size([width, height]);

var svg = d3.select("#viz").append("svg")
	.attr("width", width)
	.attr("height", height);

d3.json("assets/data/miserables.json", function(error, graph) {
	if (error) throw error;

	force
		.nodes(graph.nodes)
		.gravity(0.1)
		.links(graph.links)
		.start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.group); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
  
  
  var radius = d3.scale.sqrt()
  	.range([5,15])
  .domain([1,36]);
  
  force.on("end", function(){
	  node.attr("r", function(d){return radius(d.weight);});
  })
});