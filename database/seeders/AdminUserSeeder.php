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
        if (!\App\Models\User::where('email', 'admin@smkbima.sch.id')->exists()) {
            $admin = \App\Models\User::create([
                'name' => 'Super Admin',
                'email' => 'admin@smkbima.sch.id',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            $admin->assignRole('super_admin');
        }

        // Create Operator
        if (!\App\Models\User::where('email', 'operator@smkbima.sch.id')->exists()) {
            $operator = \App\Models\User::create([
                'name' => 'Operator Sekolah',
                'email' => 'operator@smkbima.sch.id',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            $operator->assignRole('operator');
        }

        // Create Tata Usaha
        if (!\App\Models\User::where('email', 'tu@smkbima.sch.id')->exists()) {
            $tu = \App\Models\User::create([
                'name' => 'Staff Tata Usaha',
                'email' => 'tu@smkbima.sch.id',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            $tu->assignRole('tata_usaha');
        }

        // Create Kepala Sekolah
        if (!\App\Models\User::where('email', 'kepsek@smkbima.sch.id')->exists()) {
            $kepsek = \App\Models\User::create([
                'name' => 'Kepala Sekolah',
                'email' => 'kepsek@smkbima.sch.id',
                'password' => \Illuminate\Support\Facades\Hash::make('password'),
                'email_verified_at' => now(),
            ]);
            $kepsek->assignRole('kepala_sekolah');
        }
    }
}
