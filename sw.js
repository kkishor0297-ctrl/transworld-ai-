self.addEventListener('install', e => {
  console.log('Service Worker: Installed');
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  return self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
