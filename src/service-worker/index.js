const CACHE_NAME = "v1";

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(["/", "/index.html", "/bundle.js", "/style.css"]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(cacheResponse => {
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
