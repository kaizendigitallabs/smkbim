# Deployment Guide

This guide details the deployment process for the SMK Bina Insan Mulia application on an Ubuntu Server with Nginx and Cloudflare.

## Prerequisites

- **Server**: Ubuntu 22.04 LTS or 24.04 LTS
- **Domain**: Configured in Cloudflare pointing to server IP
- **User**: Sudo privilege user (do not use root for deployment)

---

## 1. Server Preparation

Update system and install essential packages:

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl unzip zip software-properties-common
```

## 2. Install Stack (LEMP + Node)

### Add PHP Repository (Ondřej Surý)
```bash
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update
```

### Install PHP 8.4 & Extensions
```bash
sudo apt install -y php8.4 php8.4-fpm php8.4-mysql php8.4-curl php8.4-mbstring \
php8.4-xml php8.4-bcmath php8.4-zip php8.4-intl php8.4-gd php8.4-cli
```

### Install Nginx
```bash
sudo apt install -y nginx
```

### Install MySQL 8
```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```
*Follow prompts to secure installation.*

### Install Composer
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
```

### Install Node.js (v20 LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
```

---

## 3. Project Setup

### Clone Repository
```bash
cd /var/www
sudo git clone https://github.com/username/smkbim.git smkbim
sudo chown -R $USER:www-data smkbim
cd smkbim
```

### Environment Configuration
```bash
cp .env.example .env
nano .env
```
Update the following:
```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://yourdomain.com

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=smkbim
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password
```

### Install Dependencies
```bash
composer install --optimize-autoloader --no-dev
npm install
```

### Key Setup & Migrations
```bash
php artisan key:generate
php artisan storage:link
php artisan migrate --force
php artisan db:seed --force # Only for initial deploy
```

### Build Assets
```bash
npm run build
```

### Optimization
```bash
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

### Permissions
```bash
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache
```

---

## 4. Nginx Configuration

Create site configuration:
```bash
sudo nano /etc/nginx/sites-available/smkbim
```

Paste configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/smkbim/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;

    charset utf-8;

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

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/smkbim /etc/nginx/sites-enabled/
sudo unlink /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl restart nginx
```

---

## 5. Cloudflare & SSL

### Option A: Flexible/Full (Simplest)
1. Go to Cloudflare Dashboard > **DNS**. Ensure `A` record points to your Server IP.
2. Go to **SSL/TLS** > **Overview**. Set to **Full**.
3. Install Certbot on Server (to secure Nginx-Cloudflare traffic):
    ```bash
    sudo apt install -y certbot python3-certbot-nginx
    sudo certbot --nginx -d yourdomain.com
    ```
    *Select option to redirect HTTP to HTTPS.*

### Option B: Full (Strict) + Origin Server (Most Secure)
1. In Cloudflare **SSL/TLS** > **Origin Server**, create a certificate.
2. Save Private Key to `/etc/ssl/private/cf-key.pem`.
3. Save Certificate to `/etc/ssl/certs/cf-cert.pem`.
4. Update Nginx Config:
    ```nginx
    listen 443 ssl http2;
    ssl_certificate /etc/ssl/certs/cf-cert.pem;
    ssl_certificate_key /etc/ssl/private/cf-key.pem;
    ```
5. Set Cloudflare SSL/TLS mode to **Full (Strict)**.

---

## 6. Supervisor (Queue Worker)

If using queues/jobs:
```bash
sudo apt install -y supervisor
```

Create config:
```bash
sudo nano /etc/supervisor/conf.d/smkbim-worker.conf
```

Content:
```ini
[program:smkbim-worker]
process_name=%(program_name)s_%(process_num)02d
command=php /var/www/smkbim/artisan queue:work --sleep=3 --tries=3 --max-time=3600
autostart=true
autorestart=true
stopasgroup=true
killasgroup=true
user=www-data
numprocs=2
redirect_stderr=true
stdout_logfile=/var/www/smkbim/storage/logs/worker.log
stopwaitsecs=3600
```

Start supervisor:
```bash
sudo supervisorctl reread
sudo supervisorctl update
sudo supervisorctl start smkbim-worker:*
```
