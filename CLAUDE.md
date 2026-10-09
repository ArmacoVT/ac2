# AC² — American College Arcus Club (ac2.bg)

Собственик: Юлиян Гроздев (Armaco), нетехнически, **отговаряй винаги на български**, мъж. Иска първо визуализация/обяснение, после код („давай“). Кратки, конкретни стъпки; той изпълнява деплоя ръчно.

## Какво е това
Една кодова база (vanilla JS, без билд) → три неща:
- `index.html` — **публичен сайт** ac2.bg (хеш адреси `#/program`, `#/event/<id>`, `#/restaurant/menu`, `#/membership`, `#/about/team`, `#/contacts`…). BG/EN. Cookie банер + GA4/Meta Pixel (ID-та в `config.js`, празни = изключено).
- **Бранд (гайд от дизайнера):** цветове черно / бордо #82303D / зелено #507044 / бежово #EBEBD6 / сиво #BFC0C2; шрифтове — заглавия Playfair Display Bold Italic, подзаглавия Playfair Italic, текст/бутони Google Sans (ползваме Google Sans Flex от Google Fonts). `--serif`/`--sans` в index.html, app/index.html, admin.html, landing.html — не връщай Cormorant.
- `landing.html` — **„Очаквайте скоро"** страница (само нюзлетър; дизайн по визуализацията на user — не се променя; рисунка = векторът `cards/contour.svg` (Contour_111111, цялата) като CSS mask: линии #652430 върху бордо фон #82303D; лява част бежова; на мобилни рисунката е отгоре). Включва се с `COMING_SOON: true` в `config.js` → index.html пренасочва към нея (освен `?site=1` за преглед и `#/legal/…`). Когато сайтът тръгне — `COMING_SOON: false`.
- `app/index.html` — **членско приложение** ac2.bg/app (вход, събития, резервации, билети, членска карта с QR, Face ID). Същото зарежда iOS/Android Capacitor обвивката (`server.url = https://ac2.bg/app/`).
- `admin.html` — админ панел ac2.bg/admin.html (роли `admin` и `editor`).
Общи: `db.js` (слой данни + `SITE_DEFAULTS`, `PUB_DEFAULTS`), `brand.js` (лого + анимирана лента), `config.js` (само публични ключове), `sw.js` (service worker — **вдигай `acac-vNNN` при всяка промяна**; страниците се презареждат сами при нова версия).

## Бекенд: Supabase проект `twcxfqgknhqicxqghcrx` (user има и втори проект — винаги потвърждавай ref)
- Таблици: profiles (role member/admin/editor, membership founder/founding/club/alumni/corporate/guest, membership_until), events (формати **culture, table=AC² Food, conversation, community=AC² Arcus Community, online**; `pub` jsonb: members_only, guests, guest_from, cancel_hours, category, title_en, desc_en, participants/curator/authors/visit {bg,en}, ticket_url, gallery[]), reservations (user_id nullable; гости: guest_name/email/phone; paid, stripe_pi, refunded_at, refund_cents; статуси requested/confirmed/declined/cancelled/pending_payment), applications, site_content (id 'landing' = вход в приложението + членства, id 'public' = публичен сайт), contact_messages, newsletter_subscribers, stripe_events, announcements, audit_log.
- RLS е източникът на истина (`pg_policies`). `is_admin()`, `is_staff()` (admin+editor). Anon чете само публични колони на events и само non-members_only.
- Edge Functions (deploy-ва ги user през дашборда, копира кода от `supabase/functions/*/index.ts`): create-payment, stripe-webhook (v5: потвърждение, имейли, charge.refunded), submit-application (Turnstile), invite-member (members/set_membership/renew), reservation-status (имейл при одобрение/отказ, вкл. гости), public-forms (v2: contact, newsletter, reservation-запитване, ticket за гости; Verify JWT OFF). Всички supabase-js **@2.58.0**. След деплой проверявай маркер в Code.
- SQL миграции в `supabase/sql/` (последни: public_site.sql, public_site_2.sql, realtime_admin.sql, refunds.sql, `2026-09-29-all.sql` = всичко от 29.09, idempotent).
- Stripe: тестов sandbox (pk_test_/sk_test_), EUR, Payment Element в приложението и сайта; webhook endpoint `…/functions/v1/stripe-webhook` с payment_intent.succeeded/failed/canceled + charge.refunded. Apple Pay/Google Pay включени, домейн ac2.bg добавен. Чеклист за live в паметта (acac-payments-plan).
- Turnstile: site key в config.js, secret само в Supabase Secrets. SMTP_* и CONTACT_TO в Secrets.
- Keep-alive: cron-job.org + Calderra cron на 12 ч.

## Деплой (ЗАДЪЛЖИТЕЛНО)
- Хостинг: GitHub Pages, домейн ac2.bg (CNAME). **Качва се САМО от user: `sync-to-github.bat` + GitHub Desktop → Push.** Никога `git` или `cp` към репото от асистента; редактирай само файловете в тази папка.
- Проверка след промяна: `node --check` за .js; за .html — извлечи `<script>` блоковете и `node --check` (или jsdom smoke test). Винаги вдигай `sw.js` версията.
- Промени в базата/функциите → дай на user точния SQL/код за поставяне + къде.

## Сигурност — никога
- Не искай/не съхранявай: service_role ключ, sk_/whsec_ на Stripe, Turnstile secret, SMTP парола, SSH ключове, `backup/db-url.txt`. Публични са само anon/publishable/site key.
- Не слагай плащане/цена/линк за членство в приложението (Apple IAP правило). Членството ще се плаща на сайта с код (план в паметта).

## Мобилни
- iOS проект на Mac: `~/Desktop/arcus-club-mobile` (Capacitor 8, плъгини biometric/calendar/haptics/local-notifications/badge). Apple Pay в iOS WebView работи през Stripe Payment Element.
- Android проект на Windows: `C:\Users\ygrozdev\arcus-club-android` (Capacitor 8, appId bg.arcusclub.app). Google Pay в WebView не работи → нативен плъгин `@capacitor-community/stripe` (код `nativePay` в app/index.html, стъпки в `mobile-setup/WALLETS-ApplePay-GooglePay.md`) — чака платените Apple/Google акаунти. Google Play акаунт е одобрен; публикуване планирано ~средата на октомври 2026 (`mobile-setup/BUILD-Android.md`).

## Отворени задачи
- Лога за AC² Food и Arcus Community (от дизайнера). Реални текстове/снимки в Админ → Публичен сайт. Дизайн промени по сайта след преглед.
- Плащане/подновяване на членство с код на сайта (само идеи засега). Два Stripe акаунта клуб/ресторант. Self-hosting на Calderra. Backup на базата. Live Stripe ключове.
