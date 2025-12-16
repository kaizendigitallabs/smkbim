<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\ClassTeacherAssignment;
use App\Models\ReportCardSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttendanceController extends Controller
{
    /**
     * Display attendance management page for wali kelas
     */
    public function myClass()
    {
        $user = Auth::user();
        
        // Get current active semester & academic year
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        // Get wali kelas assignment
        $assignment = ClassTeacherAssignment::with(['schoolClass.students.user'])
            ->where('user_id', $user->id)
            ->where('academic_year', $currentAcademicYear)
            ->first();
        
        if (!$assignment) {
            return Inertia::render('Teacher/Attendance/MyClass', [
                'assignment' => null,
                'students' => [],
                'attendances' => [],
                'currentSemester' => $currentSemester,
                'currentAcademicYear' => $currentAcademicYear,
                'semesterStartDate' => null,
                'semesterEndDate' => null,
            ]);
        }
        
        // Get students
        $students = $assignment->schoolClass->students()
            ->with('user')
            ->orderBy('nis')
            ->get();
        
        // Calculate semester date range
        $yearParts = explode('/', $currentAcademicYear);
        $startYear = (int) $yearParts[0];
        $endYear = (int) $yearParts[1];
        
        if ($currentSemester === 'Ganjil') {
            // Semester Ganjil: July - December
            $semesterStartDate = $startYear . '-07-01';
            $semesterEndDate = $startYear . '-12-31';
        } else {
            // Semester Genap: January - June
            $semesterStartDate = $endYear . '-01-01';
            $semesterEndDate = $endYear . '-06-30';
        }
        
        // Get all attendances for this semester (Daily Logs)
        $attendances = Attendance::where('class_id', $assignment->class_id)
            ->whereBetween('date', [$semesterStartDate, $semesterEndDate])
            ->get()
            ->groupBy('date')
            ->map(function ($dateAttendances) {
                return $dateAttendances->keyBy('student_id');
            });
            
        // Get Attendance Recaps (Monthly Totals)
        $attendanceRecaps = \App\Models\AttendanceRecap::where('class_id', $assignment->class_id)
            ->where('semester', $currentSemester)
            ->where('academic_year', $currentAcademicYear)
            ->get()
            ->groupBy('month')
            ->toArray(); // Force conversion to array
        
        return Inertia::render('Teacher/Attendance/MyClass', [
            'assignment' => $assignment,
            'students' => $students,
            'attendances' => $attendances,
            'attendanceRecaps' => $attendanceRecaps,
            'currentSemester' => $currentSemester,
            'currentAcademicYear' => $currentAcademicYear,
            'semesterStartDate' => $semesterStartDate,
            'semesterEndDate' => $semesterEndDate,
        ]);
    }

    /**
     * Bulk store monthly attendance recap
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
        
        // Verify the class belongs to the logged-in teacher
        $assignment = ClassTeacherAssignment::where('user_id', Auth::id())
            ->where('class_id', $validated['class_id'])
            ->first();
        
        if (!$assignment) {
            abort(403, 'Unauthorized');
        }
        
        // Store or update attendance recap
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
        
        return redirect()->back()->with('success', 'Rekap absensi berhasil disimpan');
    }

    /**
     * Bulk store attendances for a specific date
     */
    public function bulkStore(Request $request)
    {
        $validated = $request->validate([
            'class_id' => 'required|exists:classes,id',
            'date' => 'required|date',
            'attendances' => 'required|array',
            'attendances.*.student_id' => 'required|exists:students,id',
            'attendances.*.status' => 'required|in:present,sick,permission,absent',
            'attendances.*.notes' => 'nullable|string',
        ]);
        
        // Verify the class belongs to the logged-in teacher
        $assignment = ClassTeacherAssignment::where('user_id', Auth::id())
            ->where('class_id', $validated['class_id'])
            ->first();
        
        if (!$assignment) {
            abort(403, 'Unauthorized');
        }
        
        // Delete existing attendances for this date
        Attendance::where('class_id', $validated['class_id'])
            ->where('date', $validated['date'])
            ->delete();
        
        // Create new attendances
        foreach ($validated['attendances'] as $attendanceData) {
            Attendance::create([
                'student_id' => $attendanceData['student_id'],
                'class_id' => $validated['class_id'],
                'date' => $validated['date'],
                'status' => $attendanceData['status'],
                'notes' => $attendanceData['notes'] ?? null,
                'recorded_by' => Auth::id(),
            ]);
        }
        
        return redirect()->back()->with('success', 'Absensi berhasil disimpan');
    }

    /**
     * Update a single attendance record
     */
    public function update(Request $request, $id)
    {
        $attendance = Attendance::findOrFail($id);
        
        // Verify the attendance belongs to the logged-in teacher's class
        $assignment = ClassTeacherAssignment::where('user_id', Auth::id())
            ->where('class_id', $attendance->class_id)
            ->first();
        
        if (!$assignment) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'status' => 'required|in:present,sick,permission,absent',
            'notes' => 'nullable|string',
        ]);
        
        $attendance->update($validated);
        
        return redirect()->back()->with('success', 'Absensi berhasil diperbarui');
    }

    /**
     * Display attendance recap
     */
    public function recap(Request $request)
    {
        $user = Auth::user();
        
        // Get current active semester & academic year
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        // Get wali kelas assignment
        $assignment = ClassTeacherAssignment::with(['schoolClass.students.user'])
            ->where('user_id', $user->id)
            ->where('academic_year', $currentAcademicYear)
            ->first();
        
        if (!$assignment) {
            return Inertia::render('Teacher/Attendance/Recap', [
                'assignment' => null,
                'students' => [],
                'currentSemester' => $currentSemester,
                'currentAcademicYear' => $currentAcademicYear,
            ]);
        }
        
        // Get date range (default: current month)
        $startDate = $request->input('start_date', date('Y-m-01'));
        $endDate = $request->input('end_date', date('Y-m-t'));
        
        // Get students with their attendance records
        $students = $assignment->schoolClass->students()
            ->with(['user', 'attendances' => function ($query) use ($startDate, $endDate) {
                $query->whereBetween('date', [$startDate, $endDate]);
            }])
            ->orderBy('nis')
            ->get();
        
        // Calculate attendance summary for each student
        $studentsWithSummary = $students->map(function ($student) {
            $attendances = $student->attendances;
            
            return [
                'student' => $student,
                'present' => $attendances->where('status', 'present')->count(),
                'sick' => $attendances->where('status', 'sick')->count(),
                'permission' => $attendances->where('status', 'permission')->count(),
                'absent' => $attendances->where('status', 'absent')->count(),
                'total' => $attendances->count(),
            ];
        });
        
        return Inertia::render('Teacher/Attendance/Recap', [
            'assignment' => $assignment,
            'students' => $studentsWithSummary,
            'currentSemester' => $currentSemester,
            'currentAcademicYear' => $currentAcademicYear,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }
}
