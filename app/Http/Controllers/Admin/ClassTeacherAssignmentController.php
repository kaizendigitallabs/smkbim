<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\ClassTeacherAssignment;
use App\Models\User;
use App\Models\SchoolClass;

use Inertia\Inertia;

class ClassTeacherAssignmentController extends Controller
{
    // Render Inertia Page
    public function page()
    {
        if (!auth()->user()->can('manage_class_assignments')) {
             abort(403);
        }

        // Get active academic year from settings
        $settings = \App\Models\ReportCardSetting::first();
        $activeAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);

        $assignments = ClassTeacherAssignment::with(['user', 'schoolClass'])->get();
        // Get users who have 'guru' role (candidates for wali kelas)
        $users = User::role('guru')->get(['id', 'name']);
        $classes = SchoolClass::all(['id', 'name']);

        return Inertia::render('Admin/Assignments/ClassTeacher/Index', [
            'assignments' => $assignments,
            'users' => $users,
            'classes' => $classes,
            'activeAcademicYear' => $activeAcademicYear,
        ]);
    }

    public function index()
    {
        if (!auth()->user()->can('manage_class_assignments')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignments = ClassTeacherAssignment::with(['user', 'schoolClass'])->get();
        return response()->json($assignments);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->can('manage_class_assignments')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'class_id' => 'required|exists:classes,id',
            'academic_year' => 'required|string',
        ]);

        // Constraint check: one user can manage only one class per year? (Maybe allow multi, but likely 1:1 for wali kelas)
        // Spec says: Role wali_kelas harus punya minimal satu assignment.
        // It doesn't restrict to one. But usually wali kelas is 1 class.
        // Unique constraint in DB is `['user_id', 'class_id', 'academic_year']`.
        
        // Also check if user has wali_kelas role?
        $user = User::findOrFail($request->user_id);
        // Validasi user harus guru
        if (!$user->hasRole('guru')) {
             return redirect()->back()->with('error', 'User must have guru role');
        }

        // Auto assign wali_kelas role if not present
        if (!$user->hasRole('wali_kelas')) {
            $user->assignRole('wali_kelas');
        }

        // Check if class already has a wali kelas for this year?
        $existing = ClassTeacherAssignment::where('class_id', $request->class_id)
            ->where('academic_year', $request->academic_year)
            ->first();
            
        if ($existing) {
             return redirect()->back()->with('error', 'Class already has a homeroom teacher for this academic year');
        }

        $assignment = ClassTeacherAssignment::create($request->all());
        
        // Also update homeroom_teacher_id in classes table for convenience/redundancy?
        // Let's keep it strictly in assignment table as per Spec 4.3 which lists Assignment tables as the method.
        // However, migration for classes included `homeroom_teacher_id`. I should probably sync it.
        $schoolClass = SchoolClass::findOrFail($request->class_id);
        $schoolClass->homeroom_teacher_id = $request->user_id;
        $schoolClass->save();

        return redirect()->back()->with('success', 'Wali Kelas assigned successfully');
    }

    public function destroy($id)
    {
        if (!auth()->user()->can('manage_class_assignments')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignment = ClassTeacherAssignment::findOrFail($id);
        
        // Unsync class homeroom_teacher_id
        $schoolClass = SchoolClass::findOrFail($assignment->class_id);
        if ($schoolClass->homeroom_teacher_id == $assignment->user_id) {
            $schoolClass->homeroom_teacher_id = null;
            $schoolClass->save();
        }

        $assignment->delete();

        return redirect()->back()->with('success', 'Assignment deleted successfully');
    }
}
