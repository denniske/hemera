'use strict'

const Store = require('../hemera-store')

/**
 *
 *
 * @class SqlStore
 * @extends {Store}
 */
class SqlStore extends Store {
  /**
   * Creates an instance of ArangoStore.
   *
   * @param {any} driver
   * @param {any} options
   *
   * @memberOf ArangoStore
   */
  constructor(driver, options) {

    super(driver, options)
  }

  // /**
  //  *
  //  *
  //  * @param {any} req
  //  * @param {any} cb
  //  *
  //  * @memberOf ArangoStore
  //  */
  // create(req, cb) {
  //
  //   this._driver.table(req.table).insert(req.data).asCallback(cb);
  // }


  /**
   * Create a new entity
   *
   * @param {object} data
   * @param {function} cb
   *
   * @memberOf Store
   */
  create(table, data, cb) {
    this._driver.table(table).insert(data).asCallback(cb);
  }


  /**
   * Find an entity
   *
   * @param {object} query
   * @param {object} options
   * @param {function} cb
   *
   * @memberOf Store
   */
  find(table, query, options, cb) {
    this._driver.table(table).where(query).asCallback(cb);
  }





}

module.exports = SqlStore
