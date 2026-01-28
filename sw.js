const CACHE_NAME = 'transworld-v2';
const urlsToCache = [
  './',
  './index.html',
  './languages.js',
  './main.js',
  './logo.png',
  './manifest.json'
];

// 1. फाइलों को फोन की मेमोरी में सेव करना
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// 2. पुराने कैश को डिलीट करना
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
});

// 3. नेटवर्क और कैश का तालमेल (यही असली समस्या है)
self.addEventListener('fetch', event => {
  // अगर रिक्वेस्ट अनुवाद API के लिए है, तो सीधे इंटरनेट से लाओ
  if (event.request.url.includes('api.mymemory.translated.net')) {
    event.respondWith(fetch(event.request));
  } else {
    // बाकी चीजों को कैश से लोड करो (ताकि ऐप तेज़ खुले)
    event.respondWith(
      caches.match(event.request)
        .then(response => response || fetch(event.request))
    );
  }
});
