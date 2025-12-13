<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubjectTeacherAssignment;
use App\Models\User;

use Inertia\Inertia;
use App\Models\Subject;
use App\Models\SchoolClass;

class SubjectTeacherAssignmentController extends Controller
{
    // Render Inertia Page
    public function page()
    {
        if (!auth()->user()->can('manage_subject_assignments')) {
             abort(403);
        }

        // Get active academic year from settings
        $settings = \App\Models\ReportCardSetting::first();
        $activeAcademicYear = $settings->academic_year ?? date('Y') . '/' . (date('Y') + 1);

        $assignments = SubjectTeacherAssignment::with(['user', 'subject', 'schoolClass'])->get();
        // Get users who have 'guru' role (candidates for guru mapel)
        $users = User::role('guru')->get(['id', 'name']);
        $subjects = Subject::all(['id', 'name']);
        $classes = SchoolClass::all(['id', 'name']);

        return Inertia::render('Admin/Assignments/SubjectTeacher/Index', [
            'assignments' => $assignments,
            'users' => $users,
            'subjects' => $subjects,
            'classes' => $classes,
            'activeAcademicYear' => $activeAcademicYear,
        ]);
    }

    public function index()
    {
        if (!auth()->user()->can('manage_subject_assignments')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignments = SubjectTeacherAssignment::with(['user', 'subject', 'schoolClass'])->get();
        return response()->json($assignments);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->can('manage_subject_assignments')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'subject_id' => 'required|exists:subjects,id',
            'class_id' => 'nullable|exists:classes,id',
            'academic_year' => 'required|string',
        ]);

        $user = User::findOrFail($request->user_id);
        if (!$user->hasRole('guru')) {
             return redirect()->back()->with('error', 'User must have guru role');
        }

        if (!$user->hasRole('guru_mapel')) {
            $user->assignRole('guru_mapel');
        }

        $assignment = SubjectTeacherAssignment::create($request->all());

        return redirect()->back()->with('success', 'Assignment created successfully');
    }

    public function destroy($id)
    {
        if (!auth()->user()->can('manage_subject_assignments')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignment = SubjectTeacherAssignment::findOrFail($id);
        $assignment->delete();

        return redirect()->back()->with('success', 'Assignment deleted successfully');
    }
}
