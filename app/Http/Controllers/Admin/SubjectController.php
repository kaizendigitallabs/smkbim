<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subject;

use Inertia\Inertia;

class SubjectController extends Controller
{
    // Render Inertia Page
    public function page()
    {
        if (!auth()->user()->can('manage_subjects')) {
            abort(403);
        }

        $subjects = Subject::all();
        return Inertia::render('Admin/Subjects/Index', [
            'subjects' => $subjects
        ]);
    }

    public function index()
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subjects = Subject::all();
        return response()->json($subjects);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:subjects,code',
            'description' => 'nullable|string',
        ]);

        $subject = Subject::create($request->all());

        return response()->json($subject, 201);
    }

    public function update(Request $request, $id)
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subject = Subject::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:subjects,code,' . $id,
            'description' => 'nullable|string',
        ]);

        $subject->update($request->all());

        return response()->json($subject);
    }

    public function destroy($id)
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subject = Subject::findOrFail($id);
        $subject->delete();

        return response()->json(['message' => 'Subject deleted successfully']);
    }
}
