# Apple Pay / Google Pay В ПРИЛОЖЕНИЯТА (нативен Stripe лист)

В браузър (ac2.bg) Apple Pay / Google Pay се показват сами от Stripe Payment Element.
В приложенията (WebView) това не работи → ползваме плъгина `@capacitor-community/stripe`,
който отваря системния лист за плащане (карта + Apple Pay / Google Pay). Кодът в app/index.html
(функция nativePay) го засича сам; ако плъгинът липсва — пада на уеб формата както досега.

## ANDROID (Google Pay)
```powershell
cd C:\Users\ygrozdev\arcus-club-android
npm install @capacitor-community/stripe
npx cap sync android
```
Android Studio → app → manifests → AndroidManifest.xml → вътре в `<application …>` (напр. веднага след реда `android:theme="@style/AppTheme">`) добави:
```xml
<meta-data android:name="com.google.android.gms.wallet.api.enabled" android:value="true" />
```
▶ Run. Google Pay се показва САМО на истински телефон с Google акаунт и карта (в емулатора — не).
С тестови Stripe ключ (pk_test_) листът работи в тестов режим на Google Pay.
За публикуване: Google Pay & Wallet Console (pay.google.com/business/console) → регистрирай приложението
(package bg.arcusclub.app, интеграция „Stripe") и поискай production access — Google одобрява за няколко дни.

## iOS (Apple Pay)
1) developer.apple.com → Certificates, Identifiers & Profiles → Identifiers → + → **Merchant IDs** →
   Description „Arcus Club", Identifier `merchant.bg.arcusclub.app` → Register.
   (ако избереш друг идентификатор — смени APPLE_MERCHANT_ID в config.js)
2) Stripe Dashboard → Settings → Payments → Payment methods → Apple Pay → **iOS certificates** →
   „Add new application" → изтегли CSR файла.
3) developer.apple.com → Merchant IDs → merchant.bg.arcusclub.app → Apple Pay Payment Processing Certificate →
   Create Certificate → качи CSR-а от Stripe → Download (.cer).
4) Stripe → същото място → качи .cer файла. (Повтаря се за истинския Stripe акаунт, когато минеш от sandbox.)
5) На Mac-а:
```bash
cd ~/Desktop/arcus-club-mobile
npm install @capacitor-community/stripe
npx cap sync ios
npx cap open ios
```
   Xcode → App → Signing & Capabilities → + Capability → **Apple Pay** → отметни merchant.bg.arcusclub.app.
   ▶ Run на iPhone с карта в Wallet.

## Проверка
Приложение → събитие → Плати → отваря се системният лист на Stripe с бутон Apple Pay / Google Pay и карта.
Ако се отвори старата уеб форма — плъгинът не е вграден (провери `npx cap sync` да изброява `@capacitor-community/stripe`).
