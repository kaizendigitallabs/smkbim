<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SchoolProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        \App\Models\SchoolProfile::create([
            'name' => 'SMK Bina Insan Mulia',
            'description' => 'SMK Bina Insan Mulia adalah sekolah menengah kejuruan yang berfokus pada pengembangan kompetensi siswa di bidang teknologi dan industri.',
            'vision' => 'Menjadi lembaga pendidikan kejuruan yang unggul, berkarakter, dan berdaya saing global.',
            'mission' => 'Menyelenggarakan pendidikan kejuruan yang berkualitas, mengembangkan karakter siswa, dan mempersiapkan lulusan yang siap kerja.',
            'history' => 'SMK Bina Insan Mulia didirikan dengan tujuan memberikan pendidikan kejuruan berkualitas kepada generasi muda Indonesia.',
            'address' => 'Jl. Pendidikan No. 123, Jakarta',
            'phone' => '021-12345678',
            'email' => 'info@smkbima.sch.id',
            'whatsapp' => '6281234567890',
            'operating_hours' => 'Senin - Jumat: 07:00 - 16:00',
        ]);
    }
}
