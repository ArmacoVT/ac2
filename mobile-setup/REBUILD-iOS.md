# Възстановяване на iOS приложението — ПЪЛЕН списък (Capacitor 8)

Уеб приложението и Supabase са непокътнати. Обвивката само зарежда живия адрес
https://armacovt.github.io/ac2/ и държи нативните плъгини.

ВАЖНО: всички Capacitor пакети трябва да са **версия 8** (core, cli, ios, android и плъгините).
Несъвпадащи версии = плъгините не се вграждат (точно това чупеше Face ID).

---

## 1) Пакети — ВСИЧКО на версия 8 (един ред)

```bash
cd ~/Desktop/arcus-club-mobile
npm install @capacitor/core@^8.0.0 @capacitor/cli@^8.0.0 @capacitor/ios@^8.0.0 @capacitor/android@^8.0.0 @capgo/capacitor-native-biometric @ebarooni/capacitor-calendar @capacitor/haptics @capacitor/local-notifications @capawesome/capacitor-badge
```

Плъгини и за какво са:
- `@capgo/capacitor-native-biometric` — Face ID / отпечатък
- `@ebarooni/capacitor-calendar` — добавяне на събития в календара
- `@capacitor/haptics` — вибрации при докосване
- `@capacitor/local-notifications` — напомняния
- `@capawesome/capacitor-badge` — число върху иконата на приложението

## 2) capacitor.config.json (в корена на проекта)

```json
{
  "appId": "bg.arcusclub.app",
  "appName": "Arcus Club",
  "webDir": "www",
  "server": { "url": "https://armacovt.github.io/ac2/" }
}
```

(ако още няма iOS папка: `npx cap add ios`)

## 3) Podfile — минимална iOS версия 16 (ЗАДЪЛЖИТЕЛНО)

```bash
sed -i '' "s/platform :ios, '[0-9.]*'/platform :ios, '16.0'/" ios/App/Podfile
grep platform ios/App/Podfile      # трябва да видиш: platform :ios, '16.0'
```

## 4) Синк (вгражда плъгините + pod install)

```bash
npx cap sync ios
```
В края трябва да изброи плъгините, вкл. `@capgo/capacitor-native-biometric`, и да пише „Sync finished" БЕЗ червени грешки.

## 5) Икона и сплаш

Сложи `icon.png` (1024), `splash.png`, `splash-dark.png` (2732×2732) в папка `assets`, после:
```bash
npx capacitor-assets generate --ios
npx cap sync ios
npx cap open ios
```

## 6) В Xcode (еднократни настройки)

Таб **Signing & Capabilities**:
- **Automatically manage signing** = вкл.
- **Team** = твоят Apple ID (Personal Team)
- **Bundle Identifier** = `bg.arcusclub.app`
- **+ Capability → Background Modes** → отметни „Audio, AirPlay, and Picture in Picture"
- **+ Capability → Keychain Sharing** → група: `bg.arcusclub.app`  (нужно за Face ID)

Таб **Info** — трябва да има:
- **Privacy – Face ID Usage Description** = „За бърз и сигурен вход с Face ID."
- **Privacy – Calendars Full Access Usage Description** = „За добавяне на събития в календара ти."

Таб **General**:
- **Minimum Deployments** = **iOS 16.0**

После: свържи айфона → избери го горе → **▶ Run**.

## 7) Тест на Face ID

Влез веднъж с имейл/парола (записва данните). Затвори и отвори пак → трябва да се появи
бутон „Влез с Face ID". (Работи от втория вход нататък.)

---

### Чек-лист накратко
- [ ] всички Capacitor пакети v8
- [ ] capacitor.config.json със server.url (с кавички!)
- [ ] Podfile: platform :ios, '16.0'
- [ ] npx cap sync ios — без грешки, вижда плъгините
- [ ] Keychain Sharing + Background Modes
- [ ] Info: Face ID + Calendars описания
- [ ] Minimum Deployments 16.0
- [ ] icon/splash през capacitor-assets
