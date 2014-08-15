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

	this.updateGenerationalScatterplot = function(generation, fitnesses) {
		D3_Plotter.updateGenerationalScatterplot([
			[generation,Math.max.apply(null,fitnesses),0],
			[generation,fitnesses.reduce(function(sum, a) { return sum + a },0)/(fitnesses.length!=0?fitnesses.length:1),1]
			]);
	}

	this.updatePopulationBarchart = function(cur_iteration,new_fitness,old_fitness) {
		D3_Barchart.updatePopulationBarchart(
			new_fitness ? [[cur_iteration,new_fitness,0]] : false, old_fitness ? [[cur_iteration,old_fitness,0]] : null
			);
	}

	this.clearPopulationBarchart = function() {
		D3_Barchart.clearPopulationBarchart();
	}

	this.updatePopSize = function(new_pop_size) {
		D3_Barchart.updatePopSize(new_pop_size);
	}

	this.iterationUpdate = function(iteration) {
		document.getElementById("individual-individual").innerHTML = iteration;
	}

	this.updateFitnessTable = function(generation,fitness,genome) {
		var data_packet = [{val:generation,visible:true}, {val:fitness,visible:true}];

		for(var i = 0; i < genome.length;++i) {
			data_packet.push({val:genome[i],visible:false});
		}

		D3_FitnessTable.updateTable(data_packet);
	}
}