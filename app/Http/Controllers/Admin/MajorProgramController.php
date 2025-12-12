<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Major;
use App\Models\MajorProgram;
use Illuminate\Http\Request;

class MajorProgramController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $programs = MajorProgram::with('major')
            ->orderBy('major_id')
            ->orderBy('order')
            ->get();
            
        return inertia('Admin/MajorPrograms/Index', [
            'programs' => $programs,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $majors = Major::orderBy('name')->get();
        
        return inertia('Admin/MajorPrograms/Form', [
            'majors' => $majors,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'major_id' => 'required|exists:majors,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order' => 'required|integer|min:0',
        ]);

        MajorProgram::create($validated);

        return redirect()->route('admin.major-programs.index')
            ->with('success', 'Program keahlian berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(MajorProgram $majorProgram)
    {
        $majors = Major::orderBy('name')->get();

        return inertia('Admin/MajorPrograms/Form', [
            'program' => $majorProgram,
            'majors' => $majors,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MajorProgram $majorProgram)
    {
        $validated = $request->validate([
            'major_id' => 'required|exists:majors,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'order' => 'required|integer|min:0',
        ]);

        $majorProgram->update($validated);

        return redirect()->route('admin.major-programs.index')
            ->with('success', 'Program keahlian berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(MajorProgram $majorProgram)
    {
        $majorProgram->delete();

        return redirect()->route('admin.major-programs.index')
            ->with('success', 'Program keahlian berhasil dihapus.');
    }
}
