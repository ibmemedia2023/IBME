const CACHE_NAME = 'ibme-app-v1';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './manifest.json'
];

// Instalación del Service Worker y almacenamiento en Caché
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Archivos de la App guardados en caché para uso offline');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// Activación y limpieza de versiones antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Intercepción de solicitudes: responde desde la Caché si no hay internet
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});