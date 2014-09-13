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
  promiseChain: {get: function() {
      return promiseChain;
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
  promisify: {get: function() {
      return promisify;
    }},
  runAsync: {get: function() {
      return runAsync;
    }},
  async: {get: function() {
      return async;
    }},
  timeout: {get: function() {
      return timeout;
    }},
  promisifyMethod: {get: function() {
      return promisifyMethod;
    }},
  promisifyMethods: {get: function() {
      return promisifyMethods;
    }},
  __esModule: {value: true}
});
var $__domain_46_js__,
    $__timeout_46_js__,
    $__uncaught_46_js__,
    $__fulfill_46_js__,
    $__quiver_45_error__;
var domainPromiseConstructor = ($__domain_46_js__ = require("./domain.js"), $__domain_46_js__ && $__domain_46_js__.__esModule && $__domain_46_js__ || {default: $__domain_46_js__}).domainPromiseConstructor;
var timeoutPromiseConstructor = ($__timeout_46_js__ = require("./timeout.js"), $__timeout_46_js__ && $__timeout_46_js__.__esModule && $__timeout_46_js__ || {default: $__timeout_46_js__}).timeoutPromiseConstructor;
var uncaughtPromiseConstructor = ($__uncaught_46_js__ = require("./uncaught.js"), $__uncaught_46_js__ && $__uncaught_46_js__.__esModule && $__uncaught_46_js__ || {default: $__uncaught_46_js__}).uncaughtPromiseConstructor;
var doubleFulfillPromiseConstructor = ($__fulfill_46_js__ = require("./fulfill.js"), $__fulfill_46_js__ && $__fulfill_46_js__.__esModule && $__fulfill_46_js__ || {default: $__fulfill_46_js__}).doubleFulfillPromiseConstructor;
var error = ($__quiver_45_error__ = require("quiver-error"), $__quiver_45_error__ && $__quiver_45_error__.__esModule && $__quiver_45_error__ || {default: $__quiver_45_error__}).error;
var defaultCreatePromise = (function(construct) {
  return new Promise(construct);
});
var currentCreatePromise = defaultCreatePromise;
var enableDebug = (function() {
  var $__7,
      $__8;
  var options = arguments[0] !== (void 0) ? arguments[0] : {};
  var $__6 = options,
      errorHandler = ($__7 = $__6.errorHandler) === void 0 ? console.log : $__7,
      timeout = ($__8 = $__6.timeout) === void 0 ? 10000 : $__8;
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
var promiseChain = (function(construct) {
  var token = {};
  return resolve(construct(token)).then((function(result) {
    if (result !== token)
      return reject(error(500, 'incomplete promise chain detected'));
  }));
});
var resolve = (function(val) {
  return createPromise((function(resolve) {
    return resolve(val);
  }));
});
var reject = (function(err) {
  return createPromise((function(resolve, reject) {
    return reject(err);
  }));
});
var safePromised = (function(fn) {
  return (function() {
    for (var args = [],
        $__5 = 0; $__5 < arguments.length; $__5++)
      args[$__5] = arguments[$__5];
    return createPromise((function(resolve) {
      return resolve(fn.apply(null, $traceurRuntime.spread(args)));
    }));
  });
});
var promisify = (function(fn) {
  return (function() {
    for (var args = [],
        $__5 = 0; $__5 < arguments.length; $__5++)
      args[$__5] = arguments[$__5];
    return createPromise((function(resolve, reject) {
      return fn.apply(null, $traceurRuntime.spread(args, [(function(err, result) {
        return err ? reject(err) : resolve(result);
      })]));
    }));
  });
});
var runAsync = (function(gen) {
  var doNext = (function(action) {
    try {
      var $__7 = action(),
          done = $__7.done,
          value = $__7.value;
    } catch (err) {
      return reject(err);
    }
    if (done)
      return value;
    return resolve(value).then((function(result) {
      return doNext((function() {
        return gen.next(result);
      }));
    }), (function(err) {
      return doNext((function() {
        return gen.throw(err);
      }));
    }));
  });
  return resolve(doNext((function() {
    return gen.next();
  })));
});
var async = (function(fn) {
  return (function() {
    for (var args = [],
        $__5 = 0; $__5 < arguments.length; $__5++)
      args[$__5] = arguments[$__5];
    return runAsync(fn.apply(null, $traceurRuntime.spread(args)));
  });
});
var timeout = (function(time) {
  return createPromise((function(resolve) {
    return setTimeout(resolve, time);
  }));
});
var promisifyMethod = (function(object, method) {
  return promisify((function() {
    var $__9;
    for (var args = [],
        $__5 = 0; $__5 < arguments.length; $__5++)
      args[$__5] = arguments[$__5];
    return ($__9 = object)[method].apply($__9, $traceurRuntime.spread(args));
  }));
});
var promisifyMethods = (function(object, methods) {
  return methods.reduce((function(result, method) {
    result[method] = promisifyMethod(object, method);
    return result;
  }), {});
});
