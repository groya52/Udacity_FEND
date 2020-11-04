const cashName = 'cashName-SW-v1'
    , CashFiles = [
    '/'
    , '/index.html'
    , '/css/styles.css'
    , '/data/restaurants.json'
    , '/img/1.jpg'
    , '/img/2.jpg'
    , '/img/3.jpg'
    , '/img/4.jpg'
    , '/img/5.jpg'
    , '/img/6.jpg'
    , '/img/7.jpg'
    , '/img/8.jpg'
    , '/img/9.jpg'
    , '/img/10.jpg'
    , '/js/dbhelper.js'
    , '/js/index.js'
    , '/js/main.js'
    , '/js/restaurant_info.js'
    ]
;

//install cache
self.addEventListener('install', function (event) {
    self.skipWaiting();
    event.waitUntil(
       caches
           .open(cashName)
           .then((cache) => cache.addAll(CashFiles))

     );
});

self.addEventListener('fetch', function (event) {
    const requestFile = new URL(event.request.url);

    if (requestFile.origin === location.origin) {
        if (requestFile.pathname === '/') {
            event.respondWith(caches.match('index.html'));
            return;
        }
    }
});
