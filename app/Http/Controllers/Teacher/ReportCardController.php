<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\Grade;
use App\Models\AttitudeGrade;
use App\Models\Attendance;
use App\Models\HomeroomTeacherNote;
use App\Models\ReportCardSetting;
use App\Models\SubjectTeacherAssignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportCardController extends Controller
{
    /**
     * Show student list for homeroom teacher
     */
    public function myClass()
    {
        $user = auth()->user();
        
        // Get current settings
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        // Get wali kelas assignment
        $assignment = \App\Models\ClassTeacherAssignment::with(['schoolClass.students.user', 'user'])
            ->where('user_id', $user->id)
            ->where('academic_year', $currentAcademicYear)
            ->first();
        
        if (!$assignment) {
            return Inertia::render('Teacher/ReportCard/MyClass', [
                'assignment' => null,
                'students' => [],
                'currentSemester' => $currentSemester,
                'currentAcademicYear' => $currentAcademicYear,
            ]);
        }
        
        // Get students
        $students = $assignment->schoolClass->students()
            ->with('user')
            ->orderBy('nis')
            ->get();
        
        return Inertia::render('Teacher/ReportCard/MyClass', [
            'assignment' => $assignment,
            'students' => $students,
            'currentSemester' => $currentSemester,
            'currentAcademicYear' => $currentAcademicYear,
        ]);
    }

    /**
     * Generate report card for a student
     */
    public function generate($studentId)
    {
        $student = Student::with(['user', 'schoolClass'])->findOrFail($studentId);
        
        // Get current settings
        $settings = ReportCardSetting::first();
        if (!$settings) {
            return redirect()->back()->with('error', 'Pengaturan rapot belum dikonfigurasi');
        }
        
        $semester = $settings->semester;
        $academicYear = $settings->academic_year;
        
        // Get all subject assignments for the student's class (specific or all classes)
        $assignments = SubjectTeacherAssignment::with(['subject', 'user'])
            ->where(function($query) use ($student) {
                $query->where('class_id', $student->class_id)
                      ->orWhereNull('class_id');
            })
            ->where('academic_year', $academicYear)
            ->get()
            ->sortBy(function($assignment) {
                return [$assignment->subject->subject_group, $assignment->subject->display_order];
            });
        
        // Calculate grades for each subject
        $subjectGrades = $assignments->map(function ($assignment) use ($student, $semester, $academicYear) {
            $grades = Grade::where('student_id', $student->id)
                ->where('subject_teacher_assignment_id', $assignment->id)
                ->where('semester', $semester)
                ->where('academic_year', $academicYear)
                ->get();
            
            // Group by type
            $daily = $grades->where('type', 'daily');
            $dailyExam = $grades->where('type', 'daily_exam');
            $midterm = $grades->where('type', 'midterm')->first();
            $final = $grades->where('type', 'final')->first();
            
            // Calculate averages
            $avgDaily = $daily->count() > 0 ? $daily->avg('score') : 0;
            $avgDailyExam = $dailyExam->count() > 0 ? $dailyExam->avg('score') : 0;
            $scoreMidterm = $midterm ? $midterm->score : 0;
            $scoreFinal = $final ? $final->score : 0;
            
            // Calculate final grade
            $finalGrade = ($avgDaily * 0.3) + ($avgDailyExam * 0.3) + ($scoreMidterm * 0.2) + ($scoreFinal * 0.2);
            
            // Determine predicate
            $predicate = $this->getGradePredicate($finalGrade);
            
            return [
                'subject' => $assignment->subject,
                'teacher' => $assignment->user,
                'avgDaily' => round($avgDaily, 2),
                'avgDailyExam' => round($avgDailyExam, 2),
                'scoreMidterm' => round($scoreMidterm, 2),
                'scoreFinal' => round($scoreFinal, 2),
                'finalGrade' => round($finalGrade, 2),
                'predicate' => $predicate,
            ];
        })->values();
        
        // Get attendance summary from recap
        $attendanceRecaps = \App\Models\AttendanceRecap::where('student_id', $student->id)
            ->where('semester', $semester)
            ->where('academic_year', $academicYear)
            ->get();
        
        // Calculate total attendance
        $attendanceSummary = [
            'present' => $attendanceRecaps->sum('present'),
            'sick' => $attendanceRecaps->sum('sick'),
            'permission' => $attendanceRecaps->sum('permission'),
            'absent' => $attendanceRecaps->sum('absent'),
        ];
        
        // Get attitude grades
        $attitudeGrades = AttitudeGrade::where('student_id', $student->id)
            ->where('semester', $semester)
            ->where('academic_year', $academicYear)
            ->get()
            ->keyBy('aspect');
        
        // Get homeroom teacher note
        $homeroomNote = HomeroomTeacherNote::where('student_id', $student->id)
            ->where('semester', $semester)
            ->where('academic_year', $academicYear)
            ->first();
        
        // Get homeroom teacher assignment
        $homeroomTeacher = \App\Models\ClassTeacherAssignment::with('user')
            ->where('class_id', $student->class_id)
            ->where('academic_year', $academicYear)
            ->first();
        
        return Inertia::render('Teacher/ReportCard/Generate', [
            'student' => $student,
            'settings' => $settings,
            'subjectGrades' => $subjectGrades,
            'attendanceSummary' => $attendanceSummary,
            'attitudeGrades' => $attitudeGrades,
            'homeroomNote' => $homeroomNote,
            'homeroomTeacher' => $homeroomTeacher,
            'semester' => $semester,
            'academicYear' => $academicYear,
        ]);
    }
    
    /**
     * Print report card front cover (Logo + Name)
     */
    public function printFrontCover($studentId)
    {
        $student = Student::with(['user', 'schoolClass'])->findOrFail($studentId);
        $settings = ReportCardSetting::first();
        $schoolProfile = \App\Models\SchoolProfile::first();

        return Inertia::render('Teacher/ReportCard/PrintFrontCover', [
            'student' => $student,
            'settings' => $settings,
            'schoolProfile' => $schoolProfile,
        ]);
    }

    /**
     * Print report card cover (biodata)
     */
    public function printCover($studentId)
    {
        $student = Student::with(['user', 'schoolClass'])->findOrFail($studentId);
        
        $settings = ReportCardSetting::first();
        if (!$settings) {
            return redirect()->back()->with('error', 'Pengaturan rapot belum dikonfigurasi');
        }

        // Get homeroom teacher assignment for headmaster/wali data usually needed
        $homeroomTeacher = \App\Models\ClassTeacherAssignment::with('user')
            ->where('class_id', $student->class_id)
            ->where('academic_year', $settings->academic_year)
            ->first();

        // Get school profile
        $schoolProfile = \App\Models\SchoolProfile::first();

        return Inertia::render('Teacher/ReportCard/PrintCover', [
            'student' => $student,
            'settings' => $settings,
            'schoolProfile' => $schoolProfile,
            'homeroomTeacher' => $homeroomTeacher,
        ]);
    }
    
    /**
     * Print report card as PDF
     */
    public function print($studentId)
    {
        // This would use a PDF library like DomPDF or Snappy
        // For now, return a simple view that can be printed
        
        $student = Student::with(['user', 'schoolClass'])->findOrFail($studentId);
        
        $settings = ReportCardSetting::first();
        if (!$settings) {
            return redirect()->back()->with('error', 'Pengaturan rapot belum dikonfigurasi');
        }
        
        $semester = $settings->semester;
        $academicYear = $settings->academic_year;
        
        // Get all data (same as generate method)
        $assignments = SubjectTeacherAssignment::with(['subject', 'user'])
            ->where(function($query) use ($student) {
                $query->where('class_id', $student->class_id)
                      ->orWhereNull('class_id');
            })
            ->where('academic_year', $academicYear)
            ->get()
            ->sortBy(function($assignment) {
                return [$assignment->subject->subject_group, $assignment->subject->display_order];
            });
        
        $subjectGrades = $assignments->map(function ($assignment) use ($student, $semester, $academicYear) {
            $grades = Grade::where('student_id', $student->id)
                ->where('subject_teacher_assignment_id', $assignment->id)
                ->where('semester', $semester)
                ->where('academic_year', $academicYear)
                ->get();
            
            $daily = $grades->where('type', 'daily');
            $dailyExam = $grades->where('type', 'daily_exam');
            $midterm = $grades->where('type', 'midterm')->first();
            $final = $grades->where('type', 'final')->first();
            
            $avgDaily = $daily->count() > 0 ? $daily->avg('score') : 0;
            $avgDailyExam = $dailyExam->count() > 0 ? $dailyExam->avg('score') : 0;
            $scoreMidterm = $midterm ? $midterm->score : 0;
            $scoreFinal = $final ? $final->score : 0;
            
            $finalGrade = ($avgDaily * 0.3) + ($avgDailyExam * 0.3) + ($scoreMidterm * 0.2) + ($scoreFinal * 0.2);
            $predicate = $this->getGradePredicate($finalGrade);
            
            return [
                'subject' => $assignment->subject,
                'teacher' => $assignment->user,
                'finalGrade' => round($finalGrade, 2),
                'predicate' => $predicate,
            ];
        })->values();
        
        // Get attendance summary from recap
        $attendanceRecaps = \App\Models\AttendanceRecap::where('student_id', $student->id)
            ->where('semester', $semester)
            ->where('academic_year', $academicYear)
            ->get();
        
        // Calculate total attendance
        $attendanceSummary = [
            'present' => $attendanceRecaps->sum('present'),
            'sick' => $attendanceRecaps->sum('sick'),
            'permission' => $attendanceRecaps->sum('permission'),
            'absent' => $attendanceRecaps->sum('absent'),
        ];
        
        // Get attitude grades
        $attitudeGrades = AttitudeGrade::where('student_id', $student->id)
            ->where('semester', $semester)
            ->where('academic_year', $academicYear)
            ->get()
            ->keyBy('aspect');
        
        // Get homeroom teacher note
        $homeroomNote = HomeroomTeacherNote::where('student_id', $student->id)
            ->where('semester', $semester)
            ->where('academic_year', $academicYear)
            ->first();
        
        // Get homeroom teacher assignment
        $homeroomTeacher = \App\Models\ClassTeacherAssignment::with('user')
            ->where('class_id', $student->class_id)
            ->where('academic_year', $academicYear)
            ->first();
        
        return Inertia::render('Teacher/ReportCard/Print', [
            'student' => $student,
            'settings' => $settings,
            'subjectGrades' => $subjectGrades,
            'attendanceSummary' => $attendanceSummary,
            'attitudeGrades' => $attitudeGrades,
            'homeroomNote' => $homeroomNote,
            'homeroomTeacher' => $homeroomTeacher,
            'semester' => $semester,
            'academicYear' => $academicYear,
        ]);
    }
    
    /**
     * Get grade predicate based on score
     */
    private function getGradePredicate($score)
    {
        if ($score >= 85) return 'A';
        if ($score >= 70) return 'B';
        if ($score >= 60) return 'C';
        if ($score >= 50) return 'D';
        return 'E';
    }
}
