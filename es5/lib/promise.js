"use strict";
Object.defineProperties(exports, {
  createPromise: {get: function() {
      return createPromise;
    }},
  resolve: {get: function() {
      return resolve;
    }},
  reject: {get: function() {
      return reject;
    }},
  timeout: {get: function() {
      return timeout;
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
  promisifyMethod: {get: function() {
      return promisifyMethod;
    }},
  promisifyMethods: {get: function() {
      return promisifyMethods;
    }},
  __esModule: {value: true}
});
var $__quiver_45_error__;
var error = ($__quiver_45_error__ = require("quiver-error"), $__quiver_45_error__ && $__quiver_45_error__.__esModule && $__quiver_45_error__ || {default: $__quiver_45_error__}).error;
let createPromise = (function(construct) {
  return new Promise(construct);
});
let resolve = (function(val) {
  return Promise.resolve(val);
});
let reject = (function(err) {
  return Promise.reject(err);
});
let timeout = (function(time) {
  return createPromise((function(resolve) {
    return setTimeout(resolve, time);
  }));
});
let safePromised = (function(fn) {
  return (function() {
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
    return createPromise((function(resolve) {
      return resolve(fn.apply(null, $traceurRuntime.spread(args)));
    }));
  });
});
let promisify = (function(fn) {
  return (function() {
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
    return createPromise((function(resolve, reject) {
      return fn.apply(null, $traceurRuntime.spread(args, [(function(err, result) {
        return err ? reject(err) : resolve(result);
      })]));
    }));
  });
});
let runAsync = (function(gen) {
  let doNext = (function(action) {
    try {
      var $__2 = action(),
          done = $__2.done,
          value = $__2.value;
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
let async = (function(fn) {
  return (function() {
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
    return resolve(fn.apply(null, $traceurRuntime.spread(args))).then(runAsync);
  });
});
let promisifyMethod = (function(object, method) {
  return promisify((function() {
    var $__3;
    for (var args = [],
        $__1 = 0; $__1 < arguments.length; $__1++)
      args[$__1] = arguments[$__1];
    return ($__3 = object)[method].apply($__3, $traceurRuntime.spread(args));
  }));
});
let promisifyMethods = (function(object, methods) {
  return methods.reduce((function(result, method) {
    result[method] = promisifyMethod(object, method);
    return result;
  }), Object.create(object));
});
