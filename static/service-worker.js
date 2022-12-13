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
				
        const requestClone = e.request.clone()

				fetch(requestClone)
					.then(function(response) {
						if ( !response ) {
							console.log("[ServiceWorker] No response from fetch ")
							return response
						}

						const responseClone = response.clone()

						caches.open(cacheName).then(function(cache) {
							cache.put(e.request, responseClone)
							return response
				    })
					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Fetching & Caching New Data', err)
					})
			}) 
	)
})