"use strict";
var $___46__46__47_lib_47_promise_46_js__,
    $___46__46__47_lib_47_fulfill_46_js__;
var traceur = require('traceur');
var defaultCreatePromise = ($___46__46__47_lib_47_promise_46_js__ = require("../lib/promise.js"), $___46__46__47_lib_47_promise_46_js__ && $___46__46__47_lib_47_promise_46_js__.__esModule && $___46__46__47_lib_47_promise_46_js__ || {default: $___46__46__47_lib_47_promise_46_js__}).defaultCreatePromise;
var doubleFulfillPromiseConstructor = ($___46__46__47_lib_47_fulfill_46_js__ = require("../lib/fulfill.js"), $___46__46__47_lib_47_fulfill_46_js__ && $___46__46__47_lib_47_fulfill_46_js__.__esModule && $___46__46__47_lib_47_fulfill_46_js__ || {default: $___46__46__47_lib_47_fulfill_46_js__}).doubleFulfillPromiseConstructor;
describe('promise double fulfill test', (function() {
  it('should get double fulfill error', (function(callback) {
    var errorHandler = (function(err) {
      return callback();
    });
    var createPromise = doubleFulfillPromiseConstructor(defaultCreatePromise, errorHandler);
    createPromise((function(resolve, reject) {
      resolve(1);
      resolve(2);
    }));
  }));
}));
