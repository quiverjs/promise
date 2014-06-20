var traceur = require('traceur')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

import { defaultCreatePromise } from '../lib/promise.js'
import { domainPromiseConstructor } from '../lib/domain.js'

describe('domain promise test', () => {
  it('should get domain error', () => {
    var createPromise = domainPromiseConstructor(
      defaultCreatePromise)

    var promise = createPromise((resolve, reject) => {
      process.nextTick(() => { throw new Error('domain error') })
    })

    return promise.should.be.rejected
  })
})