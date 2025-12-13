<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class AdminOperatorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Super Admin
        $superAdmin = User::firstOrCreate(
            ['email' => 'admin@smkbim.sch.id'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'), // Change this in production!
            ]
        );

        // Assign super_admin role
        $superAdminRole = Role::firstOrCreate(['name' => 'super_admin']);
        if (!$superAdmin->hasRole('super_admin')) {
            $superAdmin->assignRole($superAdminRole);
        }

        $this->command->info('Super Admin created: admin@smkbim.sch.id / password');

        // Create Operator
        $operator = User::firstOrCreate(
            ['email' => 'operator@smkbim.sch.id'],
            [
                'name' => 'Operator',
                'password' => Hash::make('password'), // Change this in production!
            ]
        );

        // Assign operator role
        $operatorRole = Role::firstOrCreate(['name' => 'operator']);
        if (!$operator->hasRole('operator')) {
            $operator->assignRole($operatorRole);
        }

        $this->command->info('Operator created: operator@smkbim.sch.id / password');

        // Display credentials
        $this->command->info('');
        $this->command->info('=== LOGIN CREDENTIALS ===');
        $this->command->info('Super Admin:');
        $this->command->info('  Email: admin@smkbim.sch.id');
        $this->command->info('  Password: password');
        $this->command->info('');
        $this->command->info('Operator:');
        $this->command->info('  Email: operator@smkbim.sch.id');
        $this->command->info('  Password: password');
        $this->command->info('');
        $this->command->warn('IMPORTANT: Change these passwords in production!');
    }
}
