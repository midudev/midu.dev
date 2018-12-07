importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.6.1/workbox-sw.js'
)

const {expiration, googleAnalytics, routing, strategies} = workbox

googleAnalytics.initialize()

routing.registerRoute(
  'https://www.googletagmanager.com/gtag/js?id=UA-30525085-8',
  strategies.staleWhileRevalidate()
)

routing.registerRoute(
  'https://www.google-analytics.com/analytics.js',
  strategies.staleWhileRevalidate()
)

routing.registerRoute(
  ({url}) => url.pathname === '/',
  strategies.networkFirst({cacheName: 'home'})
)

routing.registerRoute(
  new RegExp('(([a-z0-9]+-)+[a-z0-9]+)(/)?$'),
  strategies.networkFirst({cacheName: 'articles'})
)

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
