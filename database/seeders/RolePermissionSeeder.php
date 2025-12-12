<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $superAdmin = \Spatie\Permission\Models\Role::create(['name' => 'super_admin']);
        $admin = \Spatie\Permission\Models\Role::create(['name' => 'admin']);
        
        // Create permissions
        $permissions = [
            'manage_school_profile',
            'manage_teachers',
            'manage_majors',
            'manage_programs',
            'manage_activities',
            'manage_articles',
            'manage_gallery',
            'manage_downloads',
            'manage_ppdb',
            'manage_contacts',
        ];

        foreach ($permissions as $permission) {
            \Spatie\Permission\Models\Permission::create(['name' => $permission]);
        }

        // Assign all permissions to super_admin
        $superAdmin->givePermissionTo(\Spatie\Permission\Models\Permission::all());
    }
}
