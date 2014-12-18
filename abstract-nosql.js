// Generated by CoffeeScript 1.8.0
(function() {
  var AbstractChainedBatch, AbstractError, AbstractIterator, AbstractNoSQL, AbstractObject, CloseError, Errors, InvalidArgumentError, NotImplementedError, OpenError, inherits, setImmediate, util, xtend;

  xtend = require("xtend");

  AbstractObject = require("abstract-object");

  util = require("abstract-object/lib/util");

  inherits = util.inherits;

  Errors = require("./abstract-error");

  AbstractIterator = require("./abstract-iterator");

  AbstractChainedBatch = require("./abstract-chained-batch");

  setImmediate = global.setImmediate || process.nextTick;

  AbstractError = Errors.AbstractError;

  NotImplementedError = Errors.NotImplementedError;

  InvalidArgumentError = Errors.InvalidArgumentError;

  OpenError = Errors.OpenError;

  CloseError = Errors.CloseError;

  module.exports.AbstractNoSQL = AbstractNoSQL = (function() {
    inherits(AbstractNoSQL, AbstractObject);

    function AbstractNoSQL() {
      AbstractNoSQL.__super__.constructor.apply(this, arguments);
    }

    AbstractNoSQL.prototype.init = function(location) {
      if (location && typeof location !== "string") {
        throw new InvalidArgumentError("constructor requires a location string argument");
      }
      return this.location = location;
    };

    AbstractNoSQL.prototype.__defineGetter__("opened", function() {
      return !!this._opened;
    });

    AbstractNoSQL.prototype.setOpened = function(aValue) {
      if (aValue) {
        this._opened = true;
        this.emit("ready");
        return this.emit("open");
      } else {
        this._opened = false;
        return this.emit("closed");
      }
    };

    AbstractNoSQL.prototype.isExistsSync = function(key, options) {
      var err, result;
      if (this._isExistsSync) {
        result = this._isExistsSync(key, options);
        return result;
      } else if (this._getSync) {
        try {
          this._getSync(key, options);
          return true;
        } catch (_error) {
          err = _error;
          if (AbstractError.isNotFound(err)) {
            return false;
          } else {
            throw err;
          }
        }
      }
      throw new NotImplementedError();
    };

    AbstractNoSQL.prototype.getSync = function(key, options) {
      var result;
      if (this._getSync) {
        result = this._getSync(key, options);
        return result;
      }
      throw new NotImplementedError();
    };

    AbstractNoSQL.prototype.putSync = function(key, value, options) {
      var result;
      if (this._putSync) {
        result = this._putSync(key, value, options);
        return result;
      }
      throw new NotImplementedError();
    };

    AbstractNoSQL.prototype.delSync = function(key, options) {
      var result;
      if (this._delSync) {
        result = this._delSync(key, options);
        return result;
      }
      throw new NotImplementedError();
    };

    AbstractNoSQL.prototype.batchSync = function(operations, options) {
      var result;
      if (this._batchSync) {
        result = this._batchSync(operations, options);
        return result;
      }
      throw new NotImplementedError();
    };

    AbstractNoSQL.prototype.approximateSizeSync = function(start, end) {
      var result;
      if (this._approximateSizeSync) {
        result = this._approximateSizeSync(start, end);
        return result;
      }
      throw new NotImplementedError();
    };

    AbstractNoSQL.prototype.openSync = function(options) {
      var result;
      if (this._openSync) {
        result = this._openSync(options);
        if (result) {
          this.setOpened(true);
        }
        return result;
      }
      throw new NotImplementedError();
    };

    AbstractNoSQL.prototype.closeSync = function() {
      var result;
      if (this._closeSync) {
        result = this._closeSync();
        if (result) {
          this.setOpened(false);
        }
        return result;
      }
      throw new NotImplementedError();
    };

    AbstractNoSQL.prototype._open = function(options, callback) {
      var that;
      that = this;
      if (this._openSync) {
        return setImmediate(function() {
          var err, result;
          result = void 0;
          try {
            result = that._openSync(options);
          } catch (_error) {
            err = _error;
            callback(err);
            return;
          }
          if (result) {
            return callback(null, result);
          } else {
            return callback(new OpenError("can not open database."));
          }
        });
      } else {
        return setImmediate(callback);
      }
    };

    AbstractNoSQL.prototype._close = function(callback) {
      var that;
      that = this;
      if (this._closeSync) {
        return setImmediate(function() {
          var err, result;
          result = void 0;
          try {
            result = that._closeSync();
          } catch (_error) {
            err = _error;
            callback(err);
            return;
          }
          if (result) {
            return callback(null, result);
          } else {
            return callback(new CloseError("can not close database."));
          }
        });
      } else {
        return setImmediate(callback);
      }
    };

    AbstractNoSQL.prototype._isExists = function(key, options, callback) {
      var that;
      that = this;
      if (this._isExistsSync) {
        return setImmediate(function() {
          var err, result;
          result = void 0;
          try {
            result = that._isExistsSync(key, options);
          } catch (_error) {
            err = _error;
            callback(err);
            return;
          }
          return callback(null, result);
        });
      } else {
        return this._get(key, options, function(err, value) {
          if (err) {
            if (AbstractError.isNotFound(err)) {
              return callback(null, false);
            } else {
              return callback(err);
            }
          } else {
            return callback(null, true);
          }
        });
      }
    };

    AbstractNoSQL.prototype._get = function(key, options, callback) {
      var that;
      that = this;
      if (this._getSync) {
        return setImmediate(function() {
          var err, result;
          result = void 0;
          try {
            result = that._getSync(key, options);
          } catch (_error) {
            err = _error;
            callback(err);
            return;
          }
          return callback(null, result);
        });
      } else {
        return setImmediate(callback);
      }
    };

    AbstractNoSQL.prototype._put = function(key, value, options, callback) {
      var that;
      that = this;
      if (this._putSync) {
        return setImmediate(function() {
          var err, result;
          result = void 0;
          try {
            result = that._putSync(key, value, options);
          } catch (_error) {
            err = _error;
            callback(err);
            return;
          }
          return callback(null, result);
        });
      } else {
        return setImmediate(callback);
      }
    };

    AbstractNoSQL.prototype._del = function(key, options, callback) {
      var that;
      that = this;
      if (this._delSync) {
        return setImmediate(function() {
          var err, result;
          result = void 0;
          try {
            result = that._delSync(key, options);
          } catch (_error) {
            err = _error;
            callback(err);
            return;
          }
          return callback(null, result);
        });
      } else {
        return setImmediate(callback);
      }
    };

    AbstractNoSQL.prototype._batch = function(array, options, callback) {
      var that;
      that = this;
      if (this._batchSync) {
        return setImmediate(function() {
          var err, result;
          result = void 0;
          try {
            result = that._batchSync(array, options);
          } catch (_error) {
            err = _error;
            callback(err);
            return;
          }
          return callback(null, result);
        });
      } else {
        return setImmediate(callback);
      }
    };

    AbstractNoSQL.prototype._approximateSize = function(start, end, callback) {
      var that;
      that = this;
      if (this._approximateSizeSync) {
        return setImmediate(function() {
          var err, result;
          result = void 0;
          try {
            result = that._approximateSizeSync(start, end);
          } catch (_error) {
            err = _error;
            callback(err);
            return;
          }
          return callback(null, result);
        });
      } else {
        return setImmediate(callback);
      }
    };

    AbstractNoSQL.prototype.open = function(options, callback) {
      var that;
      if (typeof options === "function") {
        callback = options;
      }
      if (typeof options !== "object") {
        options = {};
      }
      options.createIfMissing = options.createIfMissing !== false;
      options.errorIfExists = !!options.errorIfExists;
      if (callback) {
        that = this;
        return this._open(options, function(err, result) {
          if (err == null) {
            that.setOpened(true);
          }
          return callback(err, result);
        });
      } else {
        return this.openSync(options);
      }
    };

    AbstractNoSQL.prototype.close = function(callback) {
      var that;
      if (callback) {
        if (typeof callback === "function") {
          that = this;
          return this._close(function(err, result) {
            if (err == null) {
              that.setOpened(false);
            }
            return callback(err, result);
          });
        } else {
          throw new Error("close() requires callback function argument");
        }
      } else {
        return this.closeSync();
      }
    };

    AbstractNoSQL.prototype.isExists = function(key, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      if (!this._isBuffer(key)) {
        key = String(key);
      }
      if (callback) {
        return this._isExists(key, options, callback);
      } else {
        return this.isExistsSync(key, options);
      }
    };

    AbstractNoSQL.prototype.get = function(key, options, callback) {
      var err;
      err = void 0;
      if (typeof options === "function") {
        callback = options;
      }
      if (err = this._checkKey(key, "key", this._isBuffer)) {
        if (callback) {
          return callback(err);
        } else {
          throw err;
        }
      }
      if (!this._isBuffer(key)) {
        key = String(key);
      }
      if (typeof options !== "object") {
        options = {};
      }
      options.asBuffer = options.asBuffer !== false;
      if (callback) {
        return this._get(key, options, callback);
      } else {
        return this.getSync(key, options);
      }
    };

    AbstractNoSQL.prototype.put = function(key, value, options, callback) {
      var err;
      err = void 0;
      if (typeof options === "function") {
        callback = options;
      }
      if (err = this._checkKey(key, "key", this._isBuffer)) {
        if (callback) {
          return callback(err);
        } else {
          throw err;
        }
      }
      if (!this._isBuffer(key)) {
        key = String(key);
      }
      if ((value != null) && !this._isBuffer(value) && !process.browser) {
        value = String(value);
      }
      if (typeof options !== "object") {
        options = {};
      }
      if (callback) {
        return this._put(key, value, options, callback);
      } else {
        return this.putSync(key, value, options);
      }
    };

    AbstractNoSQL.prototype.del = function(key, options, callback) {
      var err;
      err = void 0;
      if (typeof options === "function") {
        callback = options;
      }
      if (err = this._checkKey(key, "key", this._isBuffer)) {
        if (callback) {
          return callback(err);
        } else {
          throw err;
        }
      }
      if (!this._isBuffer(key)) {
        key = String(key);
      }
      if (typeof options !== "object") {
        options = {};
      }
      if (callback) {
        return this._del(key, options, callback);
      } else {
        return this.delSync(key, options);
      }
    };

    AbstractNoSQL.prototype.batch = function(array, options, callback) {
      var e, err, vError, _i, _len;
      if (!arguments.length) {
        return this._chainedBatch();
      }
      if (typeof options === "function") {
        callback = options;
      }
      if (typeof array === "function") {
        callback = array;
      }
      if (!Array.isArray(array)) {
        vError = new Error("batch(array) requires an array argument");
        if (callback) {
          return callback(vError);
        } else {
          throw vError;
        }
      }
      if (!options || typeof options !== "object") {
        options = {};
      }
      for (_i = 0, _len = array.length; _i < _len; _i++) {
        e = array[_i];
        if (typeof e !== "object") {
          continue;
        }
        if (err = this._checkKey(e.type, "type", this._isBuffer)) {
          if (callback) {
            return callback(err);
          } else {
            throw err;
          }
        }
        if (err = this._checkKey(e.key, "key", this._isBuffer)) {
          if (callback) {
            return callback(err);
          } else {
            throw err;
          }
        }
      }
      if (callback) {
        return this._batch(array, options, callback);
      } else {
        return this.batchSync(array, options);
      }
    };

    AbstractNoSQL.prototype.approximateSize = function(start, end, callback) {
      if ((start == null) || (end == null) || typeof start === "function" || typeof end === "function") {
        throw new Error("approximateSize() requires valid `start`, `end` and `callback`(for async) arguments");
      }
      if (!this._isBuffer(start)) {
        start = String(start);
      }
      if (!this._isBuffer(end)) {
        end = String(end);
      }
      if (callback) {
        return this._approximateSize(start, end, callback);
      } else {
        return this.approximateSizeSync(start, end);
      }
    };

    AbstractNoSQL.prototype._setupIteratorOptions = function(options) {
      var self;
      self = this;
      options = xtend(options);
      ["start", "end", "gt", "gte", "lt", "lte"].forEach(function(o) {
        if (options[o] && self._isBuffer(options[o]) && options[o].length === 0) {
          return delete options[o];
        }
      });
      options.reverse = !!options.reverse;
      options.keys = options.keys !== false;
      options.values = options.values !== false;
      options.limit = ("limit" in options ? options.limit : -1);
      options.keyAsBuffer = options.keyAsBuffer === true;
      options.valueAsBuffer = options.valueAsBuffer === true;
      return options;
    };

    AbstractNoSQL.prototype.IteratorClass = AbstractIterator;

    AbstractNoSQL.prototype.iterator = function(options) {
      if (typeof options !== "object") {
        options = {};
      }
      options = this._setupIteratorOptions(options);
      if (typeof this._iterator === "function") {
        return this._iterator(options);
      }
      return new this.IteratorClass(this, options);
    };

    AbstractNoSQL.prototype._chainedBatch = function() {
      return new AbstractChainedBatch(this);
    };

    AbstractNoSQL.prototype._isBuffer = function(obj) {
      return Buffer.isBuffer(obj);
    };

    AbstractNoSQL.prototype._checkKey = function(obj, type) {
      if (obj == null) {
        return new InvalidArgumentError(type + " cannot be `null` or `undefined`");
      }
      if (this._isBuffer(obj)) {
        if (obj.length === 0) {
          return new InvalidArgumentError(type + " cannot be an empty Buffer");
        }
      } else {
        if (String(obj) === "") {
          return new InvalidArgumentError(type + " cannot be an empty String");
        }
      }
    };

    AbstractNoSQL.prototype.isOpen = function() {
      return !!this._opened;
    };

    return AbstractNoSQL;

  })();

  module.exports.AbstractLevelDOWN = AbstractNoSQL;

  module.exports.AbstractIterator = AbstractIterator;

  module.exports.AbstractChainedBatch = AbstractChainedBatch;

}).call(this);
