import { domainPromiseConstructor } from './domain.js'
import { timeoutPromiseConstructor } from './timeout.js'
import { uncaughtPromiseConstructor } from './uncaught.js'
import { doubleFulfillPromiseConstructor } from './fulfill.js'

export var defaultCreatePromise = construct => new Promise(construct)

var currentCreatePromise = defaultCreatePromise

export var enableDebug = ({ errorHandler=console.log, timeout=60000 }) => {
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