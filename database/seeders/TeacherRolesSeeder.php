<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class TeacherRolesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create teacher and student roles
        $roles = [
            'guru' => 'Guru (Teacher)',
            'wali_kelas' => 'Wali Kelas (Homeroom Teacher)',
            'guru_mapel' => 'Guru Mata Pelajaran (Subject Teacher)',
            'siswa' => 'Siswa (Student)',
        ];

        foreach ($roles as $roleName => $description) {
            $role = Role::firstOrCreate(['name' => $roleName]);
            $this->command->info("✓ Role '{$roleName}' created");
        }

        // Define permissions for teachers
        $teacherPermissions = [
            'view_grades',
            'manage_own_grades',
            'view_attendance',
            'manage_own_attendance',
            'view_students',
        ];

        // Create permissions and assign to guru role
        $guruRole = Role::findByName('guru');
        foreach ($teacherPermissions as $permissionName) {
            $permission = Permission::firstOrCreate(['name' => $permissionName]);
            if (!$guruRole->hasPermissionTo($permission)) {
                $guruRole->givePermissionTo($permission);
            }
        }

        // Wali kelas gets additional permissions
        $waliKelasRole = Role::findByName('wali_kelas');
        $waliKelasPermissions = [
            ...$teacherPermissions,
            'manage_class_attendance',
            'manage_attitude_grades',
            'view_class_reports',
        ];

        foreach ($waliKelasPermissions as $permissionName) {
            $permission = Permission::firstOrCreate(['name' => $permissionName]);
            if (!$waliKelasRole->hasPermissionTo($permission)) {
                $waliKelasRole->givePermissionTo($permission);
            }
        }

        // Guru mapel gets subject-specific permissions
        $guruMapelRole = Role::findByName('guru_mapel');
        $guruMapelPermissions = [
            ...$teacherPermissions,
            'manage_subject_grades',
        ];

        foreach ($guruMapelPermissions as $permissionName) {
            $permission = Permission::firstOrCreate(['name' => $permissionName]);
            if (!$guruMapelRole->hasPermissionTo($permission)) {
                $guruMapelRole->givePermissionTo($permission);
            }
        }

        // Siswa gets basic student permissions
        $siswaRole = Role::findByName('siswa');
        $siswaPermissions = [
            'view_own_grades',
            'view_own_attendance',
            'view_own_report_card',
        ];

        foreach ($siswaPermissions as $permissionName) {
            $permission = Permission::firstOrCreate(['name' => $permissionName]);
            if (!$siswaRole->hasPermissionTo($permission)) {
                $siswaRole->givePermissionTo($permission);
            }
        }

        $this->command->info('');
        $this->command->info('All roles and permissions created successfully!');
    }
}
