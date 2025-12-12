 Bagian ini adalah **aturan mutlak**. Semua build, refactor, dan pengembangan lanjutan **wajib mengikuti** aturan di bawah agar hasil tetap konsisten.

Saat membuat kode, desain, atau struktur data untuk proyek ini:

1. **Selalu gunakan:**

   - Laravel 12 untuk backend API.
   - React + Tailwind CSS untuk frontend (admin &/atau public layer yang pakai React).
   - Template admin dashboard dari repo TailAdmin Tailwind (struktur layout, sidebar, header, dsb.).
   - Database MySQL

2. **Warna Global:**

   - Gunakan `#21AD00` sebagai **primary** untuk:
     - Button utama (termasuk PPDB)
     - Link utama
     - Highlight penting
   - Gunakan `#E7974D` sebagai **secondary** untuk:
     - Accent, badge, secondary button
     - Hover/outline jika sesuai

3. **Navbar & Dropdown:**

   - Navbar wajib mendukung dropdown untuk submenu di desktop dan nested menu di mobile.
   - PPDB selalu berupa **button khusus di ujung kanan navbar**, bukan sekadar link teks.

4. **CRUD First:**

   - Setiap entitas konten (profil sekolah, guru, jurusan, kegiatan, artikel, galeri, download, PPDB info) harus punya minimal CRUD di admin sebelum dipakai di public.

5. **SEO Friendly:**

   - Artikel & berita harus punya slug, meta title, dan meta description.
   - Struktur URL bersih, contoh: `/artikel/slug-artikel`, `/berita/slug-berita`, `/ppdb`, `/jurusan/kompetensi-keahlian`.

6. **Data-driven Content:**

   - Jangan hardcode teks final kecuali label UI.
   - Text konten utama (profil, visi misi, program unggulan, dsb.) ambil dari database via API.

7. **Halaman Public Harus Menarik:**

   - Setiap halaman public (Profil, Jurusan, Kegiatan, Informasi, Galeri, Kontak, PPDB) harus memiliki struktur section yang jelas, visual (card, icon, foto), dan tidak hanya berisi paragraf teks panjang.
   - Minimal 2–3 section per halaman dengan kombinasi heading, paragraf pendek, dan elemen visual (list, card, grid).
   - Hindari tampilan "kosong" atau hanya satu blok teks; halaman harus terasa informatif dan hidup.