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

self.addEventListener("install", (event) => {
    console.log("starting install");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened Cache")
            return cache.addAll(urlsToCache);
        })
    )
    console.log("finishing install");
})
// self.addEventListener("fetch", (event) => {
//     console.log("starting fetch")
//     event.respondWith(
//         caches.match(event.request).then(res => {
//             return fetch(event.request).catch(() => caches.match('offline.html'))
//         })
//     )
//     console.log("done fetch")
// })

self.addEventListener("message", (event) => {
    // console.log('here!');
    // console.log(event);
    // if (event.data && event.data.type === 'SHOW_NOTIFICATION') {
    //     this.registration.showNotification("I AM A TESTER");
    // }
})

self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    console.log("starting")
    cacheWhiteList.push(CACHE_NAME);
    event.waitUntil(caches.keys().then((cacheNames) => Promise.all(
        cacheNames.map((cacheName) => {
            if (!cacheWhiteList.includes(cacheName)) {
                return caches.delete(cacheName);
            }
        })
    )))
    console.log("done")
})

// this.addEventListener('push', (event) => {
//     const data = JSON.parse(event.data);

//     const type = data.report.type;
//     const description = data.report.description;
//     const notification_options = {
//         // title: 'Campus Safety',
//         tag: data.report.of_type + data.report.id,
//         body: description,
//         // duration: 5000,
//         icon: data.icon,
//         native: true,
//         data: {
//             url: "/"
//         }
//     };

//     this.registration.showNotification("I AM A TESTER");
//     // this.registration.showNotification(data.report.header, notification_options);
// })

