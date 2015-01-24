import { error } from 'quiver-error'

export let createPromise = construct => 
  new Promise(construct)

export let resolve = val => 
  Promise.resolve(val)

export let reject = err => 
  Promise.reject(err)

export let timeout = time =>
  createPromise(resolve =>
    setTimeout(resolve, time))

export let safePromised = fn =>
  (...args) =>
    createPromise(resolve =>
      resolve(fn(...args)))

export let promisify = fn =>
  (...args) =>
    createPromise((resolve, reject) =>
      fn(...args, (err, result) =>
        err ? reject(err) : resolve(result)))

export let runAsync = gen => {
  let doNext = action => {
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

export let async = fn =>
  (...args) => 
    resolve(fn(...args)).then(runAsync)

export let promisifyMethod = (object, method) =>
  promisify((...args) =>
    object[method](...args))

export let promisifyMethods = (object, methods) =>
  methods.reduce((result, method) => {
    result[method] = promisifyMethod(object, method)
    return result
  }, Object.create(object))