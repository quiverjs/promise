"use strict";
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var defaultCreatePromise = $traceurRuntime.assertObject(require('../lib/promise.js')).defaultCreatePromise;
var domainPromiseConstructor = $traceurRuntime.assertObject(require('../lib/domain.js')).domainPromiseConstructor;
describe('domain promise test', (function() {
  it('should get domain error', (function() {
    var createPromise = domainPromiseConstructor(defaultCreatePromise);
    var promise = createPromise((function(resolve, reject) {
      process.nextTick((function() {
        throw new Error('domain error');
      }));
    }));
    return promise.should.be.rejected;
  }));
}));
