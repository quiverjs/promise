"use strict";
var traceur = require('traceur');
var defaultCreatePromise = $traceurRuntime.assertObject(require('../lib/promise.js')).defaultCreatePromise;
var uncaughtPromiseConstructor = $traceurRuntime.assertObject(require('../lib/uncaught.js')).uncaughtPromiseConstructor;
var chai = require('chai');
var should = chai.should();
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
  it('nested then test', (function(callback) {
    var errorHandler = (function() {
      return callback(new Error('should have no error'));
    });
    var createPromise = uncaughtPromiseConstructor(defaultCreatePromise, 200, errorHandler);
    var doFoo = (function() {
      return createPromise((function(resolve) {
        return resolve('foo');
      }));
    });
    doFoo().then((function(val) {
      val.should.equal('foo');
      return doFoo().then((function(val) {
        val.should.equal('foo');
        setTimeout(callback, 1000);
      }));
    })).catch((function(err) {}));
  }));
}));
