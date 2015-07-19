/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createFcn = require( './../lib/nans.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'create nans function', function tests() {

	it( 'should export a function', function test() {
		expect( createFcn ).to.be.a( 'function' );
	});

	it( 'should return a function', function test() {
		assert.isFunction( createFcn( [1,2,3] ) );
	});

	it( 'should correctly create a NaNs function for a linear array', function test() {
		var expected, actual, nans, i;

		this.timeout( 0 );

		// Small array:
		nans = createFcn( [10] );

		expected = new Array( 10 );
		for ( i = 0; i < expected.length; i++ ) {
			expected[ i ] = NaN;
		}
		actual = nans();

		assert.deepEqual( actual, expected );

		// Large array:
		nans = createFcn( [100000] );
		actual = nans();

		for ( i = 0; i < expected.length; i++ ) {
			assert.ok( actual[i] !== actual[i], i );
		}
	});

	it( 'should correctly create a NaNs function for a multidimensional array', function test() {
		var expected,
			actual,
			nans,
			dims,
			arr1,
			arr2,
			i, j, k;

		this.timeout( 0 );

		// [1]
		dims = [ 1, 64000, 2 ];
		nans = createFcn( dims );

		expected = new Array( 1 );
		for ( i = 0; i < dims[ 0 ]; i++ ) {
			arr1 = [];
			for ( j = 0; j < dims[ 1 ]; j++ ) {
				arr2 = new Array( dims[ 2 ] );
				for ( k = 0; k < dims[ 2 ]; k++ ) {
					arr2[ k ] = NaN;
				}
				arr1.push( arr2 );
			}
			expected[ i ] = arr1;
		}
		actual = nans();

		expected = expected[ 0 ];
		actual = actual[ 0 ];
		for ( i = 0; i < dims[ 1 ]; i++ ) {
			assert.deepEqual( actual[i], expected[i], i );
		}

		// [2]
		dims = [ 64000, 1, 2 ];
		nans = createFcn( dims );

		expected = new Array( 1 );
		for ( i = 0; i < dims[ 0 ]; i++ ) {
			arr1 = [];
			for ( j = 0; j < dims[ 1 ]; j++ ) {
				arr2 = new Array( dims[ 2 ] );
				for ( k = 0; k < dims[ 2 ]; k++ ) {
					arr2[ k ] = NaN;
				}
				arr1.push( arr2 );
			}
			expected[ i ] = arr1;
		}
		actual = nans();

		for ( i = 0; i < dims[ 0 ]; i++ ) {
			assert.deepEqual( actual[i], expected[i], i );
		}

		// [3]
		dims = [ 1, 2, 64000 ];
		nans = createFcn( dims );

		actual = nans();

		actual = actual[ 0 ];
		for ( i = 0; i < dims[ 1 ]; i++ ) {
			for ( j = 0; j < dims[ 2 ]; j++ ) {
				assert.ok( actual[i][j]!== actual[i][j], i + ',' + j );
			}
		}
	});

});
