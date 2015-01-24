import 'traceur'
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'

chai.use(chaiAsPromised)
let should = chai.should()

import { 
  safePromised, promisify, resolve, promiseChain 
} from '../lib/promise.js'

describe('safe promised test', () => {
  it('should return promise', () => {
    let fn = () => 'foo'
    let wrapped = safePromised(fn)

    wrapped().then((res) => 
      res.should.equal('foo')).should.be.fulfilled
  })

  it('should catch exception', () => {
    let fn = () => { throw new Error('test') }
    let wrapped = safePromised(fn)

    return wrapped().should.be.rejected
  })
})

describe('promisify test', () => {
  let asyncTimesTwo = (num, callback) => 
    process.nextTick(() => callback(null, num*2))

  let asyncError = (callback) =>
    process.nextTick(() => callback(new Error()))

  let promisedTimesTwo = promisify(asyncTimesTwo)
  let promisedError = promisify(asyncError)

  it('should convertible to promise', () =>
    promisedTimesTwo(3).should.eventually.equal(6))

  it('should reject async errors', () =>
    promisedError().should.be.rejected)
})