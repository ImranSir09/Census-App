const CACHE = "census-app-v2";

const urlsToCache = [
"./",
"./index.html",
"./manifest.json"
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
