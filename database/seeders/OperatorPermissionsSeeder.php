<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class OperatorPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get or create operator role
        $operatorRole = Role::firstOrCreate(['name' => 'operator']);

        // Define permissions that operator should have
        $permissions = [
            // Academic Management
            'manage_classes',
            'manage_subjects',
            'manage_students',
            'manage_teachers',
            'manage_academic_years',
            
            // Assignment Management
            'manage_class_assignments',
            'manage_subject_assignments',
            
            // Report Card
            'manage_report_card_settings',
            
            // User Management
            'manage_user_accounts',
            
            // Content Management (optional, adjust as needed)
            'manage_articles',
            'manage_activities',
            'manage_gallery',
            'manage_downloads',
        ];

        // Create permissions if they don't exist and assign to operator
        foreach ($permissions as $permissionName) {
            $permission = Permission::firstOrCreate(['name' => $permissionName]);
            
            if (!$operatorRole->hasPermissionTo($permission)) {
                $operatorRole->givePermissionTo($permission);
                $this->command->info("✓ Permission '{$permissionName}' granted to operator");
            } else {
                $this->command->info("- Permission '{$permissionName}' already exists");
            }
        }

        $this->command->info('');
        $this->command->info('Operator permissions updated successfully!');
    }
}
