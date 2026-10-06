//  Install-Event: Aktiviert den Service Worker
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activate-Event: Holt sich die Kontrolle über alle geöffneten Seiten der App
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch-Event:  notwendig, damit das Handy die PWA-Installation erlaubt
self.addEventListener("fetch", (event) => {
  // Lässt alle Netzwerkanfragen im Hintergrund ganz normal durchlaufen
  event.respondWith(fetch(event.request));
});
