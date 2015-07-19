/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	nans = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-nans', function tests() {

	it( 'should export a function', function test() {
		expect( nans ).to.be.a( 'function' );
	});

	it( 'should export a function to compile a NaNs function', function test() {
		expect( nans.compile ).to.be.a( 'function' );
	});

	it( 'should throw an error if not provided a positive integer or an array of positive integers', function test() {
		var values = [
			'5',
			0,
			Math.PI,
			-1,
			NaN,
			true,
			null,
			undefined,
			{},
			[1,0],
			[1,null],
			[1,Math.PI],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				nans( value );
			};
		}
	});

	it( 'should throw an error if provided an invalid option', function test() {
		var values = [
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				nans( [1,2,3], {
					'dtype': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'int8',
			'uint8',
			'uint8_clamped',
			'int16',
			'uint16',
			'int32',
			'uint32',
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				nans( [10], {
					'dtype': value
				});
			};
		}
	});

	it( 'should return a NaN-filled matrix', function test() {
		var actual, expected;

		actual = nans( [2,2], {
			'dtype': 'float32'
		});

		expected = new Float32Array( 4 );
		for ( var i = 0; i < expected.length; i++ ) {
			expected[ i ] = NaN;
		}

		assert.deepEqual( actual.shape, [2,2] );
		assert.strictEqual( actual.dtype, 'float32' );
		assert.deepEqual( actual.data, expected );
	});

	it( 'should return a NaN-filled typed-array', function test() {
		var actual, expected;

		actual = nans( 5, {
			'dtype': 'float32'
		});
		expected = new Float32Array( [NaN,NaN,NaN,NaN,NaN] );

		assert.deepEqual( actual, expected );
	});

	it( 'should return a NaN-filled generic array', function test() {
		var actual, expected;

		actual = nans( 5 );
		expected = [ NaN, NaN, NaN, NaN, NaN ];

		assert.deepEqual( actual, expected );

		actual = nans( [1] );
		expected = [ NaN ];

		assert.deepEqual( actual, expected );

		actual = nans( [2,1] );
		expected = [ [NaN], [NaN] ];

		assert.deepEqual( actual, expected );

		actual = nans( [2,1,3] );
		expected = [ [[NaN,NaN,NaN]], [[NaN,NaN,NaN]] ];

		assert.deepEqual( actual, expected );
	});

	it( 'should support fast elements', function test() {
		var actual, i;

		this.timeout( 0 );

		actual = nans( [100000] );
		for ( i = 0; i < actual.length; i++ ) {
			assert.isOk( actual[ i ] !== actual[ i ] );
		}

		actual = nans( [100000,2] );
		for ( i = 0; i < actual.length; i++ ) {
			assert.deepEqual( actual[ i ], [NaN,NaN] );
		}
	});

	it( 'should, until ndarrays are supported, ignore the `dtype` option and return a generic multidimensional array for >2 dimensions', function test() {
		var actual, expected;

		actual = nans( [2,1,3], {
			'dtype': 'float32'
		});
		expected = [ [[NaN,NaN,NaN]], [[NaN,NaN,NaN]] ];

		assert.deepEqual( actual, expected );
	});

});
