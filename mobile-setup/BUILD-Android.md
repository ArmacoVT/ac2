# Android приложение (Capacitor 8) — стъпки на Windows

Обвивката зарежда живия адрес https://ac2.bg/app/ — същото като iOS.
Нужни: Android Studio (инсталиран, с изтеглен SDK) + Node.js LTS.

## 1) Папка и пакети (PowerShell)
```powershell
mkdir C:\Users\ygrozdev\arcus-club-android
cd C:\Users\ygrozdev\arcus-club-android
npm init -y
npm install @capacitor/core@^8.0.0 @capacitor/cli@^8.0.0 @capacitor/android@^8.0.0 @capgo/capacitor-native-biometric @ebarooni/capacitor-calendar @capacitor/haptics @capacitor/local-notifications @capawesome/capacitor-badge
mkdir www
echo "<meta http-equiv='refresh' content='0;url=https://ac2.bg/app/'>" > www\index.html
```

## 2) capacitor.config.json (в корена на папката)
```json
{
  "appId": "bg.arcusclub.app",
  "appName": "Arcus Club",
  "webDir": "www",
  "server": { "url": "https://ac2.bg/app/" },
  "android": { "allowMixedContent": false }
}
```

## 3) Android проект
```powershell
npx cap add android
npx cap sync android
npx cap open android
```
`cap open` отваря Android Studio. Първия път изчакай „Gradle sync" долу да свърши (няколко минути).

## 4) Пробно пускане
Android Studio → Device Manager (иконата с телефон вдясно) → Create device → Pixel 8, последен Android → Finish.
Горе избери устройството и натисни ▶ Run. Трябва да се отвори входът на ac2.bg/app/.

## 5) Икона и сплаш
Сложи `icon.png` (1024×1024), `splash.png` и `splash-dark.png` (2732×2732) в папка `assets`, после:
```powershell
npm install -D @capacitor/assets
npx capacitor-assets generate --android
npx cap sync android
```

## 6) Ключ за подписване (прави се ВЕДНЪЖ; пази се извън GitHub, с backup)
Android Studio → Build → Generate Signed App Bundle / APK → Android App Bundle → Create new…
- Key store path: напр. `C:\Users\ygrozdev\arcus-keys\arcus-upload.jks`
- Password / Key alias (`arcus`) / Key password — запиши ги в мениджър за пароли.
→ Next → release → Create. Получаваш `app-release.aab` — това се качва в Play Console.
Загубен ключ = не могат да се публикуват нови версии. Не го споделяй с никого (и с мен).

## 7) Версии при всяка нова публикация
`android/app/build.gradle` → `versionCode` +1 (цяло число), `versionName` (напр. "1.1").
