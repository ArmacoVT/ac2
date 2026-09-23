// Service worker — прави приложението инсталируемо и достъпно офлайн (обвивката).
// Обслужва и публичния сайт (/) и членското приложение (/app/).
const CACHE = 'acac-v230';
const ASSETS = [
  './', './index.html', './app/index.html', './admin.html', './config.js', './db.js', './brand.js', './rules.html',
  './vendor/supabase.js', './vendor/qrcode.js',
  './cards/logo-ac2.webp', './cards/logo-ac2.svg', './cards/logo-culture.webp', './cards/logo-cinema.webp',
  './cards/logo-table.webp', './cards/logo-music.webp', './cards/logo-conversation.webp',
  './cards/logo-community.webp', './cards/logo-theater.webp',
  './manifest.json', './favicon.png', './icon-192.png', './icon-512.png'
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
  if (url.origin !== location.origin) return;   // външни скриптове (аналитика, карти) — без намеса
  const fallback = () => caches.match(url.pathname.indexOf('/app') === 0 ? './app/index.html' : './index.html');
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (e.request.method === 'GET' && resp.ok) {
        const cp = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, cp));
      }
      return resp;
    }).catch(fallback))
  );
});
