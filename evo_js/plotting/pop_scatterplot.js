// Create a plotter for population based methods.  Scatterplot displays the maximum and
// average fitnesses of a population by generation.
//
// Input data is assumed to have the following format:
// [[gen,max_fitness,0],[gen,avg_fitness,1]]

var D3_Plotter = D3_Plotter || new function() {
    var fitness_data = [];
    var colors = [d3.rgb(255,0,0),d3.rgb(0,255,0)]
    var xScale, yScale, yAxis, xAxis, svg;

    // Create the scatterplot object which tracks population fitness.
    this.generationalScatterplot = function() {
        var w = 500;
        var h = 300;
        var padding = 30;

        //Create scale functions
        xScale = d3.scale.linear()
                             .domain([0, d3.max(fitness_data, function(d) { return d[0]; })])
                             .range([padding, w - padding * 2]);

        yScale = d3.scale.linear()
                             .domain([0, d3.max(fitness_data, function(d) { return d[1]; })])
                             .range([h - padding, padding]);

        //Define X axis
        xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient("bottom")
                          .ticks(5);

        //Define Y axis
        yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient("left")
                          .ticks(5); 

        //Create SVG element
        svg = d3.select("div.scatterplot")
                    .append("svg")
                    .attr("width", w)
                    .attr("height", h);

        //Create circles
        svg.selectAll("circle")
           .data(fitness_data)
           .enter()
           .append("circle")
           .attr("cx", function(d) {
                return xScale(d[0]);
           })
           .attr("cy", function(d) {
                return yScale(d[1]);
           })
           .attr("r", 2)
           .attr("fill", function(d) {
           		return colors[d[2]];
           });

        //Create X axis
        svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + (h - padding) + ")")
                .call(xAxis)
            .append("text")
                .attr("class", "label")
                .attr("x", w)
                .attr("y", 0)
                .style("text-anchor", "end")
                .text("Generation");

        //Create Y axis
        svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + padding + ",0)")
                .call(yAxis)
            .append("text")
                .attr("class", "label")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Fitness");

        // draw legend
        var legend = svg.selectAll(".legend")
        	.data([['max',colors[0]],['avg',colors[1]]])
        	.enter().append("g")
        	.attr("class", "legend")
        	.attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

		// draw legend colored rectangles
		legend.append("rect")
		.attr("x", w - 18)
		.attr("width", 18)
		.attr("height", 18)
		.style("fill", function(d) { return d[1]; });

		// draw legend text
		legend.append("text")
		.attr("x", w - 24)
		.attr("y", 9)
		.attr("dy", ".35em")
		.style("text-anchor", "end")
		.text(function(d) { return d[0];})
    }

    // Update function to add new data to the scatterplot.
    //
    // Input data is assumed to have the following format:
	// [[gen,max_fitness,0],[gen,avg_fitness,1]
    this.updateGenerationalScatterplot = function(new_data) {
        fitness_data.push(new_data[0]);
        fitness_data.push(new_data[1]);

        //Update scale domains
        xScale.domain([0, d3.max(fitness_data, function(d) { return Math.ceil((d[0]+1)/10)*10; })]);
        yScale.domain([0, d3.max(fitness_data, function(d) { return d[1]; })]);

        //Update all circles
        svg.selectAll("circle")
           .data(fitness_data)
           .transition()
           .duration(100)
           .attr("cx", function(d) {
                return xScale(d[0]);
           })
           .attr("cy", function(d) {
                return yScale(d[1]);
           })
           .attr("fill", function(d) {
           		return colors[d[2]];
           });

        //Enter new circles
        svg.selectAll("circle")
            .data(fitness_data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return xScale(d[0]);
            })
            .attr("cy", function(d) {
                return yScale(d[1]);
            })
            .attr("r", 2)
           .attr("fill", function(d) {
           		return colors[d[2]];
           });

        // Remove old
        svg.selectAll("circle")
            .data(fitness_data)
            .exit()
            .remove();

        // Update the axes
        //Define X axis
        xAxis = d3.svg.axis()
                          .scale(xScale)
                          .orient("bottom")
                          .ticks(5);

        //Define Y axis
        yAxis = d3.svg.axis()
                          .scale(yScale)
                          .orient("left")
                          .ticks(5); 

        svg.selectAll('.x.axis')
            .call(xAxis);
        svg.selectAll('.y.axis')
            .call(yAxis);            
    }
};