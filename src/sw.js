workbox.precaching.precacheAndRoute([
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        "https://fonts.googleapis.com/css?family=Chela+One|Lobster|Dancing+Script|Raleway"
]);
workbox.routing.registerRoute(
       /\.(?:png|gif|jpg|jpeg|svg)$/,
        workbox.strategies.cacheFirst({
          cacheName: 'image-cache',
          plugins: [
            new workbox.expiration.Plugin({
                // Only cache requests for a week
                maxAgeSeconds: 7 * 24 * 60 * 60,
                // Only cache 10 requests.
                maxEntries: 10,
                }),
                ]
        })
);

workbox.routing.registerRoute(
        /(?:item|order|user)/,
        workbox.strategies.networkFirst({
                cacheName: 'resources-cache',
                plugins: [
                        new workbox.cacheableResponse.Plugin({
                                statuses: [0, 200],
                        }),
                        new workbox.expiration.Plugin({
                                // Only cache requests for a week
                                maxAgeSeconds: 7 * 24 * 60 * 60,
                                // Only cache 10 requests.
                                maxEntries: 10,
                        }),
                ]
        })
);

// workbox.routing.setDefaultHandler(({
//         url,
//         event,
//         params
// }) => {});

// workbox.routing.setCatchHandler(({
//         url,
//         event,
//         params
// }) => {});