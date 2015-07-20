/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nans = require( './../lib/typedarray.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'NaN-filled typed array', function tests() {

	it( 'should export a function', function test() {
		expect( nans ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				nans( 10, value );
			};
		}
	});

	it( 'should return a NaN-filled typed array', function test() {
		var actual, expected;

		actual = nans( 5, 'float32' );
		expected = new Float32Array( [NaN,NaN,NaN,NaN,NaN] );

		assert.deepEqual( actual, expected );
	});

});
