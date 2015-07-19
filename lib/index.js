'use strict';

// MODULES //

var isPositiveIntegerArray = require( 'validate.io-positive-integer-array' ),
	isPositiveInteger = require( 'validate.io-positive-integer' ),
	ctors = require( 'compute-array-constructors' ),
	matrix = require( 'dstructs-matrix' ),
	validate = require( './validate.js' ),
	recurse = require( './recurse.js' ),
	compile = require( './compile.js' );


// NaNs //

/**
* FUNCTION: nans( dims[, opts] )
*	Creates a NaN-filled matrix or array.
*
* @param {Number|Number[]} dims - dimensions
* @param {Object} [opts] - function options
* @param {String} [opts.dtype="generic"] - output data type
* @returns {Array|Number[]|Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array|Matrix} NaNs
*/
function nans( dims, options ) {
	/* jshint newcap:false */
	var opts = {},
		isArray,
		ndims,
		ctor,
		out,
		err,
		len,
		dt,
		i;

	isArray = isPositiveIntegerArray( dims );
	if ( !isArray && !isPositiveInteger( dims ) ) {
		throw new TypeError( 'nans()::invalid input argument. Dimensions argument must be either a positive integer or a positive integer array. Value: `' + dims + '`.' );
	}
	if ( arguments.length > 1 ) {
		err = validate( opts, options );
		if ( err ) {
			throw err;
		}
	}
	dt = opts.dtype || 'generic';
	if ( isArray ) {
		ndims = dims.length;
		if ( ndims < 2 ) {
			len = dims[ 0 ];
		}
	} else {
		ndims = 1;
		len = dims;
	}
	// 1-dimensional data structures...
	if ( ndims === 1 ) {
		// Ensure fast elements for generic arrays...
		if ( dt === 'generic' && len < 64000 ) {
			out = [];
			for ( i = 0; i < len; i++ ) {
				out.push( NaN );
			}
		} else {
			ctor = ctors( dt );
			out = new ctor( len );
			for ( i = 0; i < len; i++ ) {
				out[ i ] = NaN;
			}
		}
		return out;
	}
	// Multidimensional data structures...
	if ( dt !== 'generic' ) {
		if ( ndims === 2 ) {
			out = matrix( dims, dt );
			for ( i = 0; i < out.length; i++ ) {
				out.data[ i ] = NaN;
			}
			return out;
		}
		// TODO: dstructs-ndarray support goes here. Until then, fall through to plain arrays...
		// out = ndarray();
		// for ( i = 0; i < out.length; i++ ) {
		//	out.data[ i ] = NaN;
		// }
	}
	return recurse( dims, 0 );
} // end FUNCTION nans()


// EXPORTS //

module.exports = nans;
module.exports.compile = compile;
