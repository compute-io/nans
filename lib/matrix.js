'use strict';

// MODULES //

var matrix = require( 'dstructs-matrix' );


// NaNs //

/**
* FUNCTION: nans( dims, dt )
*	Creates a NaN-filled matrix.
*
* @param {Number[]} dims - dimensions
* @param {String} dt - data type
* @returns {Matrix} NaN-filled matrix
*/
function nans( dims, dt ) {
	var out,
		i;

	out = matrix( dims, dt );
	for ( i = 0; i < out.length; i++ ) {
		out.data[ i ] = NaN;
	}
	return out;
} // end FUNCTION nans()


// EXPORTS //

module.exports = nans;
