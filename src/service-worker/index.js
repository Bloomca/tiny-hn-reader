const CACHE_NAME = "v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(["/", "/index.html", "/bundle.js", "/style.css"]);
    })
  );
});

// we don't activate, since it is the first and the latest version of this
// service worker. In case of changes, we will need to delete caches first.

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cacheResponse => {
        // we always fetch, even if we have the response in our cache
        // the reason is that we don't want to invalidate cache manually,
        // and use it _only_ as a fallback, writing the latest value.
        return fetch(event.request)
          .then(response => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(err => {
            if (cacheResponse) {
              return cacheResponse;
            }

            return err;
          });
      });
    })
  );
});
