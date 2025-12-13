<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SchoolClass;
use App\Models\AcademicYear;

class ClassSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample classes for SMK
        $classes = [
            // Grade 10 (X)
            ['name' => 'X RPL 1', 'level' => 'X', 'academic_year' => '2024/2025'],
            ['name' => 'X RPL 2', 'level' => 'X', 'academic_year' => '2024/2025'],
            ['name' => 'X TKJ 1', 'level' => 'X', 'academic_year' => '2024/2025'],
            ['name' => 'X TKJ 2', 'level' => 'X', 'academic_year' => '2024/2025'],
            ['name' => 'X MM 1', 'level' => 'X', 'academic_year' => '2024/2025'],
            
            // Grade 11 (XI)
            ['name' => 'XI RPL 1', 'level' => 'XI', 'academic_year' => '2024/2025'],
            ['name' => 'XI RPL 2', 'level' => 'XI', 'academic_year' => '2024/2025'],
            ['name' => 'XI TKJ 1', 'level' => 'XI', 'academic_year' => '2024/2025'],
            ['name' => 'XI TKJ 2', 'level' => 'XI', 'academic_year' => '2024/2025'],
            ['name' => 'XI MM 1', 'level' => 'XI', 'academic_year' => '2024/2025'],
            
            // Grade 12 (XII)
            ['name' => 'XII RPL 1', 'level' => 'XII', 'academic_year' => '2024/2025'],
            ['name' => 'XII RPL 2', 'level' => 'XII', 'academic_year' => '2024/2025'],
            ['name' => 'XII TKJ 1', 'level' => 'XII', 'academic_year' => '2024/2025'],
            ['name' => 'XII TKJ 2', 'level' => 'XII', 'academic_year' => '2024/2025'],
            ['name' => 'XII MM 1', 'level' => 'XII', 'academic_year' => '2024/2025'],
        ];

        foreach ($classes as $classData) {
            SchoolClass::firstOrCreate(
                ['name' => $classData['name'], 'academic_year' => $classData['academic_year']],
                $classData
            );
            $this->command->info("✓ Class '{$classData['name']}' created");
        }

        $this->command->info('');
        $this->command->info('Sample classes created successfully!');
    }
}
