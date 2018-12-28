importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js'
)

workbox.googleAnalytics.initialize()

workbox.routing.registerRoute(
  'https://www.google-analytics.com/analytics.js',
  workbox.strategies.staleWhileRevalidate()
)

// workbox.routing.registerRoute(
//   ({url}) => url.pathname === '/',
//   workbox.strategies.networkFirst({cacheName: 'home'})
// )

// workbox.routing.registerRoute(
//   new RegExp('(([a-z0-9]+-)+[a-z0-9]+)(/)?$'),
//   workbox.strategies.networkFirst({cacheName: 'articles'})
// )

// routing.registerRoute(
//   new RegExp('/static/'),
//   strategies.cacheFirst({
//     cacheName: 'static-cache',
//     plugins: [
//       new expiration.Plugin({
//         maxEntries: 60,
//         maxAgeSeconds: 24 * 60 * 60 // 1 Day
//       })
//     ]
//   })
// )
