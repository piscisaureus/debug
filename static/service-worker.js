const web_cache = 'web-app-cache-v1.0'
const filesToCache = [
  '/',
  '/style.css',
  '/theme-switch.js'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(web_cache)
      .then((cache)=> {
        return cache.addAll(filesToCache)
      })
  )
})

self.addEventListener('fetch', function(e) {
	e.respondWith(
		caches.match(e.request)
			.then(function(response) {
				if ( response ) {
					console.log("[ServiceWorker] Found in Cache", e.request.url, response)
					return response
				}
			}) 
	)
})