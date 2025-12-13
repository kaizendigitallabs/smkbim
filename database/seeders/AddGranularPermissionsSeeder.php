<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AddGranularPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Define new permissions
        $newPermissions = [
            'manage_school_programs',
            'manage_teachers',
            'manage_majors',
            'manage_major_programs',
            'manage_student_projects',
            'manage_academic_years',
            'manage_testimonials',
            'manage_home_settings',
        ];

        foreach ($newPermissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // 2. Assign to Roles

        // Super Admin gets everything
        $superAdmin = Role::where('name', 'super_admin')->first();
        if ($superAdmin) {
            $superAdmin->givePermissionTo(Permission::all());
        }

        // Admin Sekolah
        $adminSekolah = Role::where('name', 'admin_sekolah')->first();
        if ($adminSekolah) {
            $adminSekolah->givePermissionTo([
                'manage_school_programs',
                'manage_teachers',
                'manage_majors',
                'manage_major_programs',
                'manage_student_projects',
                'manage_academic_years',
                'manage_testimonials',
                'manage_home_settings',
            ]);
        }

        // Operator
        $operator = Role::where('name', 'operator')->first();
        if ($operator) {
            $operator->givePermissionTo([
                'manage_teachers',
                // Add others if appropriate, e.g. manage_classes is already likely assigned via previous logic or manually
                // If not, we can add them here to be safe
                'manage_classes',
                'manage_subjects',
                'manage_academic_years',
            ]);
        }
        
         // Tata Usaha
        $tu = Role::where('name', 'tata_usaha')->first();
        if ($tu) {
            $tu->givePermissionTo([
                'manage_teachers',
                'manage_majors',
                'manage_major_programs',
                'manage_academic_years',
            ]);
        }
    }
}
