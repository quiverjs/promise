quiver-promise
==============

`quiver-promise` is a promise constructor wrapper library targeting to make promise debugging easier. This library is based on the [promise debugging techniques](https://github.com/soareschen/es6-promise-debugging) that I came out with.

Instead of calling the Promise constructor directly with `new Promise(...)`, promises should be constructed via a dynamic `createPromise(...)` constructor function. `quiver-promise` provide this function that can be changed at runtime to debug constructed promises. An example usage is as follow:

```javascript
var promiseLib = require('quiver-promise')

promiseLib.enableDebug({
  errorHandler: console.log,
  timeout: 10 * 1000
})

promiseLib.createPromise(function(resolve, reject) {
  ...
})
```

The `enableDebug()` method will add debugging probes to promise construction to detect potential promise errors. This affects all future call to `createPromise()`. Sine the debugging probes may have significant performance impact, it is recommended to only activate it during devvelopment.