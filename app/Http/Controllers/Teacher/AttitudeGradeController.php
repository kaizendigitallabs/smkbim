<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AttitudeGrade;
use App\Models\ClassTeacherAssignment;
use App\Models\HomeroomTeacherNote;
use App\Models\ReportCardSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AttitudeGradeController extends Controller
{
    /**
     * Display attitude grade input page for wali kelas
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
            return Inertia::render('Teacher/AttitudeGrades/MyClass', [
                'assignment' => null,
                'students' => [],
                'attitudeGrades' => [],
                'homeroomNotes' => [],
                'currentSemester' => $currentSemester,
                'currentAcademicYear' => $currentAcademicYear,
            ]);
        }
        
        // Get students
        $students = $assignment->schoolClass->students()
            ->with('user')
            ->orderBy('nis')
            ->get();
        
        // Get existing attitude grades for this semester
        $attitudeGrades = AttitudeGrade::where('class_id', $assignment->class_id)
            ->where('semester', $currentSemester)
            ->where('academic_year', $currentAcademicYear)
            ->get()
            ->groupBy('student_id');
        
        // Get homeroom teacher notes
        $homeroomNotes = HomeroomTeacherNote::whereIn('student_id', $students->pluck('id'))
            ->where('semester', $currentSemester)
            ->where('academic_year', $currentAcademicYear)
            ->get()
            ->keyBy('student_id');
        
        return Inertia::render('Teacher/AttitudeGrades/MyClass', [
            'assignment' => $assignment,
            'students' => $students,
            'attitudeGrades' => $attitudeGrades,
            'homeroomNotes' => $homeroomNotes,
            'currentSemester' => $currentSemester,
            'currentAcademicYear' => $currentAcademicYear,
        ]);
    }

    /**
     * Store or update attitude grade
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'class_id' => 'required|exists:classes,id',
            'aspect' => 'required|in:spiritual,social',
            'grade' => 'required|in:A,B,C,D',
            'description' => 'nullable|string',
            'semester' => 'required|string',
            'academic_year' => 'required|string',
        ]);
        
        // Verify the class belongs to the logged-in teacher
        $assignment = ClassTeacherAssignment::where('user_id', Auth::id())
            ->where('class_id', $validated['class_id'])
            ->first();
        
        if (!$assignment) {
            abort(403, 'Unauthorized');
        }
        
        // Check if attitude grade already exists
        $attitudeGrade = AttitudeGrade::where('student_id', $validated['student_id'])
            ->where('aspect', $validated['aspect'])
            ->where('semester', $validated['semester'])
            ->where('academic_year', $validated['academic_year'])
            ->first();
        
        if ($attitudeGrade) {
            // Update existing
            $attitudeGrade->update([
                'grade' => $validated['grade'],
                'description' => $validated['description'],
                'teacher_id' => Auth::id(),
            ]);
        } else {
            // Create new
            AttitudeGrade::create([
                ...$validated,
                'teacher_id' => Auth::id(),
            ]);
        }
        
        return redirect()->back()->with('success', 'Nilai sikap berhasil disimpan');
    }

    /**
     * Update an existing attitude grade
     */
    public function update(Request $request, $id)
    {
        $attitudeGrade = AttitudeGrade::findOrFail($id);
        
        // Verify the grade belongs to the logged-in teacher's class
        $assignment = ClassTeacherAssignment::where('user_id', Auth::id())
            ->where('class_id', $attitudeGrade->class_id)
            ->first();
        
        if (!$assignment) {
            abort(403, 'Unauthorized');
        }
        
        $validated = $request->validate([
            'grade' => 'required|in:A,B,C,D',
            'description' => 'nullable|string',
        ]);
        
        $attitudeGrade->update([
            ...$validated,
            'teacher_id' => Auth::id(),
        ]);
        
        return redirect()->back()->with('success', 'Nilai sikap berhasil diperbarui');
    }

    /**
     * Store or update homeroom teacher note
     */
    public function storeNote(Request $request)
    {
        $validated = $request->validate([
            'student_id' => 'required|exists:students,id',
            'notes' => 'required|string',
            'semester' => 'required|string',
            'academic_year' => 'required|string',
        ]);

        // Verify the student belongs to the logged-in teacher's class
        $assignment = ClassTeacherAssignment::where('user_id', Auth::id())
            ->whereHas('schoolClass.students', function ($query) use ($validated) {
                $query->where('id', $validated['student_id']);
            })
            ->first();

        if (!$assignment) {
            abort(403, 'Unauthorized');
        }

        // Check if note already exists
        $note = HomeroomTeacherNote::where('student_id', $validated['student_id'])
            ->where('semester', $validated['semester'])
            ->where('academic_year', $validated['academic_year'])
            ->first();

        if ($note) {
            // Update existing
            $note->update([
                'notes' => $validated['notes'],
                'teacher_id' => Auth::id(),
            ]);
        } else {
            // Create new
            HomeroomTeacherNote::create([
                ...$validated,
                'teacher_id' => Auth::id(),
            ]);
        }

        return redirect()->back()->with('success', 'Catatan wali kelas berhasil disimpan');
    }
}
