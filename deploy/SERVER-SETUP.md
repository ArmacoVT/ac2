# Качване на Arcus Club на собствен сървър (Debian 12)

Сайтът е статичен + Supabase в облака → сървърът само раздава файлове по HTTPS.
Минимален VPS: 1 vCPU, 1 GB RAM, Debian 12 (или Ubuntu 24.04 LTS).

## 1. Основни пакети
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx
```

## 2. Папка със сайта
```bash
sudo mkdir -p /var/www/arcusclub
sudo chown -R $USER:$USER /var/www/arcusclub
```

## 3. Качване на файловете (от твоя компютър)
Качваш съдържанието на `arcus-club-web` (БЕЗ папките `supabase` и `deploy`).
```bash
# пример с rsync от Windows (PowerShell с OpenSSH) или Git Bash:
rsync -avz --delete ./arcus-club-web/ потребител@СЪРВЪР:/var/www/arcusclub/
# или просто прехвърли файловете със SFTP клиент (FileZilla)
```

## 4. Nginx
```bash
sudo cp /var/www/arcusclub/deploy/nginx-arcusclub.conf /etc/nginx/sites-available/arcusclub
# смени server_name с твоя домейн във файла
sudo ln -s /etc/nginx/sites-available/arcusclub /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 5. HTTPS (задължително за PWA и тест от устройства)
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d arcusclub.example.com
```
Certbot сам добавя 443 и автоматично подновява сертификата.

## 6. Тест
Отвори `https://твоя-домейн` на телефон/таблет — приложението работи навсякъде.

---

## Тест през Xcode (Capacitor)
За да зарежда live версията от сървъра (вместо вградените файлове), в `arcus-club-mobile/capacitor.config.json` добави временно:
```json
"server": { "url": "https://твоя-домейн", "cleartext": false }
```
После `npm run sync` и `npm run open:ios`. Махни този ред преди публикуване в App Store (там трябва да са вградените файлове).

## Сигурност
- Не е нужно да слагаш тайни на сървъра — Supabase ключът в `config.js` е публичен (publishable).
- Дръж `secret`/`service_role` ключа само в Supabase (използва се от Edge Function-а).
- За автоматичен деплой при промяна мога да настроя GitHub репо + Action/скрипт, който сървърът дърпа — кажи и го подготвям.
