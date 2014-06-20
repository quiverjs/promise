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
var createDomain = $traceurRuntime.assertObject(require('domain')).create;
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
