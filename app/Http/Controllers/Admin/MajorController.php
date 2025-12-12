<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Major;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class MajorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $majors = Major::orderBy('name')->get();
        return inertia('Admin/Majors/Index', [
            'majors' => $majors,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Admin/Majors/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'profile_content' => 'nullable|string',
            'curriculum_content' => 'nullable|string',
            'facilities_content' => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['name']);

        if (Major::where('slug', $validated['slug'])->exists()) {
            $validated['slug'] = $validated['slug'] . '-' . time();
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('majors', 'public');
        }

        Major::create($validated);

        return redirect()->route('admin.majors.index')
            ->with('success', 'Jurusan berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Major $major)
    {
        return inertia('Admin/Majors/Edit', [
            'major' => $major,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Major $major)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
            'profile_content' => 'nullable|string',
            'curriculum_content' => 'nullable|string',
            'facilities_content' => 'nullable|string',
        ]);

        if ($request->name !== $major->name) {
            $validated['slug'] = Str::slug($validated['name']);
            if (Major::where('slug', $validated['slug'])->where('id', '!=', $major->id)->exists()) {
                $validated['slug'] = $validated['slug'] . '-' . time();
            }
        }

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('majors', 'public');
        }

        $major->update($validated);

        return redirect()->route('admin.majors.index')
            ->with('success', 'Jurusan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Major $major)
    {
        $major->delete();

        return redirect()->route('admin.majors.index')
            ->with('success', 'Jurusan berhasil dihapus.');
    }
}
