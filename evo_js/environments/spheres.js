// Create an environment with programmatically placed spheres on the floor.

Math.degrees = function(rad)
{
	return rad*(180/Math.PI);
}
 
Math.radians = function(deg)
{
	return deg * (Math.PI/180);
}

function sphere_environment() {

	var sphere_rows 		= 80;
	var sphere_row_number 	= 80;
	var spacing 			= 4; 

	var start_offset = 40;

	var sphere_scale = 2.;

	// Define the material for each of the balls.
	var sphere_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("assets/amiga.jpg")}),
		.95, // low friction
		.6 // high restitution	
	);
	
	//THREE.js Sphere Primitive.
	var sphere_primitives = []

	// Keep track of the joints and bodies in the simulation.
	var constraints = [];
	var bodies = [];

	this.init = function(params) {
		spacing = params.spacing;
		sphere_scale = params.max_size;
		sphere_rows = params.rows;
		sphere_row_number = params.cols;
	}

	this.createTerrain = function(validate) {

		// Add a factor to offset the spheres by half spacing between rows.
		var z_offset = spacing/4.;
		var row_fuzz = -1.0;

		for ( var i = 0; i < sphere_rows; ++i ) {
			sphere_primitives.push(new THREE.SphereGeometry(1,12,12));
			
			if (i % 2 == 0) {
				row_fuzz = -1.0;
			} else {
				row_fuzz = 1.0;
			}
			for ( var j = 0; j < sphere_row_number; ++j ) {
				var sphere = new Physijs.SphereMesh(
					sphere_primitives[sphere_primitives.length-1],
					sphere_material,
					0
				);

				sphere._physijs.collision_type = 1;
				sphere._physijs.collision_masks = 4;

				var sphere_size = sphere_scale*Math.random();
				sphere.scale.set( sphere_size, sphere_size, sphere_size );
				sphere.position.set( -start_offset-i*spacing, 0, -sphere_row_number*2+j*spacing-(z_offset*row_fuzz*Math.random()) );
				Simulator.scene().add( sphere );
				bodies.push( sphere );
			}
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