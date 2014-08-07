'use strict';

// Equality test from:
// http://stackoverflow.com/a/7837725/480685
function arraysIdentical(a, b) {
    var i = a.length;
    if (i != b.length) return false;
    while (i--) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};

function generational_ga() {

	var self = this;

	// Currently Simulated Individual
	var cur_genome = [];
	var cur_fitness; 

	// Historical Tracking
	var best_genome = []; 
	var best_genomes = [];
	var best_fitness = ""; 

	// Generational Information
	var cur_iteration = 0;
	var generation = 0;
	var population = [];
	var fitnesses = [];

	var Robot;
	var RobotGenome;

	// Initialize the generational ga.
	this.init = function(ga_params, robot, robot_genome) {

		console.log(ga_params);

		// Configure the GA parameters.
		this.param_pop_size = ga_params.pop_size ? ga_params.pop_size : 4;

		this.param_crossover_perc = ga_params.crossover_perc ? ga_params.crossover_perc : 0.05;
		this.param_mutation_perc  = ga_params.mutation_perc ? ga_params.mutation_perc : 0.25;
		this.param_tourn_size     = ga_params.tournament_size ? ga_params.tournament_size : 2;

		this.param_crossover_method = ga_params.crossover_method ? ga_params.crossover_method :'single';
		this.param_selection_method = ga_params.selection_method ? ga_params.selection_method :'tournament';
		this.param_mutation_type = ga_params.mutation_type ? ga_params.mutation_type :'random';

		// Link the chosen robot to the callbacks here.
		Robot = robot;
		RobotGenome = robot_genome;

		// Initialize the population.
		for (var i = 0; i < this.param_pop_size; ++i) {
			var new_ind = new RobotGenome();
			new_ind.initGenome();
			population.push(new_ind);
		}

		// Get the current genome to evaluate.
		cur_genome = population[0].getGenome();

		// Initialize the simulation environment.
		Simulator.initScene("container", Robot);

		// Launch the simulation environment.
		Simulator.launchSimulation(cur_genome);
	};

	// Return the current genome (recovering from validation).
	this.getGenome = function() {
		return cur_genome;
	};

	// Return the selected genome from the best.
	this.getBestGenomeFromIteration = function () {
		return best_genomes[validate_clicked_index];
	};

	// Return the current best genome for validation.
	this.getBestGenome = function() {
		return best_genome;
	};

	// Request a fitness value for a given position.
	this.requestFitness = function(x,y,z) {
		return fit_func(x,y,z);
	};

	// Request the best fitness value.
	this.requestBestFitness = function() {
		return best_fitness;
	};

	// Generate a new candidate individual.
	this.newRobot = function (x,y,z) {
		cur_fitness = fit_func(x,y,z);
		fitnesses.push(cur_fitness);

		// Update the iteration number.
		cur_iteration += 1;

		// Generational Logic
		if (cur_iteration >= this.param_pop_size) {
			// Select the best individual from the generation.
			var max_fitness = Math.max.apply(Math, fitnesses);
			var max_fitness_index = fitnesses.indexOf(max_fitness);
			
			best_fitness = best_fitness > max_fitness ? best_fitness : max_fitness;
			best_genomes.push(population[max_fitness_index].getGenome());

			var new_population = [];

			// Create the new population.
			for(var i=0; i < this.param_pop_size; ++i) {
				var new_ind;

				// Perform Crossover
				if(Math.random() < this.param_crossover_perc) {
					new_ind = new RobotGenome();
					new_ind.setGenome(Crossover());
				} else {
					new_ind = new RobotGenome();
					new_ind.setGenome(population[Selection()].getGenome().slice());
				}

				// Perform Mutation
				new_ind.mutateGenome(this.param_mutation_type,this.param_mutation_perc);

				new_population.push(new_ind);
			}

			// Update the plots with the fitnesses.
			DataInterface.updateGenerationalScatterplot(parseInt(document.getElementById("individual-generation").innerHTML), fitnesses);

			// Send the best individual to the table.
			DataInterface.updateFitnessTable(parseInt(document.getElementById("individual-generation").innerHTML),max_fitness,best_genomes[best_genomes.length-1]);

			population = new_population;
			fitnesses = [];
			cur_iteration = 0;

			// Update the generation.
			document.getElementById("individual-generation").innerHTML = parseInt(document.getElementById("individual-generation").innerHTML) + 1;
		}

		// Update the individual counter.
	    DataInterface.iterationUpdate(cur_iteration);

	    // Update the population scatterplot.
	    DataInterface.updatePopulationScatterplot(cur_iteration, fitnesses.length >= 1 ? fitnesses[fitnesses.length-1] : false);

		// if (best_fitness === "") {
		// 	add_best_individual();
		// } else if (cur_fitness > best_fitness && !arraysIdentical(best_genome,genome)) {
		// 	add_best_individual();
		// 	genome = best_genome.slice();
		// } else {
		// 	genome = best_genome.slice();
		// }

		return population[cur_iteration].getGenome().slice();
	};

	// Euclidean Distance fitness function for the robot.
	var fit_func = function(x,y,z) {
		return -x;
		// return Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(z,2));
	};

	// Add a best individual to the list and setup the HTML accordingly.
	var add_best_individual = function() {
		best_genome = genome.slice();
		best_genomes.push(best_genome);
		best_fitness = cur_fitness;
		// DataInterface.fitnessUpdate(iteration, best_genomes.length-1, best_fitness);
		// D3_FitnessTable.updateTable([iteration,best_fitness.toFixed(4)].concat(best_genome), best_genomes.length-1);	
	} 

	var Crossover = function() {
		var new_genome;

		if (self.param_crossover_method == 'double') {
			new_genome = TwoPointCrossover();
		} else if (self.param_crossover_method == 'random') {
			new_genome = RandomCrossover();
		} else {
			new_genome = SinglePointCrossover();
		}

		return new_genome;
	};

	// Select two individuals from the population and cross them over randomly.
	var RandomCrossover = function() {
		if (self.param_pop_size == 1) {
			return population[0];
		}

		// Select the two parents.
		var par1, par2;
		par1 = Selection();
		par2 = Selection();
		while (par1 == par2) {
			par2 = Selection();
		}

		par1 = population[par1[0]].getGenome().slice();
		par2 = population[par2[0]].getGenome().slice();

		var new_genome = [];

		for (var i = 0; i < par1.length; ++i) {
			if (Math.random() < 0.5) {
				new_genome.push(par1[i]);
			} else {
				new_genome.push(par2[i]);
			}
		}		

		return new_genome;
	}

	// Select two individuals from the population and cross them over.
	var SinglePointCrossover = function() {
		if (self.param_pop_size == 1) {
			return population[0];
		}
		// Select the two parents.
		var par1, par2;
		par1 = Selection();
		par2 = Selection();
		while (par1 == par2) {
			par2 = Selection();
		}

		// Crossover the genomes.
		var crossover_pos = 1+Math.floor(Math.random()*(population[0].getGenome().length-2));

		par1 = population[par1[0]].getGenome().slice();
		par2 = population[par2[0]].getGenome().slice();

		return (par1.slice(0,crossover_pos)).concat(par2.slice(crossover_pos,par2.length));

	}

	// Select two individuals from the population and cross them over with two-point crossover.
	var TwoPointCrossover = function() {
		if (self.param_pop_size == 1) {
			return population[0];
		}
		// Select the two parents.
		var par1, par2;
		par1 = Selection();
		par2 = Selection();
		while (par1 == par2) {
			par2 = Selection();
		}

		// Crossover the genomes.
		var crossover_pos_1 = 1+Math.floor(Math.random()*(population[0].getGenome().length-3));
		var crossover_pos_2 = crossover_pos_1+1+Math.floor(Math.random()*(population[0].getGenome().length-1-crossover_pos_1));

		par1 = population[par1[0]].getGenome().slice();
		par2 = population[par2[0]].getGenome().slice();

		var new_genome = (par1.slice(0,crossover_pos_1)).concat(par2.slice(crossover_pos_1,crossover_pos_2));
		new_genome = new_genome.concat(par1.slice(crossover_pos_2,par1.length));

		return new_genome;

	}

	var Selection = function() {
		var sel_ind;

		if (self.param_selection_method == 'random') {
			sel_ind = RandomSelection();
		} else if (self.param_selection_method == 'roulette') {
			sel_ind = RouletteWheelSelection();
		} else {
			sel_ind = TournamentSelection();
		}

		return sel_ind;
	};

	// Select an individual from the population randomly.
	var RandomSelection = function() {
		return Math.floor(Math.random()*population.length);
	}

	// Select an individual from the population based on roulette wheel selection.
	var RouletteWheelSelection = function() {
		for (var i = 0, total_fitness = 0; i < fitnesses.length; total_fitness += fitnesses[i++]);

		// Calculate the roulette wheel for the various fitnesses.
		var fit_portion = new Array(fitnesses.length);

		for (var i = 0; i < fit_portion.length; fit_portion[i] = fitnesses[i++]/total_fitness);

		// Selection the individual.
		var index = 0;
		var random_prob = Math.random();
		var running_prob = 0;

		while(running_prob < random_prob) {
			running_prob += fit_portion[index++];
		}

		return index - 1;
	}

	// Select an individual from the population through a tournament.
	var TournamentSelection = function() {
		if (self.param_pop_size == 1) {
			return Math.floor(Math.random()*population.length);
		}

		// Create a list of indices to select from.
		var indices = [];
		for (var i = 0; i < self.param_pop_size; ++i) {
			indices.push(i);
		}

		// Get a subset of individuals from the population to compare.
		var sel_indicies = [];
		for (var i = 0; i < self.param_tourn_size; ++i) {
			sel_indicies.push(indices.splice(Math.floor(Math.random()*indices.length),1));
		}

		// Find the maximum fitness individual.
		var max_fitness = fitnesses[sel_indicies[0]];
		var max_index = sel_indicies[0];
		for (var i = 1; i < self.param_tourn_size; ++i) {
			if (fitnesses[sel_indicies[i]] > max_fitness) {
				max_fitness = fitnesses[sel_indicies];
				max_index = sel_indicies[i];
			}
		}

		return max_index;
	}
}