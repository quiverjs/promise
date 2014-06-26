var traceur = require('traceur')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

import { safePromised } from '../lib/promise.js'

describe('safe promised test', () => {
  it('should return promise', () => {
    var fn = () => 'foo'
    var wrapped = safePromised(fn)

    wrapped().then((res) => 
      res.should.equal('foo')).should.be.fulfilled
  })

  it('should catch exception', () => {
    var fn = () => { throw new Error('test') }
    var wrapped = safePromised(fn)

    wrapped().should.be.rejected
  })
})