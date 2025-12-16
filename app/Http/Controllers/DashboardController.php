<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the appropriate dashboard based on user role.
     */
    public function index(): Response
    {
        $user = Auth::user();

        // 1. Operator
        if ($user->hasRole('operator')) {
            $stats = [
                'usersCount' => \App\Models\User::count(),
                'ppdbCount' => \App\Models\PPDBRegistration::count(),
                'studentsCount' => \App\Models\Student::count(),
                'teachersCount' => \App\Models\Teacher::count(),
            ];
            return Inertia::render('Dashboard/Operator', ['stats' => $stats]);
        }

        // 2. Tata Usaha
        if ($user->hasRole('tata_usaha')) {
            $stats = [
                'classesCount' => \App\Models\SchoolClass::count(),
                'subjectsCount' => \App\Models\Subject::count(),
                'studentsCount' => \App\Models\Student::count(),
                'downloadsCount' => \App\Models\Download::count(),
            ];
            return Inertia::render('Dashboard/Administration', ['stats' => $stats]);
        }

        // 3. Kepala Sekolah
        if ($user->hasRole('kepala_sekolah')) {
            $stats = [
                'studentsCount' => \App\Models\Student::count(),
                'teachersCount' => \App\Models\Teacher::count(),
                'classesCount' => \App\Models\SchoolClass::count(),
                'ppdbCount' => \App\Models\PPDBRegistration::count(),
            ];
            return Inertia::render('Dashboard/Principal', ['stats' => $stats]);
        }

        // 4. Wali Kelas (Contextual)
        if ($user->hasRole('wali_kelas')) {
            // Find class assigned to this teacher
             $teacher = \App\Models\Teacher::where('user_id', $user->id)->first();
             $myClass = $teacher ? \App\Models\SchoolClass::where('teacher_id', $teacher->id)->withCount('students')->first() : null;
             
             $stats = [
                 'className' => $myClass ? $myClass->name : 'Belum ditentukan',
                 'studentsCount' => $myClass ? $myClass->students_count : 0,
                 // Placeholder for attendance/activities if models exist
             ];
             
            return Inertia::render('Dashboard/Homeroom', ['stats' => $stats, 'myClass' => $myClass]);
        }

        // 5. Guru (General/Subject Teacher)
        if ($user->hasRole('guru') || $user->hasRole('guru_mapel')) {
            $teacher = \App\Models\Teacher::where('user_id', $user->id)->first();
            $subjectsCount = $teacher ? \App\Models\SubjectTeacherAssignment::where('teacher_id', $teacher->id)->count() : 0;
            
            $stats = [
                'subjectsCount' => $subjectsCount,
                // Add more specific stats if needed
            ];
            return Inertia::render('Dashboard/Teacher', ['stats' => $stats]);
        }

        // 6. Siswa
        if ($user->hasRole('siswa')) {
             $student = \App\Models\Student::where('user_id', $user->id)->first();
            return Inertia::render('Dashboard/Student', ['student' => $student]);
        }

        // 7. Default / Admin (Super Admin, Admin Sekolah)
        $stats = [
            'studentsCount' => \App\Models\Student::count(),
            'teachersCount' => \App\Models\Teacher::count(),
            'classesCount' => \App\Models\SchoolClass::count(),
            'articlesCount' => \App\Models\Article::count(),
        ];
        return Inertia::render('Dashboard/Admin', ['stats' => $stats]);
    }
}
