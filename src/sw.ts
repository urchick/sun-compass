const cacheName = 'sun-compass'

declare const self: ServiceWorkerGlobalScope

self.addEventListener('install', e => {
  console.log('[Service Worker] Install')
  e.waitUntil((async () => {
    const cache = await caches.open(cacheName)
    console.log('[Service Worker] Caching all: app shell and content')
    await cache.addAll([
      '/sun-compass/dist/',
      '/sun-compass/dist/index.html',
      '/sun-compass/dist/settings.html',
      '/sun-compass/dist/app.js',
      '/sun-compass/dist/settings.js',
      '/sun-compass/dist/astro.js',
    ])
  })())
})

self.addEventListener('fetch', e => {
  e.respondWith((async () => {
    const r = await caches.match(e.request, {ignoreSearch: true})
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`)
    if (r) 
        return r
    const response = await fetch(e.request)
    const cache = await caches.open(cacheName)
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`)
    cache.put(e.request, response.clone())
    return response
  })())
})

export {}
