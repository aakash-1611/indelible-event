var cacheName = 'indelible events';
var filesToCache = [
  '/',
  'assets/css/bootstrap.min.css',
  'assets/fonts/line-icons.css',
  'assets/css/owl.carousel.min.css',
  'assets/css/owl.theme.css',
  'assets/css/animate.css',
  'assets/css/main.css',
  'assets/css/responsive.css',
  'assets/css/infinite-slider.css',
  'assets/js/jquery-min.js',
  'assets/js/popper.min.js',
  'assets/js/bootstrap.min.js',
  'assets/js/owl.carousel.min.js',
  'assets/js/wow.js',
  'assets/js/jquery.nav.js',
  'assets/js/scrolling-nav.js',
  'assets/js/jquery.easing.min.js',
  'assets/js/main.js',
  'assets/js/form-validator.min.js',
  'assets/js/numscroller.js',
  'assets/js/contact-form-script.min.js'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});
