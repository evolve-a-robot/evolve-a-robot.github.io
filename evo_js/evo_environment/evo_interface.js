// Interface to link web front-end to the evolutionary run.

'use strict';

function evo_interface() {

	// Environmental Parameters
	var environ_type = 'flat';

	var environ_spheres = {
		spacing:  4.0,
		max_size: 2.0,
		rows:     40,
		cols:     40
	};

	var environ_logs = {
		spacing:    4,
		max_height: 4.0,
		number:     40,
		width:      320
	}
	
	var environ_steps = {
		number:   40,
		max_rise: 10.0,
		max_run:  2.0
	}

	this.initEvolutionEnv = function(params) {
		this.Robot = new car();
		this.RobotGenome = car_genome;

		// Setup the chosen environment.
		if (params.environment_type == "logs") {
			this.Environment = new prism_environment();
			this.Environment.init(environ_logs);
		} else if (params.environment_type == "spheres") {
			this.Environment = new sphere_environment();
			this.Environment.init(environ_spheres);
		} else if (params.environment_type == "stairs") {
			this.Environment = new hill_climb_environment();
			this.Environment.init(environ_steps);
		} else {
			this.Environment = new flat_plain_environment();
		}

		this.GA = new generational_ga();
		this.GA.init(params.ga_params,this.Robot,this.RobotGenome);

		document.getElementById("pop_slider").onchange = popsizeChange;
	    document.getElementById("sel-change-radio").onchange=selChange;
	    document.getElementById("tourn_slider").onchange=tournChange;
	    document.getElementById("mut-change-radio").onchange=mutChange;
	    document.getElementById("mut_slider").onchange=mutationRateChange;
	    document.getElementById("cx-change-radio").onchange=cxChange;
	    document.getElementById("crossover_slider").onchange=crossoverRateChange;

	    document.getElementById("individual-generation").innerHTML = 0;
	    document.getElementById("individual-individual").innerHTML = 0;

	    // Initialize the plotting div.
	    D3_Plotter.scatterplot();
	}

	// Adjust the population size.
	this.changePopulationSize = function(pop_size) {
		this.GA.param_pop_size = pop_size;
	}

	// Adjust the crossover percentage.
	this.changeCrossoverPerc = function(crossover_perc) {
		this.GA.param_crossover_perc = crossover_perc;
	}

	// Adjust the mutation percentage.
	this.changeMutationPerc = function(mutation_perc) {
		this.GA.param_mutation_perc = mutation_perc;
	}

	// Adjust the tournament size.
	this.changeTournamentSize = function(tournament_size) {
		this.GA.param_tourn_size = tournament_size;
	}

	// Change the crossover_method: 
	// Options: 'single','double'
	this.changeCrossoverMethod = function(crossover_method) {
		this.GA.param_crossover_method = crossover_method;
	}

	// Change the selection method:
	// Options: 'tournament','random'
	this.changeSelectionMethod = function(selection_method) {
		this.GA.param_selection_method = selection_method;
	}

	// Change the mutation method.
	// Options: 'random','gaussian'
	this.changeMutationMethod = function(mutation_method) {
		this.GA.param_mutation_type = mutation_method;
	}

}