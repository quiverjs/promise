import { create as createDomain } from 'domain'

export var domainProtectedPromise = (createPromise, construct) =>
  createPromise((resolve, reject) => {
    var domain = createDomain()

    domain.on('error', err => reject(err))
    domain.run(() => construct(resolve, reject))
  })

export var domainPromiseConstructor = (createPromise) =>
  construct => domainProtectedPromise(createPromise, construct)