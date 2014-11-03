import { error } from 'quiver-error'

export var createPromise = construct => 
  new Promise(construct)

export var resolve = val => 
  Promise.resolve(val)

export var reject = err => 
  Promise.reject(err)

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

export var promisifyMethod = (object, method) =>
  promisify((...args) =>
    object[method](...args))

export var promisifyMethods = (object, methods) =>
  methods.reduce((result, method) => {
    result[method] = promisifyMethod(object, method)
    return result
  }, { })
