/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nans = require( './../lib/arrayarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'NaN-filled multidimensional array', function tests() {

	it( 'should export a function', function test() {
		expect( nans ).to.be.a( 'function' );
	});

	it( 'should return a NaN-filled array of arrays', function test() {
		var actual, expected;

		actual = nans( [2,1] );
		expected = [ [NaN], [NaN] ];

		assert.deepEqual( actual, expected );

		actual = nans( [2,1,3] );
		expected = [ [[NaN,NaN,NaN]], [[NaN,NaN,NaN]] ];

		assert.deepEqual( actual, expected );
	});

});
