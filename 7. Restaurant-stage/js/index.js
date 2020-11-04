//Registration Service Worker
if (navigator.serviceWorker) {

    navigator.serviceWorker.register('/sw.js').then(function(registration) {
        console.log('ServiceWorker - success',  registration.scope);
    }
    ).catch(function (error) {
        console.log('ServiceWorker - failed', error);
    });

}