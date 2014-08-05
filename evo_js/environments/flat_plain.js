// Create an environment with a flat plain.

Math.degrees = function(rad)
{
	return rad*(180/Math.PI);
}
 
Math.radians = function(deg)
{
	return deg * (Math.PI/180);
}

function flat_plain_environment() {

	// Keep track of the joints and bodies in the simulation.
	var constraints = [];
	var bodies = [];

	this.createTerrain = function(validate) {
		return;
	}

	this.removeTerrain = function() {
		return;
	}
}