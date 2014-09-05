"use strict";
var $___46__46__47_lib_47_promise_46_js__;
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var $__0 = ($___46__46__47_lib_47_promise_46_js__ = require("../lib/promise.js"), $___46__46__47_lib_47_promise_46_js__ && $___46__46__47_lib_47_promise_46_js__.__esModule && $___46__46__47_lib_47_promise_46_js__ || {default: $___46__46__47_lib_47_promise_46_js__}),
    safePromised = $__0.safePromised,
    promisify = $__0.promisify,
    resolve = $__0.resolve,
    promiseChain = $__0.promiseChain;
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
    return wrapped().should.be.rejected;
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
describe('promise chain test', (function() {
  it('incomplete chain should be rejected', (function() {
    return promiseChain((function(complete) {
      resolve().then((function() {
        return complete;
      }));
    })).should.be.rejected;
  }));
  it('must return complete token as final resolved value', (function() {
    return promiseChain((function(complete) {
      return resolve().then((function() {
        return complete;
      }));
    }));
  }));
}));
