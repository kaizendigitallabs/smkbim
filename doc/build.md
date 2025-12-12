# AGENT: SMK Bina Insan Mulia Website

## 1. Project Overview

Website company profile + PPDB untuk **SMK Bina Insan Mulia** dengan 1 jurusan utama. Website berfungsi sebagai:

- Company profile sekolah
- Etalase kompetensi keahlian
- Kanal informasi kegiatan dan prestasi
- Hub SEO untuk menarik trafik organik
- Halaman PPDB dengan tombol khusus di navbar

## 2. Tech Stack (Fixed)

- **Backend:** Laravel 12 (API + logic utama)
- **Frontend:** React (SPA untuk admin dan/atau public jika diperlukan)
- **UI:** Tailwind CSS
- **Admin Dashboard Template:** TailAdmin Free Tailwind Dashboard Template  
  Repo: `https://github.com/TailAdmin/tailadmin-free-tailwind-dashboard-template.git`

> Catatan: Template TailAdmin digunakan sebagai dasar tampilan **dashboard admin** dan diintegrasikan dengan Laravel + Tailwind. React digunakan untuk interaktivitas/admin SPA sesuai kebutuhan.

## 3. Global Design Tokens

Tambahan: gunakan juga **gradient hijau → putih** sebagai token visual khusus, misalnya:
- Tailwind: `bg-gradient-to-r from-[#0f743e] to-white` atau `from-[#0f743e]/90 to-white`.
- Dipakai hanya untuk elemen tertentu seperti **hero section**, banner utama, atau strip highlight penting.
- Jangan dipakai berlebihan (bukan untuk semua card/button) supaya efeknya tetap kuat dan tidak norak.

- **Primary Color:** `#0f743e`
- **Secondary Color:** `#e28743`

Gunakan warna ini secara konsisten:

- Navbar CTA (PPDB) → Primary
- Link penting / button utama → Primary
- Accent, badge, highlight → Secondary

## 4. Struktur Menu Public (Navbar)

### Menu Utama

1. **Beranda**
2. **Profil**
3. **Jurusan**
4. **Kegiatan**
5. **Informasi**
6. **Galeri**
7. **Kontak**
8. **PPDB** → tampil sebagai **button khusus** di sisi kanan navbar

### Aturan Implementasi Navbar & Dropdown

- Navbar wajib mendukung **submenu berbentuk dropdown** untuk item yang punya anak (Profil, Jurusan, Kegiatan, Informasi, Galeri).
- Di desktop:
  - Dropdown muncul saat **hover** atau **click** (pilih salah satu dan konsisten).
  - Dropdown ditata dengan Tailwind (shadow, rounded, spacing) agar mudah dibaca.
- Di mobile:
  - Gunakan **hamburger menu**.
  - Submenu ditampilkan sebagai nested list (accordion / expand-collapse) sehingga semua submenu tetap bisa diakses.
- PPDB tetap berbentuk **button** (bukan item dropdown) dan selalu berada di posisi paling kanan.

### Detail Menu & Submenu

#### 1. Beranda

- Tanpa submenu.
- Berfungsi sebagai **halaman utama yang padat informasi**, bukan sekadar hero pendek.
- Komponen minimal yang harus ada:
  - **Hero section** dengan headline kuat + CTA utama **"Daftar PPDB"** (button berwarna primary).
  - **Sekilas tentang sekolah** (1–2 paragraf singkat + link ke halaman Profil).
  - **Highlight jurusan utama** (nama kompetensi keahlian, gambaran singkat, link ke halaman Jurusan).
  - **Keunggulan sekolah** (3–6 poin dalam bentuk icon + teks pendek).
  - **Program unggulan sekolah** (ringkasan 2–4 program, misal: keagamaan, industri, magang, karakter).
  - **Kegiatan & berita terbaru** (list 3–6 item terakhir yang diambil dari modul Informasi/Kegiatan).
  - **Testimoni** (opsional, 2–3 testimoni singkat dari orang tua/alumni/siswa).
  - **Sekilas fasilitas** (slider/strip foto singkat yang link ke halaman Galeri atau Jurusan/Fasilitas).
  - **Informasi kontak cepat** (alamat singkat + tombol ke halaman Kontak).
- Layout harus terasa **hidup dan modern**: gunakan grid, card, dan spacing yang cukup, bukan hanya blok teks panjang.

#### 2. Profil

Submenu:

- **Tentang Sekolah**
  - Profil singkat SMK Bina Insan Mulia
  - Visi & Misi
  - Sejarah singkat
