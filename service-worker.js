const CACHE = "census-app-v2";

const urlsToCache = [
  "/Census-App/",
  "/Census-App/index.html",
  "/Census-App/manifest.json",
  "/Census-App/icon-192.png",
  "/Census-App/icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
