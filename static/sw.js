importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

const IMAGES_EXTENSIONS = ['png', 'jpg', 'jpeg', 'svg', 'gif']
const isImage = ({url}) => IMAGES_EXTENSIONS.some(ext => url.endsWith(`.${ext}`))

workbox.googleAnalytics.initialize()

workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: 'images-cache'
  })
)

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
