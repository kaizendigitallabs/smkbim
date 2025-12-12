<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SchoolClass;

use Inertia\Inertia;

class ClassController extends Controller
{
    // Render Inertia Page
    public function page()
    {
        if (!auth()->user()->can('manage_classes')) {
            abort(403);
        }
        
        $classes = SchoolClass::with('homeroomTeacher')->get();
        return Inertia::render('Admin/Classes/Index', [
            'classes' => $classes
        ]);
    }

    public function index()
    {
        // Permission check
        if (!auth()->user()->can('manage_classes')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $classes = SchoolClass::with('homeroomTeacher')->get();
        return response()->json($classes);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->can('manage_classes')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|string|max:10',
            'academic_year' => 'required|string|max:20',
            'homeroom_teacher_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
        ]);

        $class = SchoolClass::create($request->all());

        return response()->json($class, 201);
    }

    public function update(Request $request, $id)
    {
        if (!auth()->user()->can('manage_classes')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $class = SchoolClass::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'level' => 'required|string|max:10',
            'academic_year' => 'required|string|max:20',
            'homeroom_teacher_id' => 'nullable|exists:users,id',
            'description' => 'nullable|string',
        ]);

        $class->update($request->all());

        return response()->json($class);
    }

    public function destroy($id)
    {
        if (!auth()->user()->can('manage_classes')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $class = SchoolClass::findOrFail($id);
        $class->delete();

        return response()->json(['message' => 'Class deleted successfully']);
    }
}
