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
        HomeSetting::create([
            'hero_title' => 'SMK BIM',
            'hero_subtitle' => 'Sekolah Menengah Kejuruan Bina Insan Mandiri - Membentuk Generasi Unggul dan Berkarakter',
            'hero_cta_text' => 'Daftar Sekarang',
            'hero_cta_link' => '/ppdb',
            'about_text' => 'SMK BIM adalah lembaga pendidikan kejuruan yang berfokus pada pengembangan keterampilan dan karakter siswa untuk menghadapi tantangan dunia kerja.',
        ]);

        $this->command->info('Home settings created successfully!');
    }
}
