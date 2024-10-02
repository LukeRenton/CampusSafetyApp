// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open('my-cache').then(cache => {
//             return cache.addAll(['/','/index.html','manifest.json','app_icon.ico','app_icon_mobile.png','safety_app_icon.ico'])
//         })
//     )
// })

// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request).then(res => {
//             return res || fetch(event.request)
//         })
//     )
// })

const CACHE_NAME = "v-1";
const urlsToCache = ["index.html",  "offline.html"];

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened Cache")
            return cache.addAll(urlsToCache);
        })
    )
})

this.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then(res => {
            return fetch(event.request).catch(() => caches.match('offline.html'))
        })
    )
})

this.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
            if (!cacheWhiteList.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        })
    )))
})