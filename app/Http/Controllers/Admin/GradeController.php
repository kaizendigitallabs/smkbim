<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\SchoolClass;
use App\Models\SubjectTeacherAssignment;
use App\Models\ReportCardSetting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\GradeTemplateExport;
use App\Imports\GradeImport;

class GradeController extends Controller
{
    /**
     * Display list of classes
     */
    public function index()
    {
        $classes = SchoolClass::orderBy('name')->get();
        return Inertia::render('Admin/Grades/Index', [
            'classes' => $classes,
        ]);
    }

    /**
     * Display list of assignments for a specific class
     */
    public function showClass($classId)
    {
        $schoolClass = SchoolClass::findOrFail($classId);
        $settings = ReportCardSetting::first();
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);

        // Get assignments for this class
        $assignments = SubjectTeacherAssignment::with(['subject', 'user'])
            ->where('class_id', $classId)
            ->where('academic_year', $currentAcademicYear)
            ->whereHas('subject')
            ->get();
            
        // Also look for assignments with class_id = null (All Classes) and map them
        $globalAssignments = SubjectTeacherAssignment::with(['subject', 'user'])
            ->whereNull('class_id')
            ->where('academic_year', $currentAcademicYear)
            ->whereHas('subject')
            ->get();
            
        $finalAssignments = $assignments->concat($globalAssignments->map(function ($assignment) use ($schoolClass) {
            $virtual = clone $assignment;
            $virtual->setRelation('schoolClass', $schoolClass);
            return $virtual;
        }));

