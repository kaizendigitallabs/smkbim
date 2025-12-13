<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\SubjectTeacherAssignment;
use App\Models\ReportCardSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GradeController extends Controller
{
    /**
     * Display list of subjects taught by the logged-in teacher
     */
    public function mySubjects()
    {
        $user = Auth::user();
        
        // Get current active semester & academic year from settings
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        // Get teacher's subject assignments
        $assignments = SubjectTeacherAssignment::with(['subject', 'schoolClass'])
            ->where('user_id', $user->id)
            ->where('academic_year', $currentAcademicYear)
            ->whereHas('subject')
            ->get();
        
        $finalAssignments = collect();
        $allClasses = \App\Models\SchoolClass::all();

        foreach ($assignments as $assignment) {
            if ($assignment->class_id) {
                // Normal assignment with specific class
                if ($assignment->schoolClass) {
                   $finalAssignments->push($assignment);
                }
            } else {
                // "All Classes" assignment - expand to all classes
                foreach ($allClasses as $class) {
                    $virtual = clone $assignment;
                    // We keep the original assignment ID, but inject the specific class relationship
                    // so the frontend sees it as a specific class assignment
                    $virtual->setRelation('schoolClass', $class); 
                    $finalAssignments->push($virtual);
                }
            }
        }
        
        return Inertia::render('Teacher/Grades/MySubjects', [
            'assignments' => $finalAssignments,
            'currentSemester' => $currentSemester,
            'currentAcademicYear' => $currentAcademicYear,
        ]);
    }

    /**
     * Display grade input form for a specific assignment
     */
    public function inputForm(Request $request, $assignmentId)
    {
        $assignment = SubjectTeacherAssignment::with(['subject'])
            ->findOrFail($assignmentId);
        
        // Verify this assignment belongs to the logged-in teacher
        if ($assignment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
        
        // Determine target class: either strict from assignment or dynamic from query
        $targetClassId = $assignment->class_id ?? $request->query('class_id');
        if (!$targetClassId) {
            abort(404, 'Class not specified');
        }

        $schoolClass = \App\Models\SchoolClass::findOrFail($targetClassId);
        // Inject the specific class into the assignment object so frontend sees it as mapped
        $assignment->setRelation('schoolClass', $schoolClass);
        
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        // Get students from the target class
        $students = $schoolClass->students()
            ->with('user')
            ->orderBy('nis')
            ->get();
        
        // Get existing grades for this assignment and semester, filtered by students in this class
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
        ]);
    }

    /**
     * Store a new grade
     */
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
        
        // Verify the assignment belongs to the logged-in teacher
        $assignment = SubjectTeacherAssignment::findOrFail($validated['subject_teacher_assignment_id']);
        if ($assignment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
        
        Grade::create($validated);
        
        return redirect()->back()->with('success', 'Nilai berhasil disimpan');
    }

    /**
     * Update an existing grade
     */
    public function update(Request $request, $id)
    {
        $grade = Grade::findOrFail($id);
        
        // Verify the grade belongs to the logged-in teacher's assignment
        if ($grade->assignment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'score' => 'required|numeric|min:0|max:100',
            'description' => 'nullable|string|max:255',
            'date' => 'required|date',
        ]);
        
        $grade->update($validated);
        
        return redirect()->back()->with('success', 'Nilai berhasil diperbarui');
    }

    /**
     * Delete a grade
     */
    public function destroy($id)
    {
        $grade = Grade::findOrFail($id);
        
        // Verify the grade belongs to the logged-in teacher's assignment
        if ($grade->assignment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }
        
        $grade->delete();
        
        return redirect()->back()->with('success', 'Nilai berhasil dihapus');
    }

    /**
     * Display grade recap for an assignment
     */
    public function recap(Request $request, $assignmentId)
    {
        $assignment = SubjectTeacherAssignment::with(['subject'])
            ->findOrFail($assignmentId);
        
        // Verify this assignment belongs to the logged-in teacher
        if ($assignment->user_id !== Auth::id()) {
            abort(403, 'Unauthorized');
        }

        $targetClassId = $assignment->class_id ?? $request->query('class_id');
        if (!$targetClassId) {
            abort(404, 'Class not specified');
        }
        $schoolClass = \App\Models\SchoolClass::findOrFail($targetClassId);
        $assignment->setRelation('schoolClass', $schoolClass);
        
        $settings = ReportCardSetting::first();
        $currentSemester = $settings->semester ?? 'Ganjil';
        $currentAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);
        
        // Get students with their grades
        $students = $schoolClass->students()
            ->with(['user', 'grades' => function ($query) use ($assignmentId, $currentSemester, $currentAcademicYear) {
                $query->where('subject_teacher_assignment_id', $assignmentId)
                    ->where('semester', $currentSemester)
                    ->where('academic_year', $currentAcademicYear);
            }])
            ->orderBy('nis')
            ->get();
        
        // Calculate final grades for each student
        $studentsWithRecap = $students->map(function ($student) {
            $grades = $student->grades;
            
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
            
            // Calculate final grade: (30% daily + 30% daily_exam + 20% midterm + 20% final)
            $finalGrade = ($avgDaily * 0.3) + ($avgDailyExam * 0.3) + ($scoreMidterm * 0.2) + ($scoreFinal * 0.2);
            
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
        ]);
    }
}
