'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	nans = require( './nans.js' );


// COMPILE //

/**
* FUNCTION: compile( dims )
*	Compiles a function for creating NaN-filled arrays.
*
* @param {Number|Number[]} dims - dimensions
* @returns {Function} function for creating NaN-filled arrays
*/
function compile( dims ) {
	var isArray;

	isArray = isPositiveIntegerArray( dims );
	if ( !isArray && !isPositiveInteger( dims ) ) {
		throw new TypeError( 'compile()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
	}
	if ( !isArray ) {
		dims = [ dims ];
	}
	return nans( dims );
} // end FUNCTION compile()


// EXPORTS //

module.exports = compile;