- **Struktur Organisasi**
  - Kepala sekolah, wakasek, dll.
- **Guru & Tenaga Pendidik**
  - Daftar guru per bidang / mapel
- **Program Unggulan Sekolah**
  - Program keagamaan, karakter, industri, magang, dll.

#### 3. Jurusan

- Sekolah hanya punya **1 kompetensi keahlian** → jadikan fokus. Submenu:
- **Profil Kompetensi Keahlian**
  - Jelaskan jurusan (mis: Rekayasa Perangkat Lunak / lainnya)
  - Sertakan juga *Program Unggulan Jurusan* di halaman ini.
- **Kurikulum & Fasilitas Praktikum**
  - Struktur kurikulum
  - Detail laboratorium, perangkat, software
- **Portofolio / Project Siswa**
  - Showcase project terbaik siswa.

#### 4. Kegiatan

Submenu:

- **Kegiatan Sekolah**
- **Ekstrakurikuler**
- **Prestasi Siswa**

#### 5. Informasi

Submenu:

- **Berita Sekolah**
- **Artikel Pendidikan**
- **Tips & Karir SMK**
- **Teknologi & Industri**
- **Download** (opsional: brosur, kalender akademik, panduan siswa)

#### 6. Galeri

Submenu:

- **Foto**
- **Video**

#### 7. Kontak

- Tanpa submenu.
- Isi:
  - Alamat + Google Maps embed
  - Kontak WhatsApp
  - Email
  - Form kontak
  - Jam operasional

#### 8. PPDB (Button di Navbar)

PPDB tetap item navbar, tapi **secara visual berupa button**. Submenu (dropdown atau di routing terpisah):

- **Informasi Umum PPDB**
- **Alur Pendaftaran**
- **Syarat Pendaftaran**
- **Biaya Pendidikan**
- **Timeline**
- **Daftar Online**
- **FAQ PPDB**

## 5. Halaman Admin (CRUD + Integrasi Public) (CRUD + Integrasi Public)

### Admin Tech & Layout

- Admin panel berbasis **React + Tailwind CSS**.
- Gunakan template: **TailAdmin Free React Tailwind Admin Dashboard**.
- Admin dan public bisa dibuat terpisah:
  - Option A: Admin sebagai SPA React yang dikonsumsi via API Laravel.
  - Option B: Monorepo dengan Laravel untuk API & React untuk admin/public.

### Modul Admin Utama

Semua modul di bawah **wajib minimal CRUD** (Create, Read, Update, Delete) dan terintegrasi ke halaman publik.

1. **Admin Auth**

   - Login admin
   - Manajemen user admin (opsional)

2. **Profil Sekolah**

   - Data profil sekolah (nama, deskripsi singkat, alamat, kontak, dll.)
   - Visi & Misi
   - Sejarah
   - Struktur Organisasi (role + nama + urutan)
   - Program Unggulan Sekolah

3. **Guru & Tenaga Pendidik**

   - Nama
   - Mapel / posisi
   - Foto
   - Kontak (opsional)
   - Status aktif

4. **Jurusan / Kompetensi Keahlian**

   - Profil kompetensi
   - Program unggulan jurusan
   - Kurikulum
   - Fasilitas (lab, perangkat)
   - Koleksi project / portofolio siswa

5. **Kegiatan & Prestasi**

   - Tipe konten: Kegiatan Sekolah / Ekstrakurikuler / Prestasi
   - Judul
   - Tanggal
   - Deskripsi
   - Gambar cover (opsional)

6. **Artikel & Berita**

   - Kategori: Berita Sekolah / Artikel Pendidikan / Tips & Karir SMK / Teknologi & Industri
   - Judul
   - Slug (SEO friendly)
   - Konten (HTML/Markdown)
   - Tag
   - Status: draft/publish

7. **Galeri**

   - Jenis: Foto / Video
   - Judul
   - URL media / upload file
   - Kategori/kegiatan terkait

8. **Download Center** (opsional)

   - Nama file
   - Deskripsi
   - Kategori (Brosur, Kalender, Panduan)
   - File/link

9. **PPDB Management**

   - Pengaturan informasi umum PPDB
   - Alur pendaftaran (step list)
   - Syarat pendaftaran (list)
   - Biaya pendidikan (tabel biaya)
   - Timeline (tanggal penting)
   - Data pendaftar (jika form PPDB internal)

## 6. Integrasi Admin ↔ Public

- Semua konten public **jangan hardcode** → ambil dari Laravel API.
- Admin melakukan CRUD → data langsung tampil di:
  - Beranda (highlight berita/kegiatan terbaru, program unggulan, dsb.)
  - Halaman Profil, Jurusan, Kegiatan, Informasi, Galeri, PPDB.

