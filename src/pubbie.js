;(function (window, document, undefined) {
    var pubbie,
        callbacks,
        tokens,
        uid;

    /**
     * Callbacks holder
     * @type {Object}
     */
    callbacks = {};

    /**
     * Unique ID which is returned by the subscribe function to identify
     * subscribers.
     * @type {Number}
     */
    uid    = -1;

    /**
     * Token tracker. Make's removing functions a little bit quicker
     * when unsubscribe uses a token.
     * @type {Object}
     */
    tokens = {};

    /**
     * Pubbie
     * @type {Object}
     */
    pubbie = {

        /**
         * Subscribe to a particular namespace and the function will be ran
         * everytime the namespace receives a publish.
         * @param  {Mixed}    namespace
         * @param  {Function} fn
         * @return {Number}
         */
        subscribe: function (namespace, fn) {
            var token;

            if (! callbacks.hasOwnProperty(namespace)) {
                callbacks[namespace] = [];
            }

            token = (uid += 1);
            tokens[token] = namespace;

            callbacks[namespace].push({ id: token, fn: fn });
            return token;
        },

        /**
         * Publish to a namespace with optional parameters to pass to the
         * subscribing functions.
         * @param  {Mixed} namespace
         * @param  {Array} args       Optional parameters are passed in indexed order.
         * @return {This}
         */
        publish: function (namespace, args) {
            var fns  = callbacks[namespace] || [],
                size = fns.length,
                i    = 0;

            for (i = 0; i < size; i += 1) {
                fns[i].fn.apply(this, (args || []));
            }

            return this;
        },

        /**
         * Unsubscribe from a particular namespace or remove one subscription.
         * @param  {String|Number} token
         * @return {This}
         */
        unsubscribe: function (token) {
            var isNamespace = (typeof token === 'string'),
                length, i,
                ns;

            if (isNamespace) {
                callbacks[token] = [];
            } else {
                ns = tokens[token];
                length = callbacks[ns].length;
                for (i = 0; i < length; i += 1) {
                    if (token === callbacks[ns][i].id) {
                        callbacks[ns].splice(i, 1);
                    }
                }
            }

            return this;
        },

        /**
         * Reset's Pubbie completely, so no namespaces exist.
         * @return {This}
         */
        reset: function () {
            callbacks = {};
            uid = -1;
            return this;
        }

    };

    window.pubbie = window.pubbie || pubbie;
}(window, window.document));
