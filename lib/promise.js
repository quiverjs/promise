import { domainPromiseConstructor } from './domain.js'
import { timeoutPromiseConstructor } from './timeout.js'
import { uncaughtPromiseConstructor } from './uncaught.js'
import { doubleFulfillPromiseConstructor } from './fulfill.js'

import { error } from 'quiver-error'

export var defaultCreatePromise = construct => new Promise(construct)

var currentCreatePromise = defaultCreatePromise

export var enableDebug = (options={}) => {
  var { errorHandler=console.log, timeout=10000 } = options

  var createPromise = defaultCreatePromise
  createPromise = uncaughtPromiseConstructor(createPromise, timeout, errorHandler)
  createPromise = domainPromiseConstructor(createPromise)
  createPromise = timeoutPromiseConstructor(createPromise, timeout)
  createPromise = doubleFulfillPromiseConstructor(createPromise, errorHandler)

  setPromiseConstructor(createPromise)

  return createPromise
}

export var setPromiseConstructor = createPromise =>
  currentCreatePromise = createPromise

export var createPromise = construct =>
  currentCreatePromise(construct)

export var promiseChain = construct => {
  var token = { }
  
  return resolve(construct(token)).then(result => {
    if(result !== token) return reject(error(500, 
      'incomplete promise chain detected'))
  })
}

export var resolve = val => 
  createPromise(resolve => resolve(val))

export var reject = err => 
  createPromise((resolve, reject) => reject(err))

export var safePromised = fn =>
  (...args) =>
    createPromise(resolve =>
      resolve(fn(...args)))

export var promisify = fn =>
  (...args) =>
    createPromise((resolve, reject) =>
      fn(...args, (err, result) =>
        err ? reject(err) : resolve(result)))

export var runAsync = gen => {
  var doNext = action => {
    try {
      var { done, value } = action()
    } catch(err) {
      return reject(err)
    }

    if(done) return value

    return resolve(value).then(
      result => doNext(() => gen.next(result)),
      err => doNext(() => gen.throw(err)))
  }

  return resolve(doNext(() => gen.next()))
}

export var async = fn =>
  (...args) => runAsync(fn(...args))

export var timeout = time =>
  createPromise(resolve =>
    setTimeout(resolve, time))