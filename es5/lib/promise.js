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
  resolve: {get: function() {
      return resolve;
    }},
  reject: {get: function() {
      return reject;
    }},
  safePromised: {get: function() {
      return safePromised;
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
  var $__2;
  var options = arguments[0] !== (void 0) ? arguments[0] : {};
  var $__1 = $traceurRuntime.assertObject(options),
      errorHandler = ($__2 = $__1.errorHandler) === void 0 ? console.log : $__2,
      timeout = ($__2 = $__1.timeout) === void 0 ? 10000 : $__2;
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
var resolve = (function(val) {
  return Promise.resolve(val);
});
var reject = (function(val) {
  return Promise.reject(val);
});
var safePromised = (function(fn) {
  return (function() {
    for (var args = [],
        $__0 = 0; $__0 < arguments.length; $__0++)
      args[$__0] = arguments[$__0];
    return createPromise((function(resolve) {
      return resolve(fn.apply(null, $traceurRuntime.toObject(args)));
    }));
  });
});
