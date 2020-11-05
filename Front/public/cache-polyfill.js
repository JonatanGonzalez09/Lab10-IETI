if (!Cache.prototype.add) {
    Cache.prototype.add = function add(request) {
      return this.addAll([request]);
    };
  }
  
  if (!Cache.prototype.addAll) {
    Cache.prototype.addAll = async function addAll(requests) {
      var cache = this;
  
      // Since DOMExceptions are not constructable:
      function NetworkError(message) {
        this.name = 'NetworkError';
        this.code = 19;
        this.message = message;
      }
      NetworkError.prototype = Object.create(Error.prototype);
  
      await Promise.resolve();
      if (arguments.length < 1)
        throw new TypeError();
      // Simulate sequence<(Request or USVString)> binding:
      var sequence = [];
      requests = requests.map(function (request) {
        if (request instanceof Request) {
          return request;
        }
        else {
          return String(request); // may throw TypeError
        }
      });
      const responses = await Promise.all(
        requests.map(function (request_1) {
          if (typeof request_1 === 'string') {
            request_1 = new Request(request_1);
          }

          var scheme = new URL(request_1.url).protocol;

          if (scheme !== 'http:' && scheme !== 'https:') {
            throw new NetworkError("Invalid scheme");
          }

          return fetch(request_1.clone());
        })
      );
      await Promise.all(
        responses.map(function (response, i) {
          return cache.put(requests[i], response);
        })
      );
      return undefined;
    };
  }
  
  if (!CacheStorage.prototype.match) {
    // This is probably vulnerable to race conditions (removing caches etc)
    CacheStorage.prototype.match = function match(request, opts) {
      var caches = this;
  
      return this.keys().then(function(cacheNames) {
        var match;
  
        return cacheNames.reduce(function(chain, cacheName) {
          return chain.then(function() {
            return match || caches.open(cacheName).then(function(cache) {
              return cache.match(request, opts);
            }).then(function(response) {
              match = response;
              return match;
            });
          });
        }, Promise.resolve());
      });
    };
  }