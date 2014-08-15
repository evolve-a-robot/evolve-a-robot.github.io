function launchButtonClick(e) {

	// Hide the launch button.
	document.getElementById("launch-div").style.display = 'none';
	document.getElementById("content-title").style.display = 'none';
	document.getElementById("container").style.display = 'block';
	document.getElementById("content-area").style.display = 'block';

	// Unhide the plots.
	document.getElementById("pop-barchart-div").style.display = 'block';
	document.getElementById("gen-scatterplot-div").style.display = 'block';
	// document.getElementById("pop-scatterplot-div").style.display = 'block';

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
	EvoInterface.changePopulationSize(parseFloat(document.getElementById("popsize-label").innerHTML));
}

function tournChange() {
	EvoInterface.changeTournamentSize(parseFloat(document.getElementById("tourn-label").innerHTML));
}

function mutationRateChange() {
	document.getElementById("mutate-label").innerHTML = parseFloat(document.getElementById("mutate-label").innerHTML).toFixed(2);
	EvoInterface.changeMutationPerc(parseFloat(document.getElementById("mutate-label").innerHTML));
}

function crossoverRateChange() {
	document.getElementById("cxrate-label").innerHTML = parseFloat(document.getElementById("cxrate-label").innerHTML).toFixed(2);
	EvoInterface.changeCrossoverPerc(parseFloat(document.getElementById("cxrate-label").innerHTML));
}

function selChange() {
	EvoInterface.changeSelectionMethod($('input:radio[name="selmethod"]:checked').val());
}

function mutChange() {
	EvoInterface.changeMutationMethod($('input[name="mutmethod"]:checked').val());	
}

function cxChange() {
	EvoInterface.changeCrossoverMethod($('input[name="cxmethod"]:checked').val());
}