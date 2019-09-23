const IMAGES_CACHE = '{{images_cache}}'
const CRITICAL = [
  '/'
]
const IMAGES_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'gif']

const checkUrlIsImage = ({url}) => IMAGES_EXTENSIONS.some(ext => url.endsWith(`.${ext}`))
const addToCache = (cacheName, request, response) => {
  caches.open(cacheName).then(cache => cache.put(request, response))
}

self.onfetch = function(event) {
  const requestURL = new URL(event.request.url)
  const isImage = checkUrlIsImage({url: requestURL.pathname})

  if (isImage) {
    event.respondWith(respondfromCache(event.request));
  } else {
    event.respondWith(fetch(event.request));
  }
}

function respondfromCache (request) {
  return caches.match(request).then(function(response) {
    if (response) return response

    return fetch(request.clone()).then(function(response) {
      addToCache(IMAGES_CACHE, request, response).then(function() {
          console.log('yey img cache');
        }, function() {
          console.log('nay img cache');
        }
      )

      return response.clone();
    });
  });
}