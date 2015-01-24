"use strict";
var $__traceur_64_0_46_0_46_8__,
    $__chai__,
    $__chai_45_as_45_promised__,
    $___46__46__47_lib_47_promise_46_js__;
($__traceur_64_0_46_0_46_8__ = require("traceur"), $__traceur_64_0_46_0_46_8__ && $__traceur_64_0_46_0_46_8__.__esModule && $__traceur_64_0_46_0_46_8__ || {default: $__traceur_64_0_46_0_46_8__});
var chai = ($__chai__ = require("chai"), $__chai__ && $__chai__.__esModule && $__chai__ || {default: $__chai__}).default;
var chaiAsPromised = ($__chai_45_as_45_promised__ = require("chai-as-promised"), $__chai_45_as_45_promised__ && $__chai_45_as_45_promised__.__esModule && $__chai_45_as_45_promised__ || {default: $__chai_45_as_45_promised__}).default;
chai.use(chaiAsPromised);
let should = chai.should();
var $__2 = ($___46__46__47_lib_47_promise_46_js__ = require("../lib/promise.js"), $___46__46__47_lib_47_promise_46_js__ && $___46__46__47_lib_47_promise_46_js__.__esModule && $___46__46__47_lib_47_promise_46_js__ || {default: $___46__46__47_lib_47_promise_46_js__}),
    safePromised = $__2.safePromised,
    promisify = $__2.promisify,
    resolve = $__2.resolve,
    promiseChain = $__2.promiseChain;
describe('safe promised test', (function() {
  it('should return promise', (function() {
    let fn = (function() {
      return 'foo';
    });
    let wrapped = safePromised(fn);
    wrapped().then((function(res) {
      return res.should.equal('foo');
    })).should.be.fulfilled;
  }));
  it('should catch exception', (function() {
    let fn = (function() {
      throw new Error('test');
    });
    let wrapped = safePromised(fn);
    return wrapped().should.be.rejected;
  }));
}));
describe('promisify test', (function() {
  let asyncTimesTwo = (function(num, callback) {
    return process.nextTick((function() {
      return callback(null, num * 2);
    }));
  });
  let asyncError = (function(callback) {
    return process.nextTick((function() {
      return callback(new Error());
    }));
  });
  let promisedTimesTwo = promisify(asyncTimesTwo);
  let promisedError = promisify(asyncError);
  it('should convertible to promise', (function() {
    return promisedTimesTwo(3).should.eventually.equal(6);
  }));
  it('should reject async errors', (function() {
    return promisedError().should.be.rejected;
  }));
}));
