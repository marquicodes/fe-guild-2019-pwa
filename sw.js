self.addEventListener('install', event => {
  console.log('[Service Worker] Installing Service Worker ...', event);
  event.waitUntil(self.skipWaiting());
});

self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', event => {
    console.log('[Service Worker] Fetching something ....', event);

    // fixes a weird bug in Chrome when you open the Developer Tools
    if ('only-if-cached' === event.request.cache && 'same-origin' !== event.request.mode) {
        return;
    }

    event.respondWith(fetch(event.request));
});