// @flow

/*!
 * hemera
 * Copyright(c) 2016 Dustin Deus (deusdustin@gmail.com)
 * MIT Licensed
 */

import _ from 'lodash'
import Crypto from 'crypto'

/**
 * @class Util
 */
class Util {

  /**
   *
   *
   * @param {Array<Function>} array
   * @param {Function} method
   * @param {Function} callback
   *
   * @memberOf Util
   */
  static serial(array: Array<Function> , method: Function, callback: Function) {

    if (!array.length) {

      callback()
    } else {

      let i = 0;

      const iterate = function () {

        const done = function (err, value, pass) {

          if (err) {

            callback(err)
          } else if (!pass && value) {

            callback(null, value)
          } else {

            i = i + 1

            if (i < array.length) {

              iterate()
            } else {

              callback(null, value)
            }
          }
        }

        method(array[i], done, i)
      }

      iterate()
    }
  }
  /**
   * @returns
   *
   * @memberOf Util
   */
  static randomId() {

    return Crypto.randomBytes(16).toString('hex')
  }

  /**
   * Get high resolution time in nanoseconds
   *
   * @static
   * @returns
   *
   * @memberOf Util
   */
  static nowHrTime() {

    const hrtime = process.hrtime()
    return Math.floor(hrtime[0] * 1000000 + hrtime[1] / 1000)
  }

  /**
   * @static
   * @param {any} obj
   * @returns
   *
   * @memberOf Util
   */
  static cleanPattern(obj) {

    if (obj === null) return obj

    return _.pickBy(obj, function (val, prop: string) {
      return !_.includes(prop, '$')
    })
  }

  /**
   * @param {any} args
   * @returns
   *
   * @memberOf Util
   */
  static pattern(args) {

    if (_.isString(args)) {
      return args
    }

    args = args || {}
    let sb = []
    _.each(args, function (v, k) {
      if (!~k.indexOf('$') && !_.isFunction(v)) {
        sb.push(k + ':' + v)
      }
    })

    sb.sort()

    return sb.join(',')
  }
}

module.exports = Util
