// Service worker — прави приложението инсталируемо и достъпно офлайн (обвивката).
const CACHE = 'acac-v109';
const ASSETS = [
  './', './index.html', './admin.html', './config.js', './db.js',
  './manifest.json', './favicon.png', './icon-192.png', './icon-512.png',
  './cards/logo-ac2.webp', './cards/logo-culture.webp', './cards/logo-cinema.webp',
  './cards/logo-table.webp', './cards/logo-music.webp', './cards/logo-conversation.webp',
  './cards/logo-community.webp', './cards/logo-theater.webp'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Данните (Supabase) винаги по мрежата; обвивката — от кеша.
  if (url.hostname.endsWith('supabase.co') || url.hostname.includes('supabase')) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (e.request.method === 'GET' && resp.ok && url.origin === location.origin) {
        const cp = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, cp));
      }
      return resp;
    }).catch(() => caches.match('./index.html')))
  );
});
