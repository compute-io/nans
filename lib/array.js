'use strict';

/**
* FUNCTION: nans( len )
*	Creates a NaN-filled array.
*
* @param {Number} len - array length
* @returns {Number[]} NaN-filled array
*/
function nans( len ) {
	var out,
		i;

	// Ensure fast elements...
	if ( len < 64000 ) {
		out = new Array( len );
		for ( i = 0; i < len; i++ ) {
			out[ i ] = NaN;
		}
	} else {
		out = [];
		for ( i = 0; i < len; i++ ) {
			out.push( NaN );
		}
	}
	return out;
} // end FUNCTION nans()


// EXPORTS //

module.exports = nans;
