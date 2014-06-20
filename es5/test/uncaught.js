"use strict";
var traceur = require('traceur');
var defaultCreatePromise = $traceurRuntime.assertObject(require('../lib/promise.js')).defaultCreatePromise;
var uncaughtPromiseConstructor = $traceurRuntime.assertObject(require('../lib/uncaught.js')).uncaughtPromiseConstructor;
describe('promise uncaught error test', (function() {
  it('should get uncaught error', (function(callback) {
    var errorHandler = (function(err) {
      return callback();
    });
    var createPromise = uncaughtPromiseConstructor(defaultCreatePromise, 200, errorHandler);
    createPromise((function(resolve, reject) {
      reject(new Error('ignored rejection'));
    })).then((function() {
      return callback(new Error('should never resolved'));
    }));
  }));
  it('should catch error in catch handler', (function(callback) {
    var errorHandler = (function(err) {
      return callback();
    });
    var createPromise = uncaughtPromiseConstructor(defaultCreatePromise, 200, errorHandler);
    createPromise((function(resolve, reject) {
      reject('ignored rejection');
    })).catch((function(err) {
      throw new Error('error within catch handler');
    }));
  }));
}));
