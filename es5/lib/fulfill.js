"use strict";
Object.defineProperties(exports, {
  detectDoubleFulfilledPromise: {get: function() {
      return detectDoubleFulfilledPromise;
    }},
  doubleFulfillPromiseConstructor: {get: function() {
      return doubleFulfillPromiseConstructor;
    }},
  __esModule: {value: true}
});
var $__quiver_45_error__;
var error = ($__quiver_45_error__ = require("quiver-error"), $__quiver_45_error__ && $__quiver_45_error__.__esModule && $__quiver_45_error__ || {default: $__quiver_45_error__}).error;
var detectDoubleFulfilledPromise = (function(createPromise, construct, errorHandler) {
  return createPromise((function(resolve, reject) {
    var fulfilled = false;
    var wrap = (function(fulfill) {
      return (function(val) {
        if (fulfilled)
          errorHandler(error(500, 'promise is fulfilled multiple time'));
        fulfilled = true;
        fulfill(val);
      });
    });
    construct(wrap(resolve), wrap(reject));
  }));
});
var doubleFulfillPromiseConstructor = (function(createPromise, errorHandler) {
  return (function(construct) {
    return detectDoubleFulfilledPromise(createPromise, construct, errorHandler);
  });
});
