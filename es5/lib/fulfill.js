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
var error = $traceurRuntime.assertObject(require('quiver-error')).error;
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
