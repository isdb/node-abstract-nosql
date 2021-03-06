var db
  , verifyNotFoundError = require('./util').verifyNotFoundError
  , isTypedArray        = require('./util').isTypedArray

module.exports.setUp = function (NoSqlDatabase, test, testCommon) {
  test('setUp common', testCommon.setUp)
  test('setUp db', function (t) {
    db = NoSqlDatabase(testCommon.location())
    db.open(t.end.bind(t))
  })
}

module.exports.args = function (test) {
}

module.exports.get = function (test) {
  test('test simple get()', function (t) {
    db.put('foo', 'bar', function (err) {
      t.error(err)
      db.get('foo', function (err, result) {
        t.error(err)
        t.ok(typeof result === 'string', 'should be string by default')

        /*
        var result
        if (isTypedArray(value)) {
          result = String.fromCharCode.apply(null, new Uint16Array(value))
        } else {
          t.ok(typeof Buffer != 'undefined' && value instanceof Buffer)
          try {
            result = value.toString()
          } catch (e) {
            t.error(e, 'should not throw when converting value to a string')
          }
        }
        */

        t.equal(result, 'bar')

        db.get('foo', {}, function (err, result) { // same but with {}
          t.error(err)
          t.ok(typeof result === 'string', 'should be string by default')

          /*
          var result
          if (isTypedArray(value)) {
            result = String.fromCharCode.apply(null, new Uint16Array(value))
          } else {
            t.ok(typeof Buffer != 'undefined' && value instanceof Buffer)
            try {
              result = value.toString()
            } catch (e) {
              t.error(e, 'should not throw when converting value to a string')
            }
          }*/

          t.equal(result, 'bar')

          db.get('foo', { asBuffer: false }, function (err, value) {
            t.error(err)
            t.ok(typeof value === 'string', 'should be string if not buffer')
            t.equal(value, 'bar')
            t.end()
          })
        })
      })
    })
  })

  test('test simultaniously get()', function (t) {
    db.put('hello', 'world', function (err) {
      t.error(err)
      var r = 0
        , done = function () {
            if (++r == 20)
              t.end()
          }
        , i = 0
        , j = 0

      for (; i < 10; ++i)
        db.get('hello', function(err, value) {
          t.error(err)
          t.equal(value.toString(), 'world')
          done()
        })

      for (; j < 10; ++j)
        db.get('not found', function(err, value) {
          t.ok(err, 'should error')
          t.ok(verifyNotFoundError(err), 'should have correct error message')
          t.ok(typeof value == 'undefined', 'value is undefined')
          done()
        })
    })
  })
}

module.exports.tearDown = function (test, testCommon) {
  test('tearDown', function (t) {
    db.close(testCommon.tearDown.bind(null, t))
  })
}

module.exports.sync = function (test) {
  test('sync', function (t) {
    if (db._getSync) {
      delete db.__proto__._get
    }
    t.end()
  })
}

module.exports.all = function (NoSqlDatabase, test, testCommon) {
  module.exports.setUp(NoSqlDatabase, test, testCommon)
  module.exports.args(test)
  module.exports.get(test)
  if (NoSqlDatabase.prototype._getSync) {
    module.exports.sync(test)
    module.exports.get(test)
  }
  module.exports.tearDown(test, testCommon)
}
