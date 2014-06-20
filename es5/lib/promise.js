"use strict";
Object.defineProperties(exports, {
  defaultCreatePromise: {get: function() {
      return defaultCreatePromise;
    }},
  enableDebug: {get: function() {
      return enableDebug;
    }},
  setPromiseConstructor: {get: function() {
      return setPromiseConstructor;
    }},
  createPromise: {get: function() {
      return createPromise;
    }},
  __esModule: {value: true}
});
var domainPromiseConstructor = $traceurRuntime.assertObject(require('./domain.js')).domainPromiseConstructor;
var timeoutPromiseConstructor = $traceurRuntime.assertObject(require('./timeout.js')).timeoutPromiseConstructor;
var uncaughtPromiseConstructor = $traceurRuntime.assertObject(require('./uncaught.js')).uncaughtPromiseConstructor;
var doubleFulfillPromiseConstructor = $traceurRuntime.assertObject(require('./fulfill.js')).doubleFulfillPromiseConstructor;
var defaultCreatePromise = (function(construct) {
  return new Promise(construct);
});
var currentCreatePromise = defaultCreatePromise;
var enableDebug = (function($__0) {
  var $__2,
      $__3;
  var $__1 = $traceurRuntime.assertObject($__0),
      errorHandler = ($__2 = $__1.errorHandler) === void 0 ? console.log : $__2,
      timeout = ($__3 = $__1.timeout) === void 0 ? 60000 : $__3;
  var createPromise = defaultCreatePromise;
  createPromise = uncaughtPromiseConstructor(createPromise, timeout, errorHandler);
  createPromise = domainPromiseConstructor(createPromise);
  createPromise = timeoutPromiseConstructor(createPromise, timeout);
  createPromise = doubleFulfillPromiseConstructor(createPromise, errorHandler);
  setPromiseConstructor(createPromise);
  return createPromise;
});
var setPromiseConstructor = (function(createPromise) {
  return currentCreatePromise = createPromise;
});
var createPromise = (function(construct) {
  return currentCreatePromise(construct);
});
