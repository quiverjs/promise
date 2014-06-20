"use strict";
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var defaultCreatePromise = $traceurRuntime.assertObject(require('../lib/promise.js')).defaultCreatePromise;
var timeoutPromiseConstructor = $traceurRuntime.assertObject(require('../lib/timeout.js')).timeoutPromiseConstructor;
describe('promise timeout test', (function() {
  it('should get timeout error', (function() {
    var createPromise = timeoutPromiseConstructor(defaultCreatePromise, 200);
    var promise = createPromise((function(resolve, reject) {}));
    return promise.should.be.rejected;
  }));
}));
