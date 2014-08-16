// Create an environment with programmatically placed spheres on the floor.

Math.degrees = function(rad)
{
	return rad*(180/Math.PI);
}
 
Math.radians = function(deg)
{
	return deg * (Math.PI/180);
}

function prism_environment() {

	var rows 		= 80;
	var row_width   = 500;
	var spacing 	=  4; 

	var start_offset = 30;

	var row_scale = 2.;

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
		spacing = params.spacing;
		row_scale = params.max_height;
		rows = params.number;
		row_width = params.width;
	}

	this.createTerrain = function(validate) {

		// Add a factor to offset the spheres by half spacing between rows.
		var prism_scale = row_scale;
		var row_fuzz = 1.0;

		for ( var i = 0; i < rows; ++i ) {
			prism_primitives.push(new THREE.CubeGeometry( 1, 1, 1 ));

			var prism = new Physijs.BoxMesh(
				prism_primitives[prism_primitives.length-1],
				prism_material,
				0
			);

			prism._physijs.collision_type = 1;
			prism._physijs.collision_masks = 4;

			var prism_size = prism_scale*Math.random();
			prism.scale.set( prism_size, prism_size, 160.0 );
			prism.position.set( -start_offset-i*spacing-(row_fuzz*Math.random()), 0, 0 );
			Simulator.scene().add( prism );
			bodies.push( prism );
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