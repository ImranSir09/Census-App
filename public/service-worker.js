const CACHE = "census-app-v2";

const CACHE = "census-app-v3";

const urlsToCache = [
"./",
"./index.html",
"./public/manifest.json",
"./public/icon-192.png",
"./public/icon-512.png"
];

self.addEventListener("install", event => {
event.waitUntil(
caches.open(CACHE).then(cache => cache.addAll(urlsToCache))
);
});

self.addEventListener("fetch", event => {
event.respondWith(
caches.match(event.request).then(response => {
return response || fetch(event.request).then(res => {
return caches.open(CACHE).then(cache => {
cache.put(event.request, res.clone());
return res;
});
});
})
);
});