        return Inertia::render('Admin/Grades/Show', [
            'schoolClass' => $schoolClass,
            'assignments' => $finalAssignments,
            'currentAcademicYear' => $currentAcademicYear,
        ]);
    }

    /**
     * Display grade input form for a specific assignment
     * Reuses the Teacher View but with Admin Context
     */
    public function inputForm(Request $request, $assignmentId)
    {
        $assignment = SubjectTeacherAssignment::with(['subject'])
            ->findOrFail($assignmentId);
        
        // NO USER CHECK REQUIRED FOR ADMIN
        
        // Determine target class
        $targetClassId = $assignment->class_id ?? $request->query('class_id');
        if (!$targetClassId) {
            abort(404, 'Class not specified');
        }

        $schoolClass = SchoolClass::findOrFail($targetClassId);
        $assignment->setRelation('schoolClass', $schoolClass);
        
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        $students = $schoolClass->students()
            ->with('user')
            ->orderBy('nis')
            ->get();
        
        $grades = Grade::where('subject_teacher_assignment_id', $assignmentId)
            ->whereIn('student_id', $students->pluck('id'))
            ->where('semester', $currentSemester)
            ->where('academic_year', $currentAcademicYear)
            ->get()
            ->groupBy('student_id');
        
        return Inertia::render('Teacher/Grades/InputForm', [
            'assignment' => $assignment,
            'students' => $students,
            'grades' => $grades,
            'currentSemester' => $currentSemester,
            'currentAcademicYear' => $currentAcademicYear,
            'gradeRoutePrefix' => 'admin.grades', // Pass prefix for routes
            'backRoute' => route('admin.grades.show', $schoolClass->id),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'subject_teacher_assignment_id' => 'required|exists:subject_teacher_assignments,id',
            'type' => 'required|in:daily,daily_exam,midterm,final',
            'score' => 'required|numeric|min:0|max:100',
            'description' => 'nullable|string|max:255',
            'date' => 'required|date',
            'semester' => 'required|string',
            'academic_year' => 'required|string',
        ]);
        
        // Admin overrides, no user check
        Grade::create($validated);
        
        return redirect()->back()->with('success', 'Nilai berhasil disimpan (Admin)');
    }

    public function update(Request $request, $id)
    {
        $grade = Grade::findOrFail($id);
        
        $validated = $request->validate([
            'score' => 'required|numeric|min:0|max:100',
            'description' => 'nullable|string|max:255',
            'date' => 'required|date',
        ]);
        
        $grade->update($validated);
        return redirect()->back()->with('success', 'Nilai berhasil diperbarui');
    }

    public function destroy($id)
    {
        Grade::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Nilai berhasil dihapus');
    }

    public function recap(Request $request, $assignmentId)
    {
        $assignment = SubjectTeacherAssignment::with(['subject'])->findOrFail($assignmentId);
        
        $targetClassId = $assignment->class_id ?? $request->query('class_id');
        if (!$targetClassId) abort(404);
        $schoolClass = SchoolClass::findOrFail($targetClassId);
        $assignment->setRelation('schoolClass', $schoolClass);
        
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        $students = $schoolClass->students()
            ->with(['user', 'grades' => function ($query) use ($assignmentId, $currentSemester, $currentAcademicYear) {
                $query->where('subject_teacher_assignment_id', $assignmentId)
                    ->where('semester', $currentSemester)
                    ->where('academic_year', $currentAcademicYear);
            }])
            ->orderBy('nis')
            ->get();
        
        $studentsWithRecap = $students->map(function ($student) {
            $grades = $student->grades;
            $daily = $grades->where('type', 'daily');
            $dailyExam = $grades->where('type', 'daily_exam');
            $midterm = $grades->where('type', 'midterm')->first();
            $final = $grades->where('type', 'final')->first();
            
            $avgDaily = $daily->count() > 0 ? $daily->avg('score') : 0;
            $avgDailyExam = $dailyExam->count() > 0 ? $dailyExam->avg('score') : 0;
            $scoreMidterm = $midterm ? $midterm->score : 0;
            $scoreFinal = $final ? $final->score : 0;
            
            // 30/30/15/25
            $finalGrade = ($avgDaily * 0.3) + ($avgDailyExam * 0.3) + ($scoreMidterm * 0.15) + ($scoreFinal * 0.25);
            
            return [
                'student' => $student,
                'avgDaily' => round($avgDaily, 2),
                'avgDailyExam' => round($avgDailyExam, 2),
                'scoreMidterm' => round($scoreMidterm, 2),
                'scoreFinal' => round($scoreFinal, 2),
                'finalGrade' => round($finalGrade, 2),
                'dailyCount' => $daily->count(),
                'dailyExamCount' => $dailyExam->count(),
            ];
        });
        
        return Inertia::render('Teacher/Grades/Recap', [
            'assignment' => $assignment,
            'students' => $studentsWithRecap,
            'currentSemester' => $currentSemester,
            'currentAcademicYear' => $currentAcademicYear,
            'gradeRoutePrefix' => 'admin.grades',
            'backRoute' => route('admin.grades.input', ['assignmentId' => $assignment->id, 'class_id' => $schoolClass->id]),
        ]);
    }

    public function template(Request $request, $assignmentId)
    {
        $assignment = SubjectTeacherAssignment::findOrFail($assignmentId);
        $targetClassId = $assignment->class_id ?? $request->query('class_id');
        if (!$targetClassId) abort(404);
        
        $schoolClass = SchoolClass::findOrFail($targetClassId);
        $students = $schoolClass->students()->with('user')->orderBy('nis')->get();

        return Excel::download(new GradeTemplateExport($students), 'template_nilai_' . $schoolClass->name . '.xlsx');
    }

    public function import(Request $request, $assignmentId)
    {
        $request->validate(['file' => 'required|mimes:xlsx,xls']);
        $settings = ReportCardSetting::first();
        $semester = $settings->semester ?? 'Ganjil';
        $academicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);

        try {
            // Import works same for admin
            Excel::import(new GradeImport($assignmentId, $semester, $academicYear), $request->file('file'));
            return redirect()->back()->with('success', 'Nilai berhasil diimpor');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['file' => 'Gagal impor: ' . $e->getMessage()]);
        }
    }
}
