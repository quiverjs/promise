var traceur = require('traceur')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

chai.use(chaiAsPromised)
chai.should()

import { enableDebug } from '../lib/promise.js'

describe('promise integrated test', () => {
  it('should get timeout error', () => {
    var createPromise = enableDebug({ timeout: 200 })
    var promise = createPromise((resolve, reject) => { })

    return promise.should.be.rejected
  })

  it('should get domain error', () => {
    var createPromise = enableDebug()

    var promise = createPromise((resolve, reject) => {
      process.nextTick(() => { throw new Error('domain error') })
    })

    return promise.should.be.rejected
  })

  it('should get double fulfill error', callback => {
    var errorHandler = err => callback()

    var createPromise = enableDebug({ errorHandler })

    createPromise((resolve, reject) => {
      resolve(1)
      resolve(2)
    })
  })

  it('should get uncaught error', callback => {
    var errorHandler = err => callback()

    var createPromise = enableDebug({ errorHandler, timeout: 200 })

    createPromise((resolve, reject) => {
      reject(new Error('ignored rejection'))
    }).then(() => callback(new Error('should never resolved')))
  })

  it('should catch error in catch handler', callback => {
    var errorHandler = err => callback()

    var createPromise = enableDebug({ errorHandler, timeout: 200 })

    createPromise((resolve, reject) => {
      reject(new Error('ignored rejection'))
    }).catch(err => { throw new Error('error within catch handler') })
  })
})