<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use App\Models\User;
use App\Imports\TeachersImport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class TeacherController extends Controller
{
    /**
     * Display a listing of teachers.
     */
    public function index()
    {
        $teachers = Teacher::orderBy('order')->orderBy('name')->get();
        
        return inertia('Admin/Teachers/Index', [
            'teachers' => $teachers,
        ]);
    }

    /**
     * Show the form for creating a new teacher.
     */
    public function create()
    {
        return inertia('Admin/Teachers/Create');
    }

    /**
     * Store a newly created teacher in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
            'position' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'contact' => 'nullable|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
            'nip' => 'nullable|string|unique:teachers,nip',
            'nuptk' => 'nullable|string|unique:teachers,nuptk',
            'gender' => 'nullable|in:L,P',
            'place_of_birth' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string',
            'last_education' => 'nullable|string',
            'education_major' => 'nullable|string',
            'university' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, &$validated) {
            // Create User
            $user = User::create([
                'name' => $validated['name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
            ]);
            $user->assignRole('guru');

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $validated['photo'] = $request->file('photo')->store('teachers', 'public');
            }

            $validated['user_id'] = $user->id;

            Teacher::create($validated);
        });

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru dan akun pengguna berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified teacher.
     */
    public function edit(Teacher $teacher)
    {
        $teacher->load('user');
        return inertia('Admin/Teachers/Edit', [
            'teacher' => $teacher,
        ]);
    }

    /**
     * Update the specified teacher in storage.
     */
    public function update(Request $request, Teacher $teacher)
    {
        $userId = $teacher->user_id;

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . ($userId ?? 'NULL'),
            'password' => 'nullable|string|min:8',
            'position' => 'nullable|string|max:255',
            'subject' => 'nullable|string|max:255',
            'contact' => 'nullable|string|max:255',
            'photo' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
            'order' => 'integer|min:0',
            'nip' => 'nullable|string|unique:teachers,nip,' . $teacher->id,
            'nuptk' => 'nullable|string|unique:teachers,nuptk,' . $teacher->id,
            'gender' => 'nullable|in:L,P',
            'place_of_birth' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'address' => 'nullable|string',
            'last_education' => 'nullable|string',
            'education_major' => 'nullable|string',
            'university' => 'nullable|string',
        ];

        /* if user exists, email is required unique to user. if no user, check unique global? */
        /* assuming linked user */
        
        $validated = $request->validate($rules);

        DB::transaction(function () use ($request, $teacher, $validated) {
            // Update User if exists
            if ($teacher->user) {
                $userData = [
                    'name' => $validated['name'],
                    'email' => $validated['email'],
                ];
                if (!empty($validated['password'])) {
                    $userData['password'] = Hash::make($validated['password']);
                }
                $teacher->user->update($userData);
            } else {
                 // Option: Create user if missing? For now, skip to avoid complexity unless requested.
                 // But validation checked email... 
            }

            // Handle photo upload
            if ($request->hasFile('photo')) {
                $validated['photo'] = $request->file('photo')->store('teachers', 'public');
            }

            $teacher->update($validated);
        });

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru berhasil diperbarui.');
    }

    /**
     * Remove the specified teacher from storage.
     */
    public function destroy(Teacher $teacher)
    {
        DB::transaction(function () use ($teacher) {
            if ($teacher->user) {
                $teacher->user->delete();
            }
            $teacher->delete();
        });

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru dan akun pengguna berhasil dihapus.');
    }

    /**
     * Import teachers from Excel file.
     */
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls',
        ]);

        Excel::import(new TeachersImport, $request->file('file'));

        return redirect()->route('admin.teachers.index')
            ->with('success', 'Data guru berhasil diimport.');
    }
}
