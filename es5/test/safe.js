"use strict";
var traceur = require('traceur');
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();
var safePromised = $traceurRuntime.assertObject(require('../lib/promise.js')).safePromised;
describe('safe promised test', (function() {
  it('should return promise', (function() {
    var fn = (function() {
      return 'foo';
    });
    var wrapped = safePromised(fn);
    wrapped().then((function(res) {
      return res.should.equal('foo');
    })).should.be.fulfilled;
  }));
  it('should catch exception', (function() {
    var error = new Error('test');
    var fn = (function() {
      throw error;
    });
    var wrapped = safePromised(fn);
    wrapped().should.be.rejected;
  }));
}));
