var traceur = require('traceur')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

import { 
  safePromised, promisify, resolve, promiseChain 
} from '../lib/promise.js'

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

    return wrapped().should.be.rejected
  })
})

describe('promisify test', () => {
  var asyncTimesTwo = (num, callback) => 
    process.nextTick(() => callback(null, num*2))

  var asyncError = (callback) =>
    process.nextTick(() => callback(new Error()))

  var promisedTimesTwo = promisify(asyncTimesTwo)
  var promisedError = promisify(asyncError)

  it('should convertible to promise', () =>
    promisedTimesTwo(3).should.eventually.equal(6))

  it('should reject async errors', () =>
    promisedError().should.be.rejected)
})

describe('promise chain test', () => {
  it('incomplete chain should be rejected', () => 
    promiseChain(complete => {
      // missing return
      resolve().then(() => complete)
    }).should.be.rejected)

  it('must return complete token as final resolved value', () =>
    promiseChain(complete =>
      resolve().then(() => complete)))
})