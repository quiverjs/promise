"use strict";
var $___46__46__47_lib_47_promise_46_js__,
    $___46__46__47_lib_47_timeout_46_js__;
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var defaultCreatePromise = ($___46__46__47_lib_47_promise_46_js__ = require("../lib/promise.js"), $___46__46__47_lib_47_promise_46_js__ && $___46__46__47_lib_47_promise_46_js__.__esModule && $___46__46__47_lib_47_promise_46_js__ || {default: $___46__46__47_lib_47_promise_46_js__}).defaultCreatePromise;
var timeoutPromiseConstructor = ($___46__46__47_lib_47_timeout_46_js__ = require("../lib/timeout.js"), $___46__46__47_lib_47_timeout_46_js__ && $___46__46__47_lib_47_timeout_46_js__.__esModule && $___46__46__47_lib_47_timeout_46_js__ || {default: $___46__46__47_lib_47_timeout_46_js__}).timeoutPromiseConstructor;
describe('promise timeout test', (function() {
  it('should get timeout error', (function() {
    var createPromise = timeoutPromiseConstructor(defaultCreatePromise, 200);
    var promise = createPromise((function(resolve, reject) {}));
    return promise.should.be.rejected;
  }));
}));
