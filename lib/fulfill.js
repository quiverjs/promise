import { error } from 'quiver-error'

export var detectDoubleFulfilledPromise = (createPromise, construct, errorHandler) =>
  createPromise((resolve, reject) => {
    var fulfilled = false

    var wrap = fulfill =>
      val => {
        if(fulfilled) errorHandler(error(500, 
          'promise is fulfilled multiple time'))

        fulfilled = true
        fulfill(val)
      }

    construct(wrap(resolve), wrap(reject))
  })

export var doubleFulfillPromiseConstructor = (createPromise, errorHandler) =>
  construct => detectDoubleFulfilledPromise(createPromise, construct, errorHandler)