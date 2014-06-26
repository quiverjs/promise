import { domainPromiseConstructor } from './domain.js'
import { timeoutPromiseConstructor } from './timeout.js'
import { uncaughtPromiseConstructor } from './uncaught.js'
import { doubleFulfillPromiseConstructor } from './fulfill.js'

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

export var resolve = val => Promise.resolve(val)
export var reject = val => Prommise.reject(val)

export var safePromised = fn =>
  (...args) =>
    createPromise(resolve =>
      resolve(fn(...args)))