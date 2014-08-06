function launchButtonClick(e) {

	// Hide the launch button.
	document.getElementById("launch-div").style.display = 'none';
	document.getElementById("container").style.display = 'block';

	// Unhide the Individual Information Window.
	document.getElementById("individual-information").style.display = 'block';

	// Unhide the Population Scatterplot.
	// document.getElementById("scatterplot-div").style.display = 'block';

	var params = {
		ga_params: {
			pop_size: $('#pop_slider').attr('data-slider'),
			selection_method: $('input:radio[name="selmethod"]:checked').val(),
			tourn_size: $('#tourn_slider').attr('data-slider'),
			mutation_type: $('input[name="mutmethod"]:checked').val(),
			mutation_perc: $('#mut_slider').attr('data-slider'),
			crossover_method: $('input[name="cxmethod"]:checked').val(),
			crossover_perc: $('#crossover_slider').attr('data-slider')
		},
		environment_type: document.getElementById('terrain_select').options[document.getElementById('terrain_select').selectedIndex].value
	};

	EvoInterface.initEvolutionEnv(params);

	var x = 1;
}

function popsizeChange() {
	console.log("Pop Size Change");
	EvoInterface.changePopulationSize(parseFloat(document.getElementById("popsize-label").innerHTML));
}

function tournChange() {
	console.log("Tourn Change");
	EvoInterface.changeTournamentSize(parseFloat(document.getElementById("tourn-label").innerHTML));
}

function mutationRateChange() {
	console.log("Mut Rate Change");
	document.getElementById("mutate-label").innerHTML = parseFloat(document.getElementById("mutate-label").innerHTML).toFixed(2);
	EvoInterface.changeMutationPerc(parseFloat(document.getElementById("mutate-label").innerHTML));
}

function crossoverRateChange() {
	console.log("CX Rate Change");
	document.getElementById("cxrate-label").innerHTML = parseFloat(document.getElementById("cxrate-label").innerHTML).toFixed(2);
	EvoInterface.changeCrossoverPerc(parseFloat(document.getElementById("cxrate-label").innerHTML));
}

function selChange() {
	console.log("Selection Change");
	EvoInterface.changeSelectionMethod($('input:radio[name="selmethod"]:checked').val());
}

function mutChange() {
	console.log("Mutation Change");
	EvoInterface.changeMutationMethod($('input[name="mutmethod"]:checked').val());	
}

function cxChange() {
	console.log("Crossover Change");
	EvoInterface.changeCrossoverMethod($('input[name="cxmethod"]:checked').val());
}