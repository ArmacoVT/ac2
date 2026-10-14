# Push известия — настройка (14.10.2026)

## Какво прави
- Телефонът се регистрира при старт/вход на приложението → токенът влиза в `push_tokens` (Supabase).
- Изпращане: Admin → Новини → „Изпрати и като известие“ (всички / категории / конкретни членове),
  и автоматично при одобрение/отказ на резервация (reservation-status v8).
- Edge Function `send-push`: iOS през APNs (ключ .p8), Android през Firebase Cloud Messaging (HTTP v1).

## Supabase (веднъж)
1. SQL Editor → `supabase/sql/2026-10-14-push.sql` → Run.
2. Edge Functions → Secrets: `APNS_KEY_ID`, `APNS_TEAM_ID`, `APNS_KEY_P8` (цялото съдържание на AuthKey_XXXX.p8,
   вкл. BEGIN/END редовете), `FCM_SERVICE_ACCOUNT` (целият JSON на service account-а).
   По избор: `APNS_TOPIC` (по подразбиране `bg.arcusclub.app`), `APNS_SANDBOX=1` **само докато тестваш от Xcode** —
   за TestFlight/App Store го изтрий (иначе Apple връща BadDeviceToken).
3. Deploy: `send-push` (нова, Verify JWT **ON**) и `reservation-status` (v8).

## iOS (Mac, ~/Desktop/arcus-club-mobile)
```
npm i @capacitor/push-notifications
npx cap sync ios
```
Xcode → target → Signing & Capabilities → **+ Push Notifications**; Background Modes → ✓ Remote notifications.
Apple Developer → Identifiers → bg.arcusclub.app → Push Notifications ✓ (ако не е).
Info.plist не иска нищо допълнително. Тест: пусни на реален телефон (симулаторът няма APNs), влез, разреши известията,
после Admin → Новини → публикувай с отметката.

## Android (Windows, C:\Users\ygrozdev\arcus-club-android)
```
npm i @capacitor/push-notifications
npx cap sync android
```
Firebase → проект → Android app `bg.arcusclub.app` → свали `google-services.json` → сложи го в `android\app\`.
В `android\build.gradle` (project) трябва да има `classpath 'com.google.gms:google-services:4.4.2'`,
в `android\app\build.gradle` накрая `apply plugin: 'com.google.gms.google-services'` (Capacitor 8 обикновено го добавя при sync —
провери). Иконата на известието: `android/app/src/main/res/drawable/ic_stat_*` по избор; каналът „ac2“ се създава от приложението.

## Проверка
- Supabase → Table Editor → `push_tokens` — трябва да се появи ред след вход от телефона.
- Admin → Новини показва „регистрирани: X iOS · Y Android“.
- Логове: `push_log` (ръчните известия) и Edge Functions → send-push → Logs (грешки от Apple/Google в `errors`).
