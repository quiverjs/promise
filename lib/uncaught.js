import { error } from 'quiver-error'

export var detectUncaughtPromise = (promise, timeout, errorHandler, prevCaught) => {
  var wrappedPromise = Object.create(promise)

  var chained = false
  var stack = new Error().stack

  wrappedPromise.then = (onResolved, onRejected) => {
    chained = true
    var nextCaught = onRejected ? true : false

    var newPromise = promise.then(onResolved, onRejected)
    return detectUncaughtPromise(newPromise, timeout, errorHandler, nextCaught)
  }

  wrappedPromise.catch = (catchHandler) => {
    chained = true

    var newPromise = promise.catch(catchHandler)
    return detectUncaughtPromise(newPromise, timeout, errorHandler, true)
  }

  setTimeout(() => {
    if(chained) return

    if(!prevCaught) {
      var message = 
`uncaught terminal promise detected. last then() was on: 
  ${stack}`

      errorHandler(new Error(message))

    } else {
      promise.catch(err => {
        var message = 
`exception occured inside error handler of last promise chain: 
  ${stack} 
with error: 
  ${err}`

        errorHandler(new Error(message))
      })
    }

  }, timeout)

  return wrappedPromise
}

export var uncaughtPromiseConstructor = (createPromise, timeout, errorHandler) => 
  construct => {
    var promise = createPromise(construct)
    return detectUncaughtPromise(promise, timeout, errorHandler, false)
  }