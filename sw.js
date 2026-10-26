// Service worker — прави приложението инсталируемо и достъпно офлайн (обвивката).
// Обслужва и публичния сайт (/) и членското приложение (/app/).
const CACHE = 'acac-v371';
const ASSETS = [
  './', './index.html', './landing.html', './t.html', './privacy.html', './delete-account.html', './cards/contour-tall.svg', './cards/contour-wide.svg', './app/index.html', './admin.html', './config.js', './db.js', './legal.js', './brand.js', './rules.html',
  './vendor/supabase.js', './vendor/qrcode.js', './vendor/jsqr.js',
  './cards/logo-ac2.webp', './cards/logo-ac2.svg', './cards/logo-culture.webp', './cards/logo-cinema.webp',
  './cards/logo-table.webp', './cards/logo-music.webp', './cards/logo-conversation.webp',
  './cards/logo-community.webp', './cards/logo-theater.webp',
  './fonts/fonts.css', './fonts/GoogleSans-Regular.woff2', './fonts/GoogleSans-Medium.woff2', './fonts/GoogleSans-Bold.woff2',
  './fonts/PlayfairDisplay-Regular.woff2', './fonts/PlayfairDisplay-Bold.woff2', './fonts/PlayfairDisplay-Italic.woff2', './fonts/PlayfairDisplay-BoldItalic.woff2',
  './manifest.json', './favicon.png', './icon-192.png', './icon-512.png'
];
self.addEventListener('install', e => {
  // cache:'reload' → винаги от сървъра, не от HTTP кеша на браузъра (GitHub Pages кешира 10 мин.)
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS.map(a => new Request(a, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  // Данните (Supabase) винаги по мрежата; обвивката — от кеша.
  if (url.hostname.endsWith('supabase.co') || url.hostname.includes('supabase')) return;
  if (url.origin !== location.origin) return;   // външни скриптове (аналитика, карти) — без намеса
  // Видео/аудио (интрото): Safari тегли на части (Range) — кешът връща целия файл и видеото не тръгва → винаги по мрежата
  if (url.pathname.indexOf('/media/') !== -1 || e.request.headers.has('range')) return;
  const fallback = () => caches.match(url.pathname.indexOf('/app') === 0 ? './app/index.html' : './index.html');
  // HTML страниците — първо мрежата (иначе след деплой браузърът показва старата страница до следващото зареждане), кешът само офлайн
  if (e.request.mode === 'navigate') {
    e.respondWith(fetch(e.request).then(resp => {
      if (resp.ok) { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
      return resp;
    }).catch(() => caches.match(e.request).then(r => r || fallback())));
    return;
  }
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      if (e.request.method === 'GET' && resp.ok) {
        const cp = resp.clone(); caches.open(CACHE).then(c => c.put(e.request, cp));
      }
      return resp;
    }).catch(fallback))
  );
});
