# Бекъп на приложението и достъпите (16.10.2026)

Кодът на приложението е САМО на ac2.bg (GitHub репото `arcus-club-web`) — телефоните зареждат живия сайт.
Мобилните проекти са само „обвивки“. Ако изгубиш лаптопа, с нещата по-долу възстановяваш всичко.

## 1. Какво да пазиш (копие на външен диск + облак, напр. OneDrive/Google Drive, папка „AC2-backup“)
| Какво | Къде е | Защо |
|---|---|---|
| **Android ключ** `arcus-upload.jks` + паролите (keystore, alias `arcus`, key) | `C:\Users\ygrozdev\arcus-keys\` | Без него НЕ може да се качи нова версия в Google Play. Незаменим. |
| **Apple**: .p8 ключовете (APNs `AuthKey_XXXX.p8`, App Store Connect API ако има) | там, където са свалени (Downloads/Desktop на Mac) | Apple дава .p8 само веднъж. Push спира без него. |
| **Firebase** service account JSON (`arcus-club-…json`) + `google-services.json` | Downloads / `android\app\` | FCM push за Android. |
| **Secrets на Supabase** (списък с имена + стойности, в мениджър за пароли) | Supabase → Edge Functions → Secrets (стойностите НЕ се показват после) | STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, SMTP_*, MAILCHIMP_API_KEY, TURNSTILE_SECRET_KEY, APNS_*, FCM_SERVICE_ACCOUNT, WEBHOOK_SECRET |
| **Базата данни** — дъмп | Supabase → Database → Backups (ежедневни на платен план) или ръчно `pg_dump` с `backup/db-url.txt` | Членове, резервации, събития. |
| **Storage** (снимки на събития, галерия) | Supabase → Storage → bucket → Download | Качените от админа снимки. |
| Мобилните проекти: `~/Desktop/arcus-club-mobile` (Mac) и `C:\Users\ygrozdev\arcus-club-android` (Windows) | zip на цялата папка (без `node_modules`, `android/build`, `ios/App/Pods`) | Възстановяват се и от `mobile-setup/REBUILD-iOS.md` / `BUILD-Android.md`, но zip-ът спестява време. |
| Пароли за: Apple Developer, App Store Connect, Google Play Console, Firebase, Stripe, Supabase, GitHub, Calderra, Mailchimp, Cloudflare (Turnstile) | мениджър за пароли (1Password/Bitwarden) | Плюс 2FA/passkey — добави passkey и на втори телефон/компютър. |

## 2. Бекъп на базата (ръчно, Windows PowerShell)
```powershell
# изисква инсталиран PostgreSQL client (pg_dump). Паролата е в backup/db-url.txt — НЕ я споделяй.
pg_dump "<съдържанието на backup/db-url.txt>" --no-owner --format=custom --file="AC2-db-$(Get-Date -Format yyyy-MM-dd).dump"
```
Възстановяване: `pg_restore --clean --no-owner -d "<db url>" AC2-db-….dump`.
Supabase Pro план включва автоматични дневни бекъпи (Database → Backups) + Point-in-time recovery — препоръчително преди старта.

## 3. Експорт на кода
- Сайт + приложение + админ: GitHub → репото → Code → Download ZIP (или `git clone`). Папката `ACAC/arcus-club-web` на компютъра е същото.
- Edge Functions: в `supabase/functions/*/index.ts` в репото (деплойнатите в Supabase са копия на тях).
- SQL миграции: `supabase/sql/`.
- Имейл шаблони на Auth: `supabase/auth-email-templates.md` (в Supabase са поставени ръчно).

## 4. Експорт на данни за хора (GDPR/счетоводство)
- Членове/резервации: Supabase → Table Editor → таблица → Export CSV (или Админ → Статистика).
- Плащания: Stripe → Payments → Export.
- Нюзлетър: Mailchimp → Audience → Export.

## 5. Възстановяване на мобилните обвивки от нулата
- iOS: `mobile-setup/REBUILD-iOS.md` (нужни: Mac с Xcode, Apple Developer акаунт, Team в Signing).
- Android: `mobile-setup/BUILD-Android.md` + `arcus-upload.jks` (задължително същият ключ!) + `google-services.json`.
- Push: `mobile-setup/PUSH.md` (APNs .p8, Firebase).

## 6. Колко често
- Ключове/пароли: веднага при създаване (еднократно) + при всяка промяна.
- База: автоматично (Supabase) + ръчен дъмп преди големи промени.
- Мобилни проекти: след всяка публикувана версия (zip с номера на версията).
