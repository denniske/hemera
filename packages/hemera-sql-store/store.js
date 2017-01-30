
const Store = require('../hemera-store');

/**
 *
 *
 * @class SqlStore
 * @extends {Store}
 */
class SqlStore extends Store {
  /**
   * Creates an instance of SqlStore.
   *
   * @param {any} driver
   * @param {any} options
   *
   * @memberOf SqlStore
   */
  constructor(driver, options) {

    super(driver, options)
  }

  /**
   * Create a new entity
   *
   * @param table
   * @param {object} data
   * @param {function} cb
   *
   * @memberOf SqlStore
   */
  create(table, data, cb) {
    this._driver.table(table).insert(data).asCallback(cb);
  }

  /**
   * Find an entity
   *
   * @param table
   * @param {object} query
   * @param {object} options
   * @param {function} cb
   *
   * @memberOf SqlStore
   */
  find(table, query, cb) {
    this._driver.table(table).where(query).asCallback(cb);
  }

  /**
   * Update an entity by id
   *
   * @param table
   * @param id
   * @param data
   * @param {function} cb
   *
   * @memberOf SqlStore
   */
  updateById(table, id, data, cb) {
    this._driver.table(table).where(id).update(data).asCallback(cb);
  }

  /**
   * Remove an entity by id
   *
   * @param table
   * @param id
   * @param {function} cb
   *
   * @memberOf SqlStore
   */
  removeById(table, id, cb) {
    this._driver.table(table).where(id).del().asCallback(cb);
  }
}

module.exports = SqlStore;
