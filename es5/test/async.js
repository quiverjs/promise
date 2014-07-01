"use strict";
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var $__0 = $traceurRuntime.assertObject(require('../lib/promise.js')),
    async = $__0.async,
    promisify = $__0.promisify;
chai.use(chaiAsPromised);
chai.should();
var nextTick = promisify(process.nextTick);
var timesTwo = (function(num) {
  return nextTick().then((function() {
    return num * 2;
  }));
});
var plusThree = (function(num) {
  return nextTick().then((function() {
    return num + 3;
  }));
});
describe('async generator test', (function() {
  it('nested yield', (function() {
    var calc = async($traceurRuntime.initGeneratorFunction(function $__1(num) {
      var $__2,
          $__3,
          $__4,
          $__5;
      return $traceurRuntime.createGeneratorInstance(function($ctx) {
        while (true)
          switch ($ctx.state) {
            case 0:
              $__2 = plusThree(num);
              $ctx.state = 10;
              break;
            case 10:
              $ctx.state = 2;
              return $__2;
            case 2:
              $__3 = $ctx.sent;
              $ctx.state = 4;
              break;
            case 4:
              $__4 = timesTwo($__3);
              $ctx.state = 12;
              break;
            case 12:
              $ctx.state = 6;
              return $__4;
            case 6:
              $__5 = $ctx.sent;
              $ctx.state = 8;
              break;
            case 8:
              $ctx.returnValue = $__5;
              $ctx.state = -2;
              break;
            default:
              return $ctx.end();
          }
      }, $__1, this);
    }));
    return calc(1).should.eventually.equal(8);
  }));
}));
