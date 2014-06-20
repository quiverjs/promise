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
var error = $traceurRuntime.assertObject(require('quiver-error')).error;
var detectUncaughtPromise = (function(promise, timeout, errorHandler, prevCaught) {
  var wrappedPromise = Object.create(promise);
  var chained = false;
  var stack = new Error().stack;
  wrappedPromise.then = (function(onResolved, onRejected) {
    chained = true;
    var nextCaught = onRejected ? true : false;
    var newPromise = promise.then(onResolved, onRejected);
    return detectUncaughtPromise(newPromise, timeout, errorHandler, nextCaught);
  });
  wrappedPromise.catch = (function(catchHandler) {
    chained = true;
    var newPromise = promise.catch(catchHandler);
    return detectUncaughtPromise(newPromise, timeout, errorHandler, true);
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
