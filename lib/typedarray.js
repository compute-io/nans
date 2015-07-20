'use strict';

// MODULES //

var ctors = require( 'compute-array-constructors' );


// NaNs //

/**
* FUNCTION: nans( len, dt )
*	Creates a NaN-filled typed array.
*
* @param {Number} len - array length
* @param {String} dt - data type
* @returns {Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array} NaN-filled typed array
*/
function nans( len, dt ) {
	/* jshint newcap:false */
	var ctor,
		out,
		i;

	ctor = ctors( dt );
	if ( ctor === null ) {
		throw new Error( 'nans()::invalid value. Data type does not have a corresponding array constructor. Value: `' + dt + '`.' );
	}
	out = new ctor( len );
	for ( i = 0; i < len; i++ ) {
		out[ i ] = NaN;
	}
	return out;
} // end FUNCTION nans()


// EXPORTS //

module.exports = nans;
