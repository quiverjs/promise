var traceur = require('traceur')

import { defaultCreatePromise } from '../lib/promise.js'
import { uncaughtPromiseConstructor } from '../lib/uncaught.js'

describe('promise uncaught error test', () => {
  it('should get uncaught error', callback => {
    var errorHandler = err => callback()

    var createPromise = uncaughtPromiseConstructor(
      defaultCreatePromise, 200, errorHandler)

    createPromise((resolve, reject) => {
      reject(new Error('ignored rejection'))
    }).then(() => callback(new Error('should never resolved')))
  })

  it('should catch error in catch handler', callback => {
    var errorHandler = err => callback()

    var createPromise = uncaughtPromiseConstructor(
      defaultCreatePromise, 200, errorHandler)

    createPromise((resolve, reject) => {
      reject('ignored rejection')
    }).catch(err => { throw new Error('error within catch handler') })
  })
})