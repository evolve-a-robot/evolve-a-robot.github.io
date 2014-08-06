'use strict';

var DataInterface = DataInterface || new function() {
	this.fitnessUpdate = function(iteration, index, fitness_value) {
		if (index % 2 == 0) {
			document.getElementById('fitness_log').innerHTML += "<span class='best_ind even_best' data-gind='"+
																index+"'>"+
																iteration+": "+fitness_value.toFixed(2)+"</span>";//<br>"; 
		} else {
			document.getElementById('fitness_log').innerHTML += "<span class='best_ind odd_best' data-gind='"+
																index+"'>"+
																iteration+": "+fitness_value.toFixed(2)+"</span>";//<br>"; 
		}
	}

	this.updateScatterplot = function(generation, fitnesses) {
		D3_Plotter.updateScatterplot([
			[generation,Math.max.apply(null,fitnesses),0],
			[generation,fitnesses.reduce(function(sum, a) { return sum + a },0)/(fitnesses.length!=0?fitnesses.length:1),1]
			]);
	}

	this.iterationUpdate = function(iteration) {
		document.getElementById('iteration_number').innerHTML = iteration; 
	}
}