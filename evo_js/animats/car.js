Math.degrees = function(rad)
{
	return rad*(180/Math.PI);
}
 
Math.radians = function(deg)
{
	return deg * (Math.PI/180);
}

var eucl_distance = function(p1,p2) {
	return Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2)+Math.pow(p1[2]-p2[2],2));
}

function car_genome() {
	var num_segs = 5;
	var genome;
	// var genomeDescription = 0;

	// Initialize a genome for this robot, handled by HillClimber
	this.initGenome = function() {
		var gen = [];

		// Start with a randomized genome.

		//Randomize the length, width, and height for each box.
		for (var i = 0; i < num_segs; ++i) {
			if (Math.random() > 0.1 || i == 0) {
				gen.push(1); // Chassis Segment Expressed (0:No, 1:Yes)
			} else {
				gen.push(0); // Chassis Segment Expressed (0:No, 1:Yes)
			}
			gen.push((1.+(3. * Math.random()).toFixed(4))/2.); // Chassis Length
			gen.push((0.4 + 5. * Math.random()).toFixed(4)); // Chassis Height
			gen.push((0.4 + 10. * Math.random()).toFixed(4)); // Chassis Width
			if (Math.random() > 0.5) {
				gen.push(1); // Wheels (0:No, 1:Yes)
			} else {
				gen.push(0); // Wheels (0:No, 1:Yes)
			}
			gen.push((5. * Math.random()).toFixed(4)); // Wheel Diameter
			gen.push((0.2 + 1. * Math.random()).toFixed(4)); // Wheel Width

		}
		genome = gen;
	}

	var genomeDescriptor = function() {
		var genomeDescription = [];

		for (var i = 0; i < num_segs; ++i) {
			genomeDescription.push("Chassis Segment "+i.toString()+" Expressed");
			genomeDescription.push("Chassis Segment "+i.toString()+" Length");
			genomeDescription.push("Chassis Segment "+i.toString()+" Height");
			genomeDescription.push("Chassis Segment "+i.toString()+" Width");
			genomeDescription.push("Wheels "+i.toString()+" Expressed");
			genomeDescription.push("Wheels "+i.toString()+" Diameter");
			genomeDescription.push("Wheels "+i.toString()+" Width");
		}

		return genomeDescription;
	}

	this.genomeLength = function() {
		return genome.length;
	}

	// Mutate a genome for this robot, handled by HillClimber
	// TODO: Reimplement this for the new genome.
	this.mutateGenome = function(mut_type, mut_perc) {
		if (mut_type == 'random') {
			for (var index = 1; index < genome.length; ++index) {
				if (Math.random() < mut_perc) {
					// Turn chassis segment on or off.
					if (index % (genome.length/num_segs) == 0) {
						if (Math.random() < 0.15) {
							genome[index] = 0;
						} else {
							genome[index] = 1;
						}
					} else if (index % (genome.length/num_segs) == 1) {
						genome[index] = (1.+(3. * Math.random()).toFixed(4)/2.); // Chassis Length
					} else if (index % (genome.length/num_segs) == 2) {
						genome[index] = (0.2 + 5. * Math.random()).toFixed(4); // Chassis Height
					} else if (index % (genome.length/num_segs) == 3) {
						genome[index] = (0.2 + 10. * Math.random()).toFixed(4); // Chassis Width
					} else if (index % (genome.length/num_segs) == 4) {
						if (Math.random() < 0.15) {
							genome[index] = (genome[index]+1)%2
						}
					} else if (index % (genome.length/num_segs) == 5) {
						genome[index] = (5. * Math.random()).toFixed(4); // Wheel Diameter
					} else if (index % (genome.length/num_segs) == 6) {
						genome[index] = (0.2 + 1. * Math.random()).toFixed(4); // Wheel Width
					}
				}
			}
		} else {
			for (var index = 1; index < genome.length; ++index) {
				if (Math.random() < mut_perc) {
					// Turn chassis segment on or off.
					if (index % (genome.length/num_segs) == 0) {
						if (Math.random() < 0.15) {
							genome[index] = 0;
						} else {
							genome[index] = 1;
						}
					} else if (index % (genome.length/num_segs) == 1) {
						genome[index] = (1.+(3. * Math.randomGaussian(genome[index],0.25)).toFixed(4)/2.); // Chassis Length
						if (genome[index] < 1.) {
							genome[index] = 1.;
						} else if (genome[index] > 4.) {
							genome[index] = 4.;
						}
					} else if (index % (genome.length/num_segs) == 2) {
						genome[index] = (0.2 + 5. * Math.randomGaussian(genome[index],0.25)).toFixed(4); // Chassis Height
						if (genome[index] < 0.2) {
							genome[index] = 0.2;
						} else if (genome[index] > 5.2) {
							genome[index] = 5.2;
						}
					} else if (index % (genome.length/num_segs) == 3) {
						genome[index] = (0.2 + 10. * Math.randomGaussian(genome[index],0.25)).toFixed(4); // Chassis Width
						if (genome[index] < 0.2) {
							genome[index] = 0.2;
						} else if (genome[index] > 10.2) {
							genome[index] = 10.2;
						}
					} else if (index % (genome.length/num_segs) == 4) {
						if (Math.random() < 0.15) {
							genome[index] = (genome[index]+1)%2
						}
					} else if (index % (genome.length/num_segs) == 5) {
						genome[index] = (0.2 + 4.8 * Math.randomGaussian(genome[index],0.25)).toFixed(4); // Wheel Diameter
						if (genome[index] < 0.2) {
							genome[index] = 0.2;
						} else if (genome[index] > 5.) {
							genome[index] = 5.;
						}
					} else if (index % (genome.length/num_segs) == 6) {
						genome[index] = (0.2 + 1. * Math.randomGaussian(genome[index],0.25)).toFixed(4); // Wheel Width
						if (genome[index] < 0.2) {
							genome[index] = 0.2;
						} else if (genome[index] > 1.2) {
							genome[index] = 1.2;
						}
					}
				}
			}
		}
	}

	this.getGenome = function() {
		return genome;
	}

	this.setGenome = function(gen) {
		genome = gen.slice();
	}
}

car_genome.genomeDescr = function() {
	var genomeDescription = []

	for (var i = 0; i < 5; ++i) {
		genomeDescription.push("Chassis Segment "+i.toString()+" Expressed");
		genomeDescription.push("Chassis Segment "+i.toString()+" Length");
		genomeDescription.push("Chassis Segment "+i.toString()+" Height");
		genomeDescription.push("Chassis Segment "+i.toString()+" Width");
		genomeDescription.push("Wheels "+i.toString()+" Expressed");
		genomeDescription.push("Wheels "+i.toString()+" Diameter");
		genomeDescription.push("Wheels "+i.toString()+" Width");
	}

	return genomeDescription;
}

function car() {

	var car_chassis = [], car_wheels = [], constraints = [], wheel_motors = [], main_chassis = "", num_segs = 5;
	// Simsy constants for materials, don't need to be creating and deleting these all the time.
	var box_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial(),
		.8, // low friction
		.6 // high restitution
	);
	var wheel_material = Physijs.createMaterial(
		new THREE.MeshLambertMaterial({map: THREE.ImageUtils.loadTexture("assets/amiga.jpg")}),
		.99, // low friction
		.6 // high restitution	
	);
	// box_material.color = new THREE.Color("rgb(255,0,0)");

	var bodies = [];

	for (var i = 0; i < num_segs; ++i) {
		bodies.push(new THREE.CubeGeometry( 1, 1, 1 ));
		bodies.push(new THREE.CylinderGeometry( 1,1,1,32 ));
		bodies.push(new THREE.CylinderGeometry( 1,1,1,32 ));
	}

	var evo_color = new THREE.Color("rgb(255,0,0)");
	var evo_wheel_color = new THREE.Color("rgb(255,255,255)");
	var val_color = new THREE.Color("rgb(0,255,0)");
	var val_wheel_color = new THREE.Color("rgb(56,56,56)");

	var genome;

	// Keep track of the robot's position for stalled purposes.
	var current_pos = 0, prev_position_best = {x:0,y:0,z:0};

	this.cameraFollow = function() {
		return null;
	}

	this.setGenome = function(gen) {
		prev_position_best.x = 0;
		current_pos.x = 0;
		genome = gen.slice();
	}

	this.update = function(steps) {
		// Move the wheels.
		for(var i = 0; i < wheel_motors.length; ++i) {
			if (i % 2 == 0) {
				wheel_motors[i].configureAngularMotor( 2, 1, 0, -10, 10000 );
			} else {
				wheel_motors[i].configureAngularMotor( 2, 1, 0, 10, 10000 );
			}
			wheel_motors[i].enableAngularMotor( 2 );
		}
	}

	// Get the position of the main chassis.
	this.position = function() {
		prev_position_best.x = current_pos.x < prev_position_best.x ? current_pos.x : prev_position_best.x;
		current_pos = car_chassis[0].position;

		return current_pos;
	}

	// Check and see if the robot has stalled.
	this.is_stalled = function() {
		if (prev_position_best != 0) {
			if (prev_position_best.x <= current_pos.x + 0.001) {
				return true;
			}
		}
		return false;
	}

	this.createRobot = function(validate) {

		// Color body based on whether or not we're validating.
		if (validate) {
			box_material.color = val_color;
			wheel_material.color = val_wheel_color;
		} else {
			box_material.color = evo_color;
			wheel_material.color = evo_wheel_color;
		}

		// Constants for the robot.
		var body_height = 4.0;
		var bias = 0.5, relaxation = 0.0;

		var pos = [0,body_height,0];

		var num_genome_elem = genome.length/num_segs;

		for ( var i = 0; i < num_segs; ++i) {
			// Check to make sure the body segment is expressed.
			if (genome[i*num_genome_elem] == 1) {
				// Front body segment
				box = new Physijs.BoxMesh(
					bodies[i*3],
					box_material,
					genome[i*num_genome_elem+1]*genome[i*num_genome_elem+2]*genome[i*num_genome_elem+3]
				);

				box._physijs.collision_type = 4;
				box._physijs.collision_masks = 1;

				// Setup the position based on half the x length of the body.
				if (i > 0) {
					pos[0] -= genome[i*num_genome_elem+1]/2.;
				}

				box.position.set(pos[0],pos[1],pos[2]);
				box.scale.set(1,1,1);
				box.scale.set(genome[i*num_genome_elem+1],genome[i*num_genome_elem+2],genome[i*num_genome_elem+3])
				box.castShadow = true;
				Simulator.scene().add( box );
				car_chassis.push( box );

				// Check to see if the wheels are expressed.
				if (genome[i*num_genome_elem+4] == 1) {
					// Create two wheels to connect to the chassis.
					var left_wheel = new Physijs.CylinderMesh(
							bodies[i*3+1],
							wheel_material,
							genome[i*num_genome_elem+5]*genome[i*num_genome_elem+6]
						);
					
					left_wheel._physijs.collision_type = 4;
					left_wheel._physijs.collision_masks = 1;

					left_wheel.rotation.x = 1.57;
					left_wheel.scale.set(genome[i*num_genome_elem+5],genome[i*num_genome_elem+6],genome[i*num_genome_elem+5]);
					left_wheel.position.set(pos[0],pos[1],pos[2]-(genome[i*num_genome_elem+3]/2.+genome[i*num_genome_elem+6]/2.));
					left_wheel.castShadow = true;
					Simulator.scene().add( left_wheel );
					car_wheels.push(left_wheel);

					var right_wheel = new Physijs.CylinderMesh(
							bodies[i*3+1],
							wheel_material,
							genome[i*num_genome_elem+5]*genome[i*num_genome_elem+6]
						);
					
					right_wheel._physijs.collision_type = 4;
					right_wheel._physijs.collision_masks = 1;

					right_wheel.position.set(pos[0],pos[1],pos[2]+(genome[i*num_genome_elem+3]/2.+genome[i*num_genome_elem+6]/2.));
					right_wheel.rotation.x = 1.57;
					right_wheel.scale.set(genome[i*num_genome_elem+5],genome[i*num_genome_elem+6],genome[i*num_genome_elem+5]);
					right_wheel.castShadow = true;
					Simulator.scene().add( right_wheel );
					car_wheels.push(right_wheel);

					// Add a hinge between the chassis and each wheel.
					var wheel_joint = new Physijs.DOFConstraint(
										box,left_wheel,
										new THREE.Vector3( pos[0],pos[1],pos[2]-(genome[i*num_genome_elem+3]/2.) )
									);
					Simulator.scene().addConstraint(wheel_joint);
					constraints.push(wheel_joint);
					wheel_joint.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
					wheel_joint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });
					wheel_motors.push(wheel_joint);

					// Add a hinge between the chassis and each wheel.
					wheel_joint = new Physijs.DOFConstraint(
										right_wheel,box,
										new THREE.Vector3( pos[0],pos[1],pos[2]+(genome[i*num_genome_elem+3]/2.) )
									);
					Simulator.scene().addConstraint(wheel_joint);
					constraints.push(wheel_joint);
					wheel_joint.setAngularLowerLimit({ x: 0, y: 0, z: 0 });
					wheel_joint.setAngularUpperLimit({ x: 0, y: 0, z: 0 });
					wheel_motors.push(wheel_joint);
				}

				// Add the rest of the current box to position.
				pos[0] -= genome[i*num_genome_elem+1]/2.;

				if (i > 0 && car_chassis.length >= 2) {
					// Add a constraint between the current body and previous one.
					var hinge = new Physijs.HingeConstraint(car_chassis[car_chassis.length-1],car_chassis[car_chassis.length-2],
									new THREE.Vector3(pos[0]+(genome[i*num_genome_elem+1]-0.0001),body_height,0), // Position of Hinge
									new THREE.Vector3(1,0,0) // Axis of Rotation
									);
					Simulator.scene().addConstraint(hinge);
					constraints.push(hinge);
					hinge.setLimits(-0.17,0.17,bias,relaxation);
				}
			}
		}

	}

	this.removeRobot = function() {
		// Remove the hinges
		for (var i = 0; i < constraints.length; ++i) {
			Simulator.scene().removeConstraint(constraints[i]);
		}

		// Remove the bodies
		for (var i = 0; i < car_chassis.length; ++i) {
			Simulator.scene().remove(car_chassis[i]);
		}

		// Remove the bodies
		for (var i = 0; i < car_wheels.length; ++i) {
			Simulator.scene().remove(car_wheels[i]);
		}

		// Clear the arrays.
		for (var i = 0; i < constraints.length; ++i) {
			constraints[i] = null;
		}

		for (var i = 0; i < car_chassis.length; ++i) {
			car_chassis[i] = null;
		}

		for (var i = 0; i < car_wheels.length; ++i) {
			car_wheels[i] = null;
		}

		constraints = [];
		car_chassis = [];
		car_wheels = [];
		wheel_motors = [];
	}
};