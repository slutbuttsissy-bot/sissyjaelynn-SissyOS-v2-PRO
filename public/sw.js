// PWA service worker for SissyOS (cache + install + push)
const CACHE = 'sissyos-v2-pro-v1';
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(['/', '/manifest.webmanifest'])));
});
self.addEventListener('activate', (e) => e.waitUntil(clients.claim()));
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
self.addEventListener('push', (e) => {
  const data = e.data ? e.data.text() : 'Deeper good girl';
  self.registration.showNotification('SissyOS', { body: data, icon: '/icon-192.jpg' });
}); // deploy-gate PWA edit for diffs