"use strict";
Object.defineProperties(exports, {
  domainProtectedPromise: {get: function() {
      return domainProtectedPromise;
    }},
  domainPromiseConstructor: {get: function() {
      return domainPromiseConstructor;
    }},
  __esModule: {value: true}
});
var $__domain__;
var domain = ($__domain__ = require("domain"), $__domain__ && $__domain__.__esModule && $__domain__ || {default: $__domain__}).default;
var createDomain = domain.create;
var domainProtectedPromise = (function(createPromise, construct) {
  return createPromise((function(resolve, reject) {
    var domain = createDomain();
    domain.on('error', (function(err) {
      return reject(err);
    }));
    domain.run((function() {
      return construct(resolve, reject);
    }));
  }));
});
var domainPromiseConstructor = (function(createPromise) {
  return (function(construct) {
    return domainProtectedPromise(createPromise, construct);
  });
});
