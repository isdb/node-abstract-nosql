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

module.exports.put = function (test) {
  test('test simple put()', function (t) {
    db.put('foo', 'bar', function (err) {
      t.error(err)
      db.get('foo', function (err, value) {
        t.error(err)
        var result = value.toString()
        if (isTypedArray(value))
          result = String.fromCharCode.apply(null, new Uint16Array(value))
        t.equal(result, 'bar', "should be ok")
        t.end()
      })
    })
  })
  
  if (process.browser) {
    test('test object value put()', function (t) {
      db.put('dood', {pete: 'sampras'}, function (err) {
        t.error(err)
        db.get('dood', { asBuffer: false }, function (err, value) {
          t.error(err)
          t.equal(JSON.stringify(value), JSON.stringify({pete: 'sampras'}))
          t.end()
        })
      })
    })
  }

}

module.exports.tearDown = function (test, testCommon) {
  test('tearDown', function (t) {
    db.close(testCommon.tearDown.bind(null, t))
  })
}

module.exports.sync = function (test) {
  test('sync', function (t) {
    if (db._putSync) {
      delete db.__proto__._put
    }
    t.end()
  })
}

module.exports.all = function (NoSqlDatabase, test, testCommon) {
  module.exports.setUp(NoSqlDatabase, test, testCommon)
  module.exports.args(test)
  module.exports.put(test)
  if (NoSqlDatabase.prototype._putSync) {
    module.exports.sync(test)
    module.exports.put(test)
  }
  module.exports.tearDown(test, testCommon)
}
