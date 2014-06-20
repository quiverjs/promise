import { error } from 'quiver-error'

export var timeoutPromise = (createPromise, construct, timeout) =>
  createPromise((resolve, reject) => {
    construct(resolve, reject)

    setTimeout(() => reject(error(504, 'promise timeout')), timeout)
  })

export var timeoutPromiseConstructor = (createPromise, timeout) =>
  construct => timeoutPromise(createPromise, construct, timeout)