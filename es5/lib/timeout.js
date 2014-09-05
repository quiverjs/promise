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
var $__quiver_45_error__;
var error = ($__quiver_45_error__ = require("quiver-error"), $__quiver_45_error__ && $__quiver_45_error__.__esModule && $__quiver_45_error__ || {default: $__quiver_45_error__}).error;
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
