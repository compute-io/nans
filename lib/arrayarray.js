'use strict';

// MODULES //

var recurse = require( './recurse.js' );


// NaNs //

/**
* FUNCTION: nans( dims )
*	Creates a NaN-filled multidimensional array.
*
* @param {Number[]} dims - dimensions
* @returns {Array} NaN-filled multidimensional array
*/
function nans( dims ) {
	return recurse( dims, 0 );
} // end FUNCTION nans()


// EXPORTS //

module.exports = nans;
