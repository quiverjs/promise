"use strict";
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var $__0 = $traceurRuntime.assertObject(require('../lib/promise.js')),
    safePromised = $__0.safePromised,
    promisify = $__0.promisify;
describe('safe promised test', (function() {
  it('should return promise', (function() {
    var fn = (function() {
      return 'foo';
    });
    var wrapped = safePromised(fn);
    wrapped().then((function(res) {
      return res.should.equal('foo');
    })).should.be.fulfilled;
  }));
  it('should catch exception', (function() {
    var fn = (function() {
      throw new Error('test');
    });
    var wrapped = safePromised(fn);
    wrapped().should.be.rejected;
  }));
}));
describe('promisify test', (function() {
  var asyncTimesTwo = (function(num, callback) {
    return process.nextTick((function() {
      return callback(null, num * 2);
    }));
  });
  var asyncError = (function(callback) {
    return process.nextTick((function() {
      return callback(new Error());
    }));
  });
  var promisedTimesTwo = promisify(asyncTimesTwo);
  var promisedError = promisify(asyncError);
  it('should convertible to promise', (function() {
    return promisedTimesTwo(3).should.eventually.equal(6);
  }));
  it('should reject async errors', (function() {
    return promisedError().should.be.rejected;
  }));
}));
