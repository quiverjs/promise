var traceur = require('traceur')
var chai = require('chai')
var chaiAsPromised = require('chai-as-promised')

import { async, promisify } from '../lib/promise.js'

chai.use(chaiAsPromised)
chai.should()

var nextTick = promisify(process.nextTick)

var timesTwo = (num) => 
  nextTick().then(() => num*2)

var plusThree = (num) =>
  nextTick().then(() => num+3)

describe('async generator test', () => {
  it('nested yield', () => {
    var calc = async(function*(num) {
      return yield timesTwo(yield plusThree(num))
    })

    return calc(1).should.eventually.equal(8)
  })
})