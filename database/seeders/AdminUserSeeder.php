<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Admin
        $admin = \App\Models\User::firstOrCreate(
            ['email' => 'admin@smkbima.sch.id'],
            [
                'name' => 'Super Admin',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('super_admin');

        // Operator
        $operator = \App\Models\User::firstOrCreate(
            ['email' => 'operator@smkbima.sch.id'],
            [
                'name' => 'Operator Sekolah',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $operator->assignRole('operator');

        // Tata Usaha
        $tu = \App\Models\User::firstOrCreate(
            ['email' => 'tu@smkbima.sch.id'],
            [
                'name' => 'Staff Tata Usaha',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $tu->assignRole('tata_usaha');

        // Kepala Sekolah
        $kepsek = \App\Models\User::firstOrCreate(
            ['email' => 'kepsek@smkbima.sch.id'],
            [
                'name' => 'Kepala Sekolah',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $kepsek->assignRole('kepala_sekolah');
    }
}
