<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SchoolProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programs = \App\Models\SchoolProgram::orderBy('order')->get();
        return \Inertia\Inertia::render('Admin/SchoolPrograms/Index', [
            'programs' => $programs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return \Inertia\Inertia::render('Admin/SchoolPrograms/Form');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(\Illuminate\Http\Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'order' => 'integer'
        ]);

        \App\Models\SchoolProgram::create($validated);

        return redirect()->route('admin.school-programs.index')
            ->with('success', 'Program unggulan berhasil ditambahkan');
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
    public function edit(\App\Models\SchoolProgram $schoolProgram)
    {
        return \Inertia\Inertia::render('Admin/SchoolPrograms/Form', [
            'program' => $schoolProgram
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(\Illuminate\Http\Request $request, \App\Models\SchoolProgram $schoolProgram)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|string',
            'order' => 'integer'
        ]);

        $schoolProgram->update($validated);

        return redirect()->route('admin.school-programs.index')
            ->with('success', 'Program unggulan berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(\App\Models\SchoolProgram $schoolProgram)
    {
        $schoolProgram->delete();

        return redirect()->back()
            ->with('success', 'Program unggulan berhasil dihapus');
    }
}
