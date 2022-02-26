var enableCache = false;
if(enableCache){
var cacheName = 'dumb-cards-app-cache';
var filesToCache = [
  '/',
  '/stylesheets/main.css',
  '/stylesheets/game.css'
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

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request, {ignoreSearch:true}).then(response => {
      return response || fetch(event.request);
    })
  );
});
}
else{
/** For PWA - An empty service worker! */
self.addEventListener('fetch', function(event) {
  
});

}