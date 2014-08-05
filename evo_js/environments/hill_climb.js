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

	// Keep track of the joints and bodies in the simulation.
	var constraints = [];
	var bodies = [];

	this.init = function(params) {
		rows = params.number;
		run_scale = params.max_rise;
		rise_scale = params.max_run;
	}

	this.createTerrain = function(validate) {

		for ( var i = 0; i < rows; ++i ) {
			prism_primitives.push(new THREE.CubeGeometry( 1, 1, 1 ));

			var prism = new Physijs.BoxMesh(
				prism_primitives[prism_primitives.length-1],
				prism_material,
				0
			);

			prism._physijs.collision_type = 1;
			prism._physijs.collision_masks = 4;

			prism.receiveShadow = true;

			var prism_scale = [run_scale * Math.random(),rise_scale * Math.random(),1.0];
			prism.scale.set( prism_scale[0], prism_scale[1], 320.0 );
			prism.position.set( -start_offset-cur_pos[0]-(0.5*prism_scale[0]), cur_pos[1]+(0.5*prism_scale[1]), 0 );
			Simulator.scene().add( prism );
			bodies.push( prism );

			// Update the positions.
			cur_pos[0] += prism_scale[0];
			cur_pos[1] += prism_scale[1];
		}
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
	}
}