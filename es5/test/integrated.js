"use strict";
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var enableDebug = $traceurRuntime.assertObject(require('../lib/promise.js')).enableDebug;
describe('promise integrated test', (function() {
  it('should get timeout error', (function() {
    var createPromise = enableDebug({timeout: 200});
    var promise = createPromise((function(resolve, reject) {}));
    return promise.should.be.rejected;
  }));
  it('should get domain error', (function() {
    var createPromise = enableDebug({});
    var promise = createPromise((function(resolve, reject) {
      process.nextTick((function() {
        throw new Error('domain error');
      }));
    }));
    return promise.should.be.rejected;
  }));
  it('should get double fulfill error', (function(callback) {
    var errorHandler = (function(err) {
      return callback();
    });
    var createPromise = enableDebug({errorHandler: errorHandler});
    createPromise((function(resolve, reject) {
      resolve(1);
      resolve(2);
    }));
  }));
  it('should get uncaught error', (function(callback) {
    var errorHandler = (function(err) {
      return callback();
    });
    var createPromise = enableDebug({
      errorHandler: errorHandler,
      timeout: 200
    });
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
    var createPromise = enableDebug({
      errorHandler: errorHandler,
      timeout: 200
    });
    createPromise((function(resolve, reject) {
      reject(new Error('ignored rejection'));
    })).catch((function(err) {
      throw new Error('error within catch handler');
    }));
  }));
}));
