# Възстановяване на iOS приложението (Capacitor обвивка)

Това пресъздава мобилния проект от нулата. Уеб приложението и Supabase са непокътнати —
обвивката само зарежда живия адрес https://armacovt.github.io/ac2/ и държи плъгините.

## 1) Създаване на проекта + плъгини (Terminal на Мака)

Копирай целия блок наведнъж:

```bash
cd ~/Desktop
mkdir arcus-mobile && cd arcus-mobile
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/ios \
  @capacitor/haptics @capacitor/local-notifications \
  @capawesome/capacitor-badge @capgo/capacitor-native-biometric \
  @ebarooni/capacitor-calendar
mkdir www
echo '<!doctype html><meta charset="utf-8"><title>Arcus Club</title>' > www/index.html
cat > capacitor.config.json <<'EOF'
{
  "appId": "com.arcusclub.app",
  "appName": "Arcus Club",
  "webDir": "www",
  "server": { "url": "https://armacovt.github.io/ac2/" }
}
EOF
npx cap add ios
```

## 2) Икона и сплаш

Сложи `icon.png` (1024×1024), `splash.png` и `splash-dark.png` (2732×2732) в нова папка
`~/Desktop/arcus-mobile/assets`, после:

```bash
cd ~/Desktop/arcus-mobile
npx capacitor-assets generate --ios
npx cap sync ios
npx cap open ios
```

## 3) В Xcode (еднократно, както преди)

- **Signing & Capabilities** → избери своя Apple ID (Personal Team). Bundle Identifier:
  `com.arcusclub.app` (ако е заето, сложи нещо уникално, напр. `com.armaco.arcusclub`).
- Бутон **+ Capability** → **Background Modes** → отметни „Audio, AirPlay, and Picture in Picture".
- **Info** (Info.plist) → добави:
  - `Privacy - Face ID Usage Description` = „За бърз и сигурен вход с Face ID."
  - `Privacy - Calendars Usage Description` = „За добавяне на събития в календара ти."
- **Deployment Target** = iOS 16.0.
- Свържи айфона, избери го горе, натисни ▶ (Run).

Готово — новата икона, сплаш и плъгини влизат. Старата иконка на телефона може да се изтрие.
