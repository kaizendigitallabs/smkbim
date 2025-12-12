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
        if (!auth()->user()->hasRole('super_admin')) {
             abort(403);
        }

        $assignments = SubjectTeacherAssignment::with(['user', 'subject', 'schoolClass'])->get();
        // Get users who have 'guru_mapel' role
        $users = User::role('guru_mapel')->get(['id', 'name']);
        $subjects = Subject::all(['id', 'name']);
        $classes = SchoolClass::all(['id', 'name']);

        return Inertia::render('Admin/Assignments/SubjectTeacher/Index', [
            'assignments' => $assignments,
            'users' => $users,
            'subjects' => $subjects,
            'classes' => $classes,
        ]);
    }

    public function index()
    {
        if (!auth()->user()->hasRole('super_admin')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignments = SubjectTeacherAssignment::with(['user', 'subject', 'schoolClass'])->get();
        return response()->json($assignments);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->hasRole('super_admin')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'subject_id' => 'required|exists:subjects,id',
            'class_id' => 'nullable|exists:classes,id',
            'academic_year' => 'required|string',
        ]);

        $user = User::findOrFail($request->user_id);
        if (!$user->hasRole('guru_mapel')) {
             return response()->json(['message' => 'User must have guru_mapel role before assignment'], 422);
        }

        $assignment = SubjectTeacherAssignment::create($request->all());

        return response()->json($assignment, 201);
    }

    public function destroy($id)
    {
        if (!auth()->user()->hasRole('super_admin')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $assignment = SubjectTeacherAssignment::findOrFail($id);
        $assignment->delete();

        return response()->json(['message' => 'Assignment deleted successfully']);
    }
}