Contoh integrasi:

- Modul **Artikel & Berita** admin → muncul di menu **Informasi** (Berita Sekolah, Artikel Pendidikan, dst) dengan filtering kategori.
- Modul **Kegiatan & Prestasi** → dipakai untuk halaman **Kegiatan** dan sebagian highlight di beranda.
- **Program Unggulan Sekolah** → ditampilkan di beranda dan halaman profil.
- **PPDB Management** → dipakai di halaman khusus PPDB.

## 8. Autentikasi (Login) & Future Role/Permission (Login) & Future Role/Permission

### 8.0. Halaman Login Admin (React + Tailwind + shadcn/ui)

Halaman login admin wajib dibuat pada route: ``.

### 8.0.1. Aturan UI & UX Login

- Gunakan komponen shadcn/ui: `Card`, `Button`, `Input`, `Label`, `Alert`.
- Aksen warna menggunakan global primary `#0f743e`.
- Layout minimalis, center screen, form card.
- Form berisi:
  - Input email
  - Input password (type password)
  - Tombol **Login** (solid, warna primary)
  - Error message jika login gagal

### 8.0.2. Flow Login Frontend

1. User submit email & password.
2. React mengirim request ke Laravel:
   ```http
   POST /login
   Content-Type: application/json
   { email, password }
   ```
3. Jika sukses, Laravel mengembalikan:
   ```json
   {
     "user": {
       "id": 1,
       "name": "Super Admin",
       "email": "admin@smkbima.sch.id",
       "roles": ["super_admin"],
       "permissions": []
     },
     "token": "..."
   }
   ```
4. React menyimpan:
   - token → localStorage
   - user → global state (AuthContext / Zustand)
5. Redirect otomatis ke: ``.

### 8.0.3. Proteksi Route Admin

Semua route admin harus dibungkus dengan guard:

- Jika **tidak ada token** → redirect ke `/admin/login`
- Jika ada token → panggil `/user` untuk validasi
- Jika gagal validasi → logout paksa + redirect login

Contoh pseudocode React:

```tsx
function ProtectedRoute({ children }) {
  const { user, token } = useAuth();

  if (!token) return <Navigate to="/admin/login" />;

  if (!user) return <LoadingScreen />;

  return children;
}
```

### 8.0.4. Integrasi dengan Template TailAdmin

- Gunakan layout TailAdmin hanya setelah login berhasil.
- Halaman `/admin/login` harus *tidak menggunakan* layout TailAdmin.
- Setelah login, semua halaman admin menggunakan layout default TailAdmin (sidebar, header, dsb.).

### 8.0.5. API Error Handling

Jika login gagal (401), tampilkan error di form:

- “Email atau password salah.”
- Style error menggunakan komponen `Alert` shadcn/ui.

---

## 8. Autentikasi (Login) & Future Role/Permission

### 8.1. Login Admin (WAJIB ADA)

- Backend menggunakan **Laravel 12 + Sanctum + Breeze (API)** untuk sistem autentikasi.
- Endpoint minimal:
  - `POST /login`
  - `POST /logout`
  - `GET /user` → mengembalikan data user yang sedang login.
- React Admin (TailAdmin) wajib:
  - Memiliki halaman **/admin/login** untuk form login.
  - Menyimpan **token / session** dan data user di state global (context/store).
  - Melindungi semua route `/admin/**` dengan guard (redirect ke login jika belum autentikasi).

### 8.2. Fondasi Role & Permission (Untuk Nanti)

- Walau implementasi role & permission detail akan diatur kemudian, **struktur dari awal harus siap**.
- Response `GET /user` dari Laravel **harus disiapkan** untuk bisa mengembalikan:
  - `roles`: array string (contoh awal: `["super_admin"]`).
  - `permissions`: array string (contoh awal: `[]`).
- Rencana ke depan (tidak harus langsung dibuat, tapi dijadikan acuan desain):
  - Pakai **spatie/laravel-permission** untuk manajemen role & permission.
  - Proteksi endpoint API menggunakan middleware `role:` dan/atau `permission:`.
  - Di React, sidebar/menu dan halaman akan bisa difilter berdasarkan `roles` / `permissions`.

---

## 9. Struktur Folder Proyek (Laravel + React Public + React Admin)

### 9.1. Struktur Level Root

Rekomendasi struktur monorepo:

