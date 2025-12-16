<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = \App\Models\StudentProject::with('major')->latest()->get();
        return Inertia::render('Admin/StudentProjects/Index', [
            'projects' => $projects
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $majors = \App\Models\Major::all();
        $students = \App\Models\Student::join('users', 'students.user_id', '=', 'users.id')
            ->select('students.id', 'users.name')
            ->orderBy('users.name')
            ->get();
        return Inertia::render('Admin/StudentProjects/Form', [
            'majors' => $majors,
            'students' => $students
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'major_id' => 'required|exists:majors,id',
            'student_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048'
        ]);

        // Generate slug from title
        $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('student-projects', 'public');
        }

        \App\Models\StudentProject::create($validated);

        return redirect()->route('admin.student-projects.index')
            ->with('success', 'Project siswa berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(\App\Models\StudentProject $studentProject)
    {
        $majors = \App\Models\Major::all();
        $students = \App\Models\Student::join('users', 'students.user_id', '=', 'users.id')
            ->select('students.id', 'users.name')
            ->orderBy('users.name')
            ->get();
        return Inertia::render('Admin/StudentProjects/Form', [
            'project' => $studentProject,
            'majors' => $majors,
            'students' => $students
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, \App\Models\StudentProject $studentProject)
    {
        $validated = $request->validate([
            'major_id' => 'required|exists:majors,id',
            'student_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048'
        ]);

        // Generate slug from title if title changed
        if ($validated['title'] !== $studentProject->title) {
            $validated['slug'] = \Illuminate\Support\Str::slug($validated['title']);
        }

        if ($request->hasFile('image')) {
            if ($studentProject->image) {
                \Illuminate\Support\Facades\Storage::disk('public')->delete($studentProject->image);
            }
            $validated['image'] = $request->file('image')->store('student-projects', 'public');
        }

        $studentProject->update($validated);

        return redirect()->route('admin.student-projects.index')
            ->with('success', 'Project siswa berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(\App\Models\StudentProject $studentProject)
    {
        if ($studentProject->image) {
            \Illuminate\Support\Facades\Storage::disk('public')->delete($studentProject->image);
        }
        
        $studentProject->delete();

        return redirect()->back()
            ->with('success', 'Project siswa berhasil dihapus');
    }
}
