'use strict';

const Redis = require('redis');

exports.plugin = function hemeraRedisCache(options) {

  const hemera = this;
  const client = Redis.createClient(options.redis);
  const topic = 'redis-cache';

  client.on('ready', function () {

    hemera.log.info('Redis Cache is ready')
  });

  client.on('end', function () {

    hemera.log.warn('Redis client connection closed')
  });

  client.on('reconnecting', function (msg) {

    hemera.log.info(msg, 'Redis client is reconnecting')
  });

  client.on('warning', function (msg) {

    hemera.log.warn(msg, 'Redis client warning')
  });

  client.on('error', function (err) {

    hemera.log.fatal(err);
    hemera.fatal()
  });


  hemera.add({
    topic,
    cmd: 'set'
  }, function (req, cb) {

    client.set(req.key, req.value, cb);

    if(req.ttlSeconds) {
      client.expire(req.key, req.ttlSeconds);
    }

  });

  hemera.add({
    topic,
    cmd: 'get'
  }, function (req, cb) {

    client.get(req.key, cb)

  });

  hemera.add({
    topic,
    cmd: 'hmset'
  }, function (req, cb) {

    client.hmset(req.key, req.values, cb)

  });

  hemera.add({
    topic,
    cmd: 'hget'
  }, function (req, cb) {

    client.hget(req.key, req.values, cb)

  });

  hemera.add({
    topic,
    cmd: 'hgetall'
  }, function (req, cb) {

    client.hgetall(req.key, cb)

  });

  hemera.add({
    topic,
    cmd: 'expire'
  }, function (req, cb) {

    client.expire(req.key, req.ttlSeconds, cb)

  });

  hemera.add({
    topic,
    cmd: 'exists'
  }, function (req, cb) {

    client.exists(req.key, cb)

  });

  hemera.add({
    topic,
    cmd: 'ttl'
  }, function (req, cb) {

    client.ttl(req.key, cb)

  })

};

exports.options = {
  redis: null
};

exports.attributes = {
  name: 'hemera-redis-cache'
};
