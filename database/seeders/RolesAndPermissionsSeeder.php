<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Truncate tables for a clean slate
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Role::truncate();
        Permission::truncate();
        \Illuminate\Support\Facades\DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        // 1. Create Permissions
        $permissions = [
            // User Management
            'manage_users',
            'manage_roles',
            'manage_permissions',
            'assign_roles',

            // Academic Data
            'manage_classes',
            'manage_subjects',
            'manage_class_assignments',
            'manage_subject_assignments',
            'view_all_students',
            'view_class_students', // for wali kelas
            'edit_class_students', // for wali kelas
            'view_subject_students', // for guru mapel

            // Grades & Attendance
            'manage_class_attendance', // for wali kelas
            'manage_class_grades', // for wali kelas (rekap)
            'input_subject_grades', // for guru mapel

            // Content Management
            'manage_articles',
            'manage_gallery',
            'manage_downloads',
            'manage_activities',

            // PPDB
            'manage_ppdb',
            'view_ppdb_registrations',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // 2. Create Roles and Assign Permissions

        // Super Admin (All Access)
        $superAdmin = Role::create(['name' => 'super_admin']);
        $superAdmin->givePermissionTo(Permission::all());

        // Admin Sekolah
        $adminSekolah = Role::create(['name' => 'admin_sekolah']);
        $adminSekolah->givePermissionTo([
            'manage_classes',
            'manage_subjects',
            'view_all_students',
            'manage_articles',
            'manage_gallery',
            'manage_downloads',
            'manage_activities',
            'manage_roles', // Limited by policy/controller logic, but needs permission
            'manage_permissions', // Limited by policy/controller logic
        ]);

        // Admin PPDB
        $adminPpdb = Role::create(['name' => 'admin_ppdb']);
        $adminPpdb->givePermissionTo([
            'manage_ppdb',
            'view_ppdb_registrations',
        ]);

        // Admin Konten
        $adminKonten = Role::create(['name' => 'admin_konten']);
        $adminKonten->givePermissionTo([
            'manage_articles',
            'manage_gallery',
            'manage_downloads',
            'manage_activities',
        ]);

        // Guru (Base Role)
        $guru = Role::create(['name' => 'guru']);
        // Guru base role might not have specific permissions by default, 
        // they get access via Wali Kelas / Guru Mapel assignments + roles below.

        // Contextual Role: Wali Kelas
        $waliKelas = Role::create(['name' => 'wali_kelas']);
        $waliKelas->givePermissionTo([
            'view_class_students',
            'edit_class_students',
            'manage_class_attendance',
            'manage_class_grades',
        ]);

        // Contextual Role: Guru Mapel
        $guruMapel = Role::create(['name' => 'guru_mapel']);
        $guruMapel->givePermissionTo([
            'input_subject_grades',
            'view_subject_students',
        ]);
        
        // Optional: Assign super_admin role to a specific user if needed (e.g. ID 1)
        // This is usually done in DatabaseSeeder or manually.
    }
}
