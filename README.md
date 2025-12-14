# SMK Bina Insan Mulia - Website & Admin Dashboard

Website resmi dan sistem manajemen konten untuk SMK Bina Insan Mulia yang dibangun dengan Laravel 12 dan React + TypeScript menggunakan Inertia.js.

## 🚀 Tech Stack

### Backend
- **Laravel 12** - PHP Framework
- **MySQL** - Database
- **Spatie Laravel Permission** - Role & Permission Management
- **Inertia.js** - Modern monolith architecture

### Frontend
- **React 18** - UI Library
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **TailwindCSS** - Utility-first CSS
- **shadcn/ui** - UI Components
- **TanStack Table** - Data Tables
- **SweetAlert2** - Toast Notifications
- **Lucide React** - Icons
- **date-fns** - Date Formatting

## ✨ Features

### Public Website
- 🏫 Profil Sekolah (Visi, Misi, Sejarah)
- 👨‍🏫 Daftar Guru & Staff
- 📚 Program Keahlian & Jurusan
- 🎯 Program Unggulan
- 📰 Artikel & Berita
- 🏆 Kegiatan & Prestasi
- 💼 Portofolio Project Siswa
- 📸 Galeri Foto & Video
- 📥 Download Center
- 💬 Testimoni
- 📞 Kontak & Maps
- 🎓 PPDB Online

### Admin Dashboard
- 📊 Dashboard Analytics
- 👤 User Management (Role & Permission)
- 🏢 Master Data Management:
  - Profil Sekolah
  - Guru & Staff
  - Jurusan
  - Program Unggulan
  - Program Keahlian
  - Project Siswa
- 📝 Content Management:
  - Artikel & Berita
  - Kegiatan & Prestasi
  - Galeri
  - Download Center
  - Testimoni
- ⚙️ Settings:
  - Account Settings
  - Appearance (Dark Mode)

### Key Features
- ✅ **SEO Optimized** - Auto-generated slugs, meta tags
- ✅ **Responsive Design** - Mobile-friendly
- ✅ **Dark Mode** - Full dark mode support
- ✅ **Image Upload** - Drag & drop with preview
- ✅ **Icon Picker** - Visual icon selection
- ✅ **Toast Notifications** - Success/error messages
- ✅ **Data Tables** - Search, sort, pagination
- ✅ **Form Validation** - Client & server-side
- ✅ **Role-based Access** - Secure permissions

## 📋 Prerequisites

- PHP >= 8.2
- Composer
- Node.js >= 18
- MySQL >= 8.0
- npm or yarn

## 🛠️ Installation

### 1. Clone Repository
```bash
git clone <repository-url>
cd smkbim
```

### 2. Install Dependencies
```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

### 3. Environment Setup
```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

### 4. Database Configuration
Edit `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=smkbim
DB_USERNAME=root
DB_PASSWORD=
```

### 5. Run Migrations & Seeders
```bash
# Run migrations
php artisan migrate

# Seed database with sample data
php artisan db:seed
```

### 6. Storage Link
```bash
php artisan storage:link
```

### 7. Build Assets
```bash
# Development
npm run dev

# Production
npm run build
```

### 8. Start Development Server
```bash
# Terminal 1 - Laravel
php artisan serve

# Terminal 2 - Vite
npm run dev
```

Visit: `http://localhost:8000`

## 👤 Default Login

```
Email: admin@smkbim.sch.id
Password: password
```

## 📁 Project Structure

```
smkbim/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Admin/          # Admin controllers
│   │   │   └── Public/         # Public controllers
│   │   └── Middleware/
│   └── Models/
├── database/
│   ├── migrations/
│   └── seeders/
├── resources/
│   ├── js/
│   │   ├── components/         # Reusable components
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── data-table.tsx
│   │   │   ├── delete-dialog.tsx
│   │   │   ├── image-upload.tsx
│   │   │   └── icon-picker.tsx
│   │   ├── Layouts/           # Layout components
│   │   ├── Pages/             # Page components
│   │   │   ├── Admin/         # Admin pages
│   │   │   └── Public/        # Public pages
│   │   ├── lib/               # Utilities
│   │   └── types/             # TypeScript types
│   └── css/
└── routes/
    └── web.php
```

## 🎨 UI Components

Project ini menggunakan **shadcn/ui** dengan komponen custom:

### Core Components
- `DataTable` - Tabel dengan search, sort, pagination
- `DeleteDialog` - Konfirmasi hapus
- `ImageUpload` - Upload gambar dengan preview
- `IconPicker` - Pilih icon visual

### shadcn/ui Components
- Button, Input, Label, Textarea
- Card, Badge, Avatar
- Select, Popover, Dialog
- Sidebar, Breadcrumb
- dan lainnya...

## 🔧 Development

### Add New CRUD Module

1. **Create Migration**
```bash
php artisan make:migration create_items_table
```

2. **Create Model**
```bash
php artisan make:model Item
```

3. **Create Controller**
```bash
php artisan make:controller Admin/ItemController --resource
```

4. **Add Routes** in `routes/web.php`:
```php
Route::resource('items', ItemController::class);
```

5. **Create React Pages**:
- `resources/js/Pages/Admin/Items/Index.tsx`
- `resources/js/Pages/Admin/Items/Create.tsx`
- `resources/js/Pages/Admin/Items/Edit.tsx`

### Install shadcn/ui Component
```bash
npx shadcn@latest add [component-name]
```

## 📝 Common Commands

```bash
# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear

# Generate Ziggy routes
php artisan ziggy:generate

# Generate Wayfinder types
php artisan wayfinder:generate

# Run tests
php artisan test

# Code formatting
npm run format

# Type checking
npm run type-check
```

## 🚀 Deployment

For detailed deployment instructions, please refer to [Deployment Guide](doc/deployment.md).

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is proprietary software for SMK Bina Insan Mulia.

## 👨‍💻 Developer

Developed with ❤️ for SMK Bina Insan Mulia

---

**Version:** 1.0.0  
**Last Updated:** December 2025
