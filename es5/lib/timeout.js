"use strict";
Object.defineProperties(exports, {
  timeoutPromise: {get: function() {
      return timeoutPromise;
    }},
  timeoutPromiseConstructor: {get: function() {
      return timeoutPromiseConstructor;
    }},
  __esModule: {value: true}
});
var error = $traceurRuntime.assertObject(require('quiver-error')).error;
var timeoutPromise = (function(createPromise, construct, timeout) {
  return createPromise((function(resolve, reject) {
    construct(resolve, reject);
    setTimeout((function() {
      return reject(error(504, 'promise timeout'));
    }), timeout);
  }));
});
var timeoutPromiseConstructor = (function(createPromise, timeout) {
  return (function(construct) {
    return timeoutPromise(createPromise, construct, timeout);
  });
});
