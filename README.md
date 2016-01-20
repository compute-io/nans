NaNs
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Creates a NaN-filled [matrix](https://github.com/dstructs/matrix) or array.


## Installation

``` bash
$ npm install compute-nans
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var nans = require( 'compute-nans' );
```

#### nans( dims[, opts] )

Creates a NaN-filled [`matrix`](https://github.com/dstructs/matrix) or [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). The `dims` argument may either be a positive `integer` specifying a `length` or an `array` of positive `integers` specifying dimensions.

``` javascript
var out;

out = nans( 5 );
// returns [ NaN, NaN, NaN, NaN, NaN ];

out = nans( [2,1,2] );
// returns [ [ [NaN,NaN] ], [ [NaN,NaN] ] ]
```

The function accepts the following `options`:

*	__dtype__: output data type. The following `dtypes` are accepted:

	-	`float32`
	-	`float64`
	-	`generic` (default)

By default, the output data structure is a generic [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). To output a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) or [`matrix`](https://github.com/dstructs/matrix), set the `dtype` option.

``` javascript
var out;

out = nans( 5, {
	'dtype': 'float32'
});
// returns Float32Array( [NaN,NaN,NaN,NaN,NaN] );

out = nans( [3,2], {
	'dtype': 'float64'
});
/*
	[ NaN NaN
	  NaN NaN
	  NaN NaN ]
*/
```

__Notes__:
*	Currently, for more than `2` dimensions, the function outputs a __generic__ `array` and ignores any specified `dtype`.

	``` javascript
	var out = nans( [2,1,3], {
		'dtype': 'float32'
	});
	// returns [ [ [NaN,NaN,NaN] ], [ [NaN,NaN,NaN] ] ]
	```
*	Integer [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) are __not__ supported. In JavaScript, [`NaN`](https://en.wikipedia.org/wiki/NaN) values are only represented in floating-point storage formats ([IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point)).


#### nans.compile( dims )

Compiles a `function` for creating NaN-filled [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) having specified dimensions.

``` javascript
var fcn, out;

fcn = nans.compile( [2,1,3] );

out = fcn();
// returns [ [ [NaN,NaN,NaN] ], [ [NaN,NaN,NaN] ] ]

out = fcn();
// returns [ [ [NaN,NaN,NaN] ], [ [NaN,NaN,NaN] ] ]
```

__Notes__:
*	When repeatedly creating [`arrays`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) having the same shape, creating a customized `nans` function will provide performance benefits.




## Examples

``` javascript
var nans = require( 'compute-nans' ),
	out;

// Plain arrays...

// 1x10:
out = nans( 10 );

// 2x1x3:
out = nans( [2,1,3] );

// 5x5x5:
out = nans( [5,5,5] );

// 10x5x10x20:
out = nans( [10,5,10,20] );

// Typed arrays...
out = nans( 10, {
	'dtype': 'float32'
});

// Matrices...
out = nans( [3,2], {
	'dtype': 'float64'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2015-2016. The [Compute.io](https://github.com/compute-io) Authors.


[npm-image]: http://img.shields.io/npm/v/compute-nans.svg
[npm-url]: https://npmjs.org/package/compute-nans

[travis-image]: http://img.shields.io/travis/compute-io/nans/master.svg
[travis-url]: https://travis-ci.org/compute-io/nans


[coverage-image]: https://img.shields.io/codecov/c/github/compute-io/nans/master.svg
[coverage-url]: https://codecov.io/github/compute-io/nans?branch=master


[dependencies-image]: http://img.shields.io/david/compute-io/nans.svg
[dependencies-url]: https://david-dm.org/compute-io/nans

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/nans.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/nans

[github-issues-image]: http://img.shields.io/github/issues/compute-io/nans.svg
[github-issues-url]: https://github.com/compute-io/nans/issues