```text
project-root/
├─ backend/              # Laravel 12 (API + logic utama)
├─ admin-frontend/       # React + Tailwind + shadcn/ui + TailAdmin (panel admin)
└─ public-frontend/      # React + Tailwind + shadcn/ui (website publik)
```

- `backend/` → berisi full Laravel (app, routes, database, dll.).
- `admin-frontend/` → clone/import template TailAdmin lalu sesuaikan theme & routing.
- `public-frontend/` → React app untuk website SMK (navbar, halaman publik, dll.).

### 9.2. Struktur Minimal `admin-frontend`

```text
admin-frontend/
├─ src/
│  ├─ main.tsx
│  ├─ App.tsx
│  ├─ routes/
│  │   ├─ index.tsx
│  │   ├─ protected-routes.tsx
│  │   └─ admin/
│  ├─ pages/
│  │   ├─ auth/
│  │   │   └─ AdminLoginPage.tsx
│  │   ├─ dashboard/
│  │   ├─ teachers/
│  │   ├─ activities/
│  │   ├─ articles/
│  │   └─ ppdb/
│  ├─ components/
│  ├─ context/
│  │   └─ AuthContext.tsx
│  └─ lib/
└─ ...
```

- `pages/auth/AdminLoginPage.tsx` → halaman login admin.
- `context/AuthContext.tsx` → menyimpan user, token, roles, permissions.
- `routes/protected-routes.tsx` → wrapper untuk proteksi route admin.

### 9.3. Struktur Minimal `backend` (Laravel)

```text
backend/
├─ app/
│  ├─ Http/
│  ├─ Models/
│  └─ ...
├─ routes/
│  ├─ api.php        # endpoint untuk admin & public data
│  └─ web.php        # kalau ada blade/public non-API
├─ database/
│  ├─ migrations/
│  ├─ seeders/
│  └─ factories/
└─ ...
```

---

## 10. Ringkasan Implementasi Backend Auth (Laravel Breeze API + Sanctum)

### 10.1. Setup Auth API di Laravel

- Install Sanctum.
- Install Laravel Breeze dengan preset API.
- Jalankan migrasi.
- Pastikan middleware Sanctum sudah aktif di kernel dan CORS sudah mengizinkan akses dari frontend React.

### 10.2. Endpoint Minimal yang Harus Tersedia

- `POST /login` → menerima email dan password, mengembalikan user + token.
- `POST /logout` → menghapus token / sesi.
- `GET /user` → mengembalikan user yang sedang login beserta struktur yang siap menampung `roles` dan `permissions`.

### 10.3. Alur Login dari React (Ringkas)

- React kirim `POST /login` dengan email dan password.
- Jika sukses:
  - Simpan token di localStorage atau cookie.
  - Simpan data user di AuthContext (termasuk `roles`, `permissions` meski awalnya masih minimal).
  - Redirect ke `/admin`.
- Setiap request ke endpoint admin menyertakan token sesuai mekanisme yang dipilih (Authorization header atau cookie).

---

## 11. Pemisahan Instruksi: Build vs Agent

- **Instruksi Build** = Bagian yang menjelaskan *apa yang harus dibangun* secara detail (struktur halaman, modul CRUD, struktur folder, alur login, integrasi API, dsb.). Ini boleh dikembangkan, dirinci, atau ditambah fitur baru sepanjang tidak bertentangan dengan aturan agent.
- **Instruksi Agent (Mutlak)** = Bagian **Aturan Agent (Mutlak / Konsistensi)** pada poin 7 di atas. Ini adalah constraint utama yang **tidak boleh dilanggar**:
  - Tech stack tidak diubah sembarangan.
  - Warna global (primary, secondary, gradient hijau-putih) digunakan sesuai aturan.
  - Navbar + button PPDB harus mengikuti pola yang sudah ditetapkan.
  - Halaman public harus kaya konten dan visual, bukan hanya teks kosong.
  - CRUD di admin harus menjadi sumber data untuk halaman public.

Saat membuat kode, desain, atau penjelasan baru untuk proyek ini, perlakukan dokumen ini sebagai kombinasi:
- **Blueprint Build** (poin 1–6, 8–10, dan struktur lain yang menjelaskan apa yang dibangun), dan
- **Agent Rules Mutlak** (poin 7 dan 11 ini) yang mengunci konsistensi.

Dokumen ini bertindak sebagai **AGENT / GUIDELINE** untuk semua pekerjaan terkait website **SMK Bina Insan Mulia**: struktur halaman public, admin panel, CRUD, autentikasi (login admin), integrasi API, dan konsistensi visual, dengan fondasi yang sudah disiapkan untuk mendukung role & permission di tahap berikutnya.

