<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class MyUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::updateOrCreate(
            ['email' => 'rilham2612@gmail.com'],
            [
                'name' => 'Ilham Gusnul',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );

        $user->assignRole('super_admin');
        
        $this->command->info('User rilham2612@gmail.com created/updated with password "password" and super_admin role.');
    }
}
