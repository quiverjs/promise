"use strict";
var $__traceur_64_0_46_0_46_8__,
    $__chai__,
    $__chai_45_as_45_promised__,
    $___46__46__47_lib_47_promise_46_js__;
($__traceur_64_0_46_0_46_8__ = require("traceur"), $__traceur_64_0_46_0_46_8__ && $__traceur_64_0_46_0_46_8__.__esModule && $__traceur_64_0_46_0_46_8__ || {default: $__traceur_64_0_46_0_46_8__});
var chai = ($__chai__ = require("chai"), $__chai__ && $__chai__.__esModule && $__chai__ || {default: $__chai__}).default;
var chaiAsPromised = ($__chai_45_as_45_promised__ = require("chai-as-promised"), $__chai_45_as_45_promised__ && $__chai_45_as_45_promised__.__esModule && $__chai_45_as_45_promised__ || {default: $__chai_45_as_45_promised__}).default;
var $__2 = ($___46__46__47_lib_47_promise_46_js__ = require("../lib/promise.js"), $___46__46__47_lib_47_promise_46_js__ && $___46__46__47_lib_47_promise_46_js__.__esModule && $___46__46__47_lib_47_promise_46_js__ || {default: $___46__46__47_lib_47_promise_46_js__}),
    async = $__2.async,
    promisify = $__2.promisify;
chai.use(chaiAsPromised);
let should = chai.should();
let nextTick = promisify(process.nextTick);
let timesTwo = (function(num) {
  return nextTick().then((function() {
    return num * 2;
  }));
});
let plusThree = (function(num) {
  return nextTick().then((function() {
    return num + 3;
  }));
});
describe('async generator test', (function() {
  it('nested yield', (function() {
    let calc = async(function*(num) {
      return yield timesTwo(yield plusThree(num));
    });
    return calc(1).should.eventually.equal(8);
  }));
}));
