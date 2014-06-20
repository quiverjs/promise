var traceur = require('traceur')

import { defaultCreatePromise } from '../lib/promise.js'
import { doubleFulfillPromiseConstructor } from '../lib/fulfill.js'

describe('promise double fulfill test', () => {
  it('should get double fulfill error', (callback) => {
    var errorHandler = err => callback()

    var createPromise = doubleFulfillPromiseConstructor(
      defaultCreatePromise, errorHandler)

    createPromise((resolve, reject) => {
      resolve(1)
      resolve(2)
    })
  })
})