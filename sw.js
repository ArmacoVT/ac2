// Service worker — прави приложението инсталируемо и достъпно офлайн (обвивката).
// Обслужва и публичния сайт (/) и членското приложение (/app/).
//
// Стратегия (по препоръките на web.dev / Workbox):
//   HTML и нашите скриптове (config/db/brand/legal) → МРЕЖА ПЪРВО, кешът само офлайн.
//       Така всеки деплой се вижда при първото отваряне, не при второто.
//   Шрифтове, библиотеки (vendor), икони, картинки → КЕШ ПЪРВО (не се променят; при смяна на CACHE всичко се изтегля наново).
//   Supabase, видео/аудио, външни скриптове → без намеса (винаги по мрежата).
// При нов CACHE: старите кешове се трият, новият worker поема веднага (skipWaiting + claim),
// а страниците се презареждат сами, когато е безопасно (вж. края на index.html / app/index.html / admin.html).
const CACHE = 'acac-v385';
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
self.addEventListener('message', e => { if (e.data === 'skipWaiting') self.skipWaiting(); });

// кои файлове са „наши, променливи“ → мрежа първо
const FRESH = /\/(config|db|brand|legal)\.js$/;

function putCache(req, resp) {
  if (req.method === 'GET' && resp && resp.ok) { const cp = resp.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
}
// мрежа първо: no-cache = питай сървъра (ETag), не вярвай на HTTP кеша на браузъра
function networkFirst(req, fallback) {
  return fetch(new Request(req, { cache: 'no-cache' })).then(resp => { putCache(req, resp); return resp; })
    .catch(() => caches.match(req).then(r => r || (fallback ? fallback() : Response.error())));
}
function cacheFirst(req) {
  return caches.match(req).then(r => r || fetch(req).then(resp => { putCache(req, resp); return resp; }));
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.hostname.endsWith('supabase.co') || url.hostname.includes('supabase')) return;   // данни — винаги мрежа
  if (url.origin !== location.origin) return;   // външни скриптове (Stripe, Turnstile, Sentry, карти) — без намеса
  // Видео/аудио (интрото): Safari тегли на части (Range) — кешът връща целия файл и видеото не тръгва → винаги по мрежата
  if (url.pathname.indexOf('/media/') !== -1 || req.headers.has('range')) return;

  const shell = () => caches.match(url.pathname.indexOf('/app') === 0 ? './app/index.html' : './index.html');
  if (req.mode === 'navigate' || req.destination === 'document') { e.respondWith(networkFirst(req, shell)); return; }
  if (FRESH.test(url.pathname)) { e.respondWith(networkFirst(req)); return; }
  e.respondWith(cacheFirst(req));
});
