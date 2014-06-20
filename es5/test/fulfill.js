"use strict";
var traceur = require('traceur');
var defaultCreatePromise = $traceurRuntime.assertObject(require('../lib/promise.js')).defaultCreatePromise;
var doubleFulfillPromiseConstructor = $traceurRuntime.assertObject(require('../lib/fulfill.js')).doubleFulfillPromiseConstructor;
describe('promise double fulfill test', (function() {
  it('should get double fulfill error', (function(callback) {
    var errorHandler = (function(err) {
      return callback();
    });
    var createPromise = doubleFulfillPromiseConstructor(defaultCreatePromise, errorHandler);
    createPromise((function(resolve, reject) {
      resolve(1);
      resolve(2);
    }));
  }));
}));
