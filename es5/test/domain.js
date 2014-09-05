"use strict";
var $___46__46__47_lib_47_promise_46_js__,
    $___46__46__47_lib_47_domain_46_js__;
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var defaultCreatePromise = ($___46__46__47_lib_47_promise_46_js__ = require("../lib/promise.js"), $___46__46__47_lib_47_promise_46_js__ && $___46__46__47_lib_47_promise_46_js__.__esModule && $___46__46__47_lib_47_promise_46_js__ || {default: $___46__46__47_lib_47_promise_46_js__}).defaultCreatePromise;
var domainPromiseConstructor = ($___46__46__47_lib_47_domain_46_js__ = require("../lib/domain.js"), $___46__46__47_lib_47_domain_46_js__ && $___46__46__47_lib_47_domain_46_js__.__esModule && $___46__46__47_lib_47_domain_46_js__ || {default: $___46__46__47_lib_47_domain_46_js__}).domainPromiseConstructor;
describe('domain promise test', (function() {
  it('should get domain error', (function() {
    var createPromise = domainPromiseConstructor(defaultCreatePromise);
    var promise = createPromise((function(resolve, reject) {
      process.nextTick((function() {
        throw new Error('domain error');
      }));
    }));
    return promise.should.be.rejected;
  }));
}));
