((window, document) ->

  # Callbacks holder
  # @type object
  callbacks = {}

  # Unique ID which is returned by the subscribe function
  # @type number
  uid = -1

  # Token Tracker.
  # @type object
  tokens = {}

  # Pubbie
  # @type object
  pubbie =

    # Subscribe to a particular namespace and the function will be ran everytime
    # the namespace receives a publish.
    # @param  string   namespace
    # @param  function callback
    # @return integer
    subscribe: (namespace, fn) ->
      callbacks[namespace] = [] unless callbacks.hasOwnProperty(namespace)
      token = (uid += 1)

      callbacks[namespace].push
        id: token
        fn: fn

      tokens[token] =
        namespace: namespace
        index: (callbacks[namespace].length - 1)

      return token

    # Publish to a namespace with optional parameters to pass to the subscribing
    # functions.
    # @param  mixed namespace
    # @param  array args
    # @return self
    publish: (namespace, args) ->
      fns = callbacks[namespace] or []
      for fn in fns
        do (fn) ->
          fn.fn.apply this, (args or [])

      return this

    # Unsubscribe from a particular namespace or remove one subscription.
    # @param  mixed token
    # @return self
    unsubscribe: (token) ->
      isNamespace = (typeof token is "string")
      if isNamespace
        callbacks[token] = []
      else
        ns = tokens[token]
        callbacks[ns.namespace].splice ns.index, 1
      return this

    # Reset Pubbie
    # @return self
    reset: () ->
      callbacks = {}
      uid = -1
      return this

  window.pubbie = window.pubbie or pubbie
) window, window.document
