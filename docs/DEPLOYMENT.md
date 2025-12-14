# Deployment (Proxmox Home Server + Cloudflare Tunnel)

Panduan ini menyiapkan SMK Bina Insan Mulia (Laravel 12 + React + Vite) di VM/LXC Ubuntu pada Proxmox, memakai Cloudflare Tunnel dan domain yang dibeli di Hostinger.

## 0. Validasi Domain & DNS
- Pastikan nameserver di Hostinger diarahkan ke Cloudflare (`diana.ns.cloudflare.com` dan `nico.ns.cloudflare.com`).
- Hapus A record yang menunjuk langsung ke IP rumah. Untuk tunnel, gunakan **CNAME ke hostname tunnel** (mis. `smkbimbdg.sch.id -> <tunnel-id>.cfargotunnel.com`, proxied).
- Di Cloudflare, set **SSL/TLS > Mode: Full (Strict)**.

## 1. Persiapan Server
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl unzip zip software-properties-common lsb-release
```

### Buat user deploy (disarankan)
```bash
sudo adduser deploy
sudo usermod -aG sudo deploy
sudo su - deploy
```

## 2. Install Stack (PHP 8.4, Nginx, MySQL, Node 20)
```bash
sudo add-apt-repository ppa:ondrej/php -y && sudo apt update
sudo apt install -y nginx mysql-server \
  php8.4 php8.4-fpm php8.4-mysql php8.4-curl php8.4-mbstring \
  php8.4-xml php8.4-bcmath php8.4-zip php8.4-intl php8.4-gd php8.4-cli
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

### MySQL hardening dan database
```bash
sudo mysql_secure_installation
mysql -u root -p
```
```sql
CREATE DATABASE smkbim CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'smkbim'@'localhost' IDENTIFIED BY 'ganti_password_kuat';
GRANT ALL PRIVILEGES ON smkbim.* TO 'smkbim'@'localhost';
FLUSH PRIVILEGES;
```

## 3. Ambil Kode & Konfigurasi Lingkungan
```bash
cd /var/www
sudo git clone https://github.com/username/smkbim.git smkbim
sudo chown -R $USER:www-data smkbim
cd smkbim
cp .env.example .env
```

Edit `.env` minimal:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://smkbimbdg.sch.id
TRUSTED_PROXIES="*"

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=smkbim
DB_USERNAME=smkbim
DB_PASSWORD=ganti_password_kuat

SESSION_DRIVER=database
SESSION_LIFETIME=120
```

## 4. Install Dependensi & Build
```bash
composer install --optimize-autoloader --no-dev
npm ci
npm run build
php artisan key:generate
php artisan storage:link
php artisan migrate --force
php artisan db:seed --force   # hanya saat pertama deploy
php artisan config:cache
php artisan route:cache
php artisan view:cache
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

## 5. Konfigurasi Nginx (local listener untuk tunnel)
Buat file `/etc/nginx/sites-available/smkbim`:
```nginx
server {
    listen 80;
    server_name smkbimbdg.sch.id;
    root /var/www/smkbim/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
    client_max_body_size 20m;

    # Cloudflare real IP
    set_real_ip_from 103.21.244.0/22;
    set_real_ip_from 103.22.200.0/22;
    set_real_ip_from 103.31.4.0/22;
    set_real_ip_from 104.16.0.0/13;
    set_real_ip_from 104.24.0.0/14;
    set_real_ip_from 108.162.192.0/18;
    set_real_ip_from 131.0.72.0/22;
    set_real_ip_from 141.101.64.0/18;
    set_real_ip_from 162.158.0.0/15;
    set_real_ip_from 172.64.0.0/13;
    set_real_ip_from 173.245.48.0/20;
    set_real_ip_from 188.114.96.0/20;
    set_real_ip_from 190.93.240.0/20;
    set_real_ip_from 197.234.240.0/22;
    set_real_ip_from 198.41.128.0/17;
    real_ip_header CF-Connecting-IP;
    real_ip_recursive on;

    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.4-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```
Aktifkan:
```bash
sudo ln -s /etc/nginx/sites-available/smkbim /etc/nginx/sites-enabled/
sudo unlink /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl restart nginx
```

## 6. Cloudflare Tunnel
```bash
sudo mkdir -p /etc/cloudflared
sudo apt install -y cloudflared  # paket resmi cloudflare
cloudflared login   # buka URL, pilih zone smkbimbdg.sch.id
cloudflared tunnel create smkbim
cloudflared tunnel route dns smkbim smkbimbdg.sch.id
```
Buat `/etc/cloudflared/config.yml`:
```yaml
tunnel: smkbim
credentials-file: /etc/cloudflared/$(ls /etc/cloudflared | grep json)
protocol: h2mux
ingress:
  - hostname: smkbimbdg.sch.id
    service: http://localhost:80
  - service: http_status:404
```
Jalankan sebagai service:
```bash
sudo cloudflared service install
sudo systemctl enable --now cloudflared
```
Pastikan di Cloudflare DNS, `smkbimbdg.sch.id` adalah CNAME ke tunnel (proxy ON, TTL Auto).

## 7. Layanan Background
- **Queue**: buat service `/etc/systemd/system/smkbim-queue.service`:
```ini
[Unit]
Description=SMKBIM Queue Worker
After=network.target

[Service]
Type=simple
User=www-data
Group=www-data
WorkingDirectory=/var/www/smkbim
ExecStart=/usr/bin/php artisan queue:work --sleep=3 --tries=3 --max-time=3600
Restart=always
RestartSec=5s

[Install]
WantedBy=multi-user.target
```
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now smkbim-queue
```

- **Scheduler**: tambah cron
```bash
sudo crontab -e
# Tambahkan baris berikut
* * * * * cd /var/www/smkbim && /usr/bin/php artisan schedule:run >> /var/log/smkbim-schedule.log 2>&1
```

## 8. Health Check & Rollout
```bash
curl -I http://localhost
php artisan migrate --force   # untuk rollout schema baru
php artisan optimize
sudo journalctl -u smkbim-queue -f   # pantau worker
sudo systemctl status cloudflared nginx php8.4-fpm
```
Jika memakai port lain di Proxmox (port-forward), cukup ubah `service: http://localhost:<port>` di `cloudflared` tanpa mengubah DNS.
