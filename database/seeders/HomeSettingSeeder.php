<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HomeSetting;

class HomeSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        HomeSetting::firstOrCreate([], [
            'hero_title' => 'SMK Bina Insan Mulia',
            'hero_subtitle' => 'Sekolah Pusat Keunggulan',
            'hero_description' => 'Mempersiapkan Generasi Siap Kerja dan Berakhlak Mulia',
            'hero_cta_text' => 'Daftar Sekarang',
            'hero_cta_link' => '/ppdb',
            
            // Hero Bullets
            'hero_feature_1' => 'Kurikulum selaras dengan kebutuhan industri',
            'hero_feature_2' => 'Pembinaan karakter dan keagamaan yang intensif',
            'hero_feature_3' => 'Pendampingan karir dan studi lanjut',

            // Metrics
            'metric_1_label' => 'Siswa Aktif',
            'metric_1_value' => '500+',
            'metric_2_label' => 'Tingkat Kelulusan',
            'metric_2_value' => '95%',
            'metric_3_label' => 'Ekstrakurikuler',
            'metric_3_value' => '15+',

            // Features (Sekilas Info)
            'feature_1_title' => 'Fokus Pembinaan Karakter',
            'feature_1_description' => 'Pembiasaan ibadah, kedisiplinan, dan budaya saling menghargai menjadi bagian dari keseharian di sekolah.',
            'feature_2_title' => 'Lingkungan Belajar Nyaman',
            'feature_2_description' => 'Ruang kelas, laboratorium, serta fasilitas pendukung dirancang untuk mendukung proses belajar yang optimal.',
            'feature_3_title' => 'Pendampingan Karir & Studi Lanjut',
            'feature_3_description' => 'Siswa dibimbing untuk memilih jalur terbaik: langsung bekerja, berwirausaha, atau melanjutkan pendidikan.',

            'about_title' => 'Sekilas Tentang SMK Bina Insan Mulia',
            'about_description' => 'SMK Bina Insan Mulia hadir sebagai sekolah kejuruan yang berkomitmen menyiapkan lulusan yang terampil, berkarakter, dan siap menghadapi perubahan zaman. Melalui perpaduan antara pembelajaran teori, praktik langsung, serta pembinaan akhlak, sekolah ini menjadi tempat tumbuhnya generasi muda yang mandiri dan bertanggung jawab.',
        ]);

        $this->command->info('Home settings created successfully!');
    }
}
