/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nans = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'NaN-filled matrix', function tests() {

	it( 'should export a function', function test() {
		expect( nans ).to.be.a( 'function' );
	});

	it( 'should return a NaN-filled matrix', function test() {
		var actual, expected;

		actual = nans( [2,2], 'float32' );

		expected = new Float32Array( 4 );
		for ( var i = 0; i < expected.length; i++ ) {
			expected[ i ] = NaN;
		}

		assert.deepEqual( actual.shape, [2,2] );
		assert.strictEqual( actual.dtype, 'float32' );
		assert.deepEqual( actual.data, expected );
	});

});
