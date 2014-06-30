"use strict";
Object.defineProperties(exports, {
  detectUncaughtPromise: {get: function() {
      return detectUncaughtPromise;
    }},
  uncaughtPromiseConstructor: {get: function() {
      return uncaughtPromiseConstructor;
    }},
  __esModule: {value: true}
});
var wrapCallback = (function(callback) {
  if (!callback)
    return callback;
  return (function() {
    for (var args = [],
        $__0 = 0; $__0 < arguments.length; $__0++)
      args[$__0] = arguments[$__0];
    var result = callback.apply(null, $traceurRuntime.toObject(args));
    if (result && result.__endPromiseChain) {
      result.__endPromiseChain();
    }
    return result;
  });
});
var detectUncaughtPromise = (function(promise, timeout, errorHandler, prevCaught) {
  var wrappedPromise = Object.create(promise);
  var chained = false;
  var stack = new Error().stack;
  wrappedPromise.then = (function(onResolved, onRejected) {
    chained = true;
    var nextCaught = onRejected ? true : false;
    var newPromise = promise.then(wrapCallback(onResolved), wrapCallback(onRejected));
    return detectUncaughtPromise(newPromise, timeout, errorHandler, nextCaught);
  });
  wrappedPromise.catch = (function(catchHandler) {
    chained = true;
    var newPromise = promise.catch(wrapCallback(catchHandler));
    return detectUncaughtPromise(newPromise, timeout, errorHandler, true);
  });
  wrappedPromise.__endPromiseChain = (function() {
    return chained = true;
  });
  setTimeout((function() {
    if (chained)
      return;
    if (!prevCaught) {
      var message = ("uncaught terminal promise detected. last then() was on: \n  " + stack);
      errorHandler(new Error(message));
    } else {
      promise.catch((function(err) {
        var message = ("exception occured inside error handler of last promise chain: \n  " + stack + " \nwith error: \n  " + err);
        errorHandler(new Error(message));
      }));
    }
  }), timeout);
  return wrappedPromise;
});
var uncaughtPromiseConstructor = (function(createPromise, timeout, errorHandler) {
  return (function(construct) {
    var promise = createPromise(construct);
    return detectUncaughtPromise(promise, timeout, errorHandler, false);
  });
});
