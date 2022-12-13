const web_cache = 'web-app-cache-v1.0'
const filesToCache = [
  '/index.html',
  '/style.css',
  '/theme-switch.js'
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(web_cache)
      .then((cache)=> cache.addAll(filesToCache))
      .then(self.skipWaiting())
  )
})

self.addEventListener('activate', event => {
    console.log('WORKER: activate event in progress.');
})

self.addEventListener('fetch', function(e) {
	console.log('WORKER: Fetching', e.request)
})