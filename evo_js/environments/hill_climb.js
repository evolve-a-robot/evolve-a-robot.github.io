// Create an environment with programmatically generated hill for an individual to climb.

Math.degrees = function(rad)
{
	return rad*(180/Math.PI);
}
 
Math.radians = function(deg)
{
	return deg * (Math.PI/180);
}

function hill_climb_environment() {

	var rows 		= 40;
	var cur_pos 	=  [0,0,0]; 

	var run_scale = 0.5;
	var rise_scale = 0.5;

	var start_offset = 30;

	// Define the material for each of the balls.
	var prism_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial(),
		.95, // low friction
		.6 // high restitution	
	);

	prism_material.color = new THREE.Color("rgb(0,255,0)");
	
	//THREE.js Prism Primitive.
	var prism_primitives = []
	var prism_boxes = [];
	var prism_scales = [];
	var first_init = true;

	// Keep track of the joints and bodies in the simulation.
	var constraints = [];
	var bodies = [];

	this.init = function(params) {
		rows = params.number;
		run_scale = params.max_rise;
		rise_scale = params.max_run;
	}

	this.createTerrain = function(validate) {

		if(first_init) {
			for (var i = 0; i < rows; ++i) {
				prism_scales.push([run_scale * Math.random(),rise_scale * Math.random(),1.0]);
			}
			first_init = false;
		} 

		// Add the bodies to the simulator.
		for ( var i = 0; i < rows; ++i ) {
			console.log(prism_scales[i]);
			prism_primitives.push(new THREE.CubeGeometry( 1, 1, 1 ));

			prism_boxes.push(new Physijs.BoxMesh(
				prism_primitives[prism_primitives.length-1],
				prism_material,
				0
			));

			prism_boxes[i]._physijs.collision_type = 1;
			prism_boxes[i]._physijs.collision_masks = 4;

			prism_boxes[i].receiveShadow = true;

			prism_boxes[i].scale.set( prism_scales[i][0], prism_scales[i][1], 320.0 );
			prism_boxes[i].position.set( -start_offset-cur_pos[0]-(0.5*prism_scales[i][0]), cur_pos[1]+(0.5*prism_scales[i][1]), 0 );

			// Add the bodies to the simulation.
			Simulator.scene().add( prism_boxes[i] );
			bodies.push( prism_boxes[i] );

			// Update the positions.
			cur_pos[0] += prism_scales[i][0];
			cur_pos[1] += prism_scales[i][1];
		} 

		cur_pos[0] = 0;
		cur_pos[1] = 0;
		cur_pos[2] = 0;
	}

	this.removeTerrain = function() {
		// Remove the hinges
		// for (var i = 0; i < constraints.length; ++i) {
		// 	Simulator.scene().removeConstraint(constraints[i]);
		// }

		// Remove the bodies
		for (var i = 0; i < bodies.length; ++i) {
			Simulator.scene().remove(bodies[i]);
		}

		// Clear the arrays.
		for (var i = 0; i < constraints.length; ++i) {
			constraints[i] = null;
		}

		for (var i = 0; i < bodies.length; ++i) {
			bodies[i] = null;
		}

		constraints = [];
		bodies = [];
		prism_primitives = []
		prism_boxes = [];
	}
}