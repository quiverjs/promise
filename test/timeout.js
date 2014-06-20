var traceur = require('traceur')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

import { defaultCreatePromise } from '../lib/promise.js'
import { timeoutPromiseConstructor } from '../lib/timeout.js'

describe('promise timeout test', () => {
  it('should get timeout error', () => {
    var createPromise = timeoutPromiseConstructor(defaultCreatePromise, 200)
    var promise = createPromise((resolve, reject) => { })

    return promise.should.be.rejected
  })
})