importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
)
const {strategies, routing, recipes} = workbox

recipes.pageCache()
recipes.staticResourceCache()
recipes.imageCache()

routing.registerRoute(
  new RegExp('https://res.cloudinary.com/dnpmdb8r8/'),
  new strategies.CacheFirst({
    cacheName: 'nerdy-media-cache'
  })
)

self.addEventListener('install', (event) => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  self.clients.claim()
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable()
      }
    })()
  )
})
