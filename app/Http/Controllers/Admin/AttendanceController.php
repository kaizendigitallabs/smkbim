<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\SchoolClass;
use App\Models\ReportCardSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display list of classes for attendance management
     */
    public function index()
    {
        $classes = SchoolClass::orderBy('name')->get();
        return Inertia::render('Admin/Attendance/Index', [
            'classes' => $classes,
        ]);
    }

    /**
     * Display attendance management page for a specific class (Admin View)
     */
    public function show($classId)
    {
        $schoolClass = SchoolClass::findOrFail($classId);
        
        // Get current active semester & academic year
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        // Get students
        $students = $schoolClass->students()
            ->with('user')
            ->orderBy('nis')
            ->get();
        
        // Calculate semester date range
        $yearParts = explode('/', $currentAcademicYear);
        $startYear = (int) $yearParts[0];
        $endYear = (int) $yearParts[1];
        
        if ($currentSemester === 'Ganjil') {
            $semesterStartDate = $startYear . '-07-01';
            $semesterEndDate = $startYear . '-12-31';
        } else {
            $semesterStartDate = $endYear . '-01-01';
            $semesterEndDate = $endYear . '-06-30';
        }
        
        // Get all attendances for this semester
        $attendances = Attendance::where('class_id', $classId)
            ->whereBetween('date', [$semesterStartDate, $semesterEndDate])
            ->get()
            ->groupBy('date')
            ->map(function ($dateAttendances) {
                return $dateAttendances->keyBy('student_id');
            });
            
        // Mock assignment object to satisfy the frontend interface
        $assignment = (object)[
            'class_id' => $schoolClass->id,
            'school_class' => $schoolClass,
        ];
        
        return Inertia::render('Teacher/Attendance/MyClass', [
            'assignment' => $assignment,
            'students' => $students,
            'attendances' => $attendances,
            'currentSemester' => $currentSemester,
            'currentAcademicYear' => $currentAcademicYear,
            'semesterStartDate' => $semesterStartDate,
            'semesterEndDate' => $semesterEndDate,
            'submitRoute' => 'admin.attendance.bulk-store-recap', // Override submit route
            'backRoute' => route('admin.attendance.index'), // Override back route
        ]);
    }

    /**
     * Bulk store monthly attendance recap (Admin)
     */
    public function bulkStoreRecap(Request $request)
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:classes,id',
            'month' => 'required|string',
            'semester' => 'required|string',
            'academic_year' => 'required|string',
            'recaps' => 'required|array',
            'recaps.*.student_id' => 'required|exists:students,id',
            'recaps.*.present' => 'required|integer|min:0',
            'recaps.*.sick' => 'required|integer|min:0',
            'recaps.*.permission' => 'required|integer|min:0',
            'recaps.*.absent' => 'required|integer|min:0',
        ]);
        
        // NO USER CHECK FOR ADMIN
        
        foreach ($validated['recaps'] as $recap) {
            \App\Models\AttendanceRecap::updateOrCreate(
                [
                    'student_id' => $recap['student_id'],
                    'class_id' => $validated['class_id'],
                    'month' => $validated['month'],
                    'semester' => $validated['semester'],
                    'academic_year' => $validated['academic_year'],
                ],
                [
                    'present' => $recap['present'],
                    'sick' => $recap['sick'],
                    'permission' => $recap['permission'],
                    'absent' => $recap['absent'],
                    'recorded_by' => Auth::id(),
                ]
            );
        }
        
        return redirect()->back()->with('success', 'Rekap absensi berhasil disimpan (Admin)');
    }
}
