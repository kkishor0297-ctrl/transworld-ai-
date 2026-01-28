
const CACHE_NAME = 'transworld-ai-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.js',
  '/languages.js',
  '/logo.png',
  '/manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
