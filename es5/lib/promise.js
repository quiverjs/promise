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
var enableDebug = (function() {
  var $__1;
  var options = arguments[0] !== (void 0) ? arguments[0] : {};
  var $__0 = $traceurRuntime.assertObject(options),
      errorHandler = ($__1 = $__0.errorHandler) === void 0 ? console.log : $__1,
      timeout = ($__1 = $__0.timeout) === void 0 ? 10000 : $__1;
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
