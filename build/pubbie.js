(function() {
  (function(window, document) {
    var callbacks, pubbie, tokens, uid;

    callbacks = {};
    uid = -1;
    tokens = {};
    pubbie = {
      subscribe: function(namespace, fn) {
        var token;

        if (!callbacks.hasOwnProperty(namespace)) {
          callbacks[namespace] = [];
        }
        token = (uid += 1);
        callbacks[namespace].push({
          id: token,
          fn: fn
        });
        tokens[token] = {
          namespace: namespace,
          index: callbacks[namespace].length - 1
        };
        return token;
      },
      publish: function(namespace, args) {
        var fn, fns, _fn, _i, _len;

        fns = callbacks[namespace] || [];
        _fn = function(fn) {
          return fn.fn.apply(this, args || []);
        };
        for (_i = 0, _len = fns.length; _i < _len; _i++) {
          fn = fns[_i];
          _fn(fn);
        }
        return this;
      },
      unsubscribe: function(token) {
        var isNamespace, ns;

        isNamespace = typeof token === "string";
        if (isNamespace) {
          callbacks[token] = [];
        } else {
          ns = tokens[token];
          callbacks[ns.namespace].splice(ns.index, 1);
        }
        return this;
      },
      reset: function() {
        callbacks = {};
        uid = -1;
        return this;
      }
    };
    return window.pubbie = window.pubbie || pubbie;
  })(window, window.document);

}).call(this);
