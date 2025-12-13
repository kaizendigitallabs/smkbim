<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Student;
use App\Models\User;
use App\Models\SchoolClass;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\StudentsImport;
use App\Exports\StudentsExport;

class StudentController extends Controller
{
    public function index()
    {
        $students = Student::with(['user', 'schoolClass'])->orderBy('nis', 'asc')->paginate(10);
        
        return Inertia::render('Admin/Students/Index', [
            'students' => $students
        ]);
    }

    public function create()
    {
        $classes = SchoolClass::all(['id', 'name']);
        return Inertia::render('Admin/Students/Create', [
            'classes' => $classes
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'nis' => 'required|string|unique:students,nis',
            'nisn' => 'nullable|string|unique:students,nisn',
            'class_id' => 'nullable|exists:classes,id',
            'place_of_birth' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:L,P',
            'address' => 'nullable|string',
            'parent_phone' => 'nullable|string',
            'password' => 'nullable|string|min:8',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password'] ?? $validated['nis']), // Default password is NIS if not provided
        ]);
        
        $user->assignRole('siswa');

        Student::create([
            'user_id' => $user->id,
            'nis' => $validated['nis'],
            'nisn' => $validated['nisn'],
            'class_id' => $validated['class_id'],
            'place_of_birth' => $validated['place_of_birth'],
            'date_of_birth' => $validated['date_of_birth'],
            'gender' => $validated['gender'],
            'address' => $validated['address'],
            'parent_phone' => $validated['parent_phone'],
        ]);

        return redirect()->route('admin.students.index')->with('success', 'Student created successfully');
    }

    public function edit($id)
    {
        $student = Student::with('user')->findOrFail($id);
        $classes = SchoolClass::all(['id', 'name']);
        
        return Inertia::render('Admin/Students/Edit', [
            'student' => $student,
            'classes' => $classes
        ]);
    }

    public function update(Request $request, $id)
    {
        $student = Student::findOrFail($id);
        $user = $student->user;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'nis' => 'required|string|unique:students,nis,' . $student->id,
            'nisn' => 'nullable|string|unique:students,nisn,' . $student->id,
            'class_id' => 'nullable|exists:classes,id',
            'place_of_birth' => 'nullable|string',
            'date_of_birth' => 'nullable|date',
            'gender' => 'required|in:L,P',
            'address' => 'nullable|string',
            'parent_phone' => 'nullable|string',
            'password' => 'nullable|string|min:8',
        ]);

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if (!empty($validated['password'])) {
            $user->update([
                'password' => Hash::make($validated['password']),
            ]);
        }

        $student->update([
            'nis' => $validated['nis'],
            'nisn' => $validated['nisn'],
            'class_id' => $validated['class_id'],
            'place_of_birth' => $validated['place_of_birth'],
            'date_of_birth' => $validated['date_of_birth'],
            'gender' => $validated['gender'],
            'address' => $validated['address'],
            'parent_phone' => $validated['parent_phone'],
        ]);

        return redirect()->route('admin.students.index')->with('success', 'Student updated successfully');
    }

    public function destroy($id)
    {
        $student = Student::findOrFail($id);
        $user = $student->user;
        
        // Delete student first (though cascade handles it, explicit is safer sometimes)
        $student->delete();
        $user->delete();

        return redirect()->back()->with('success', 'Student deleted successfully');
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        Excel::import(new StudentsImport, $request->file('file'));

        return redirect()->back()->with('success', 'Students imported successfully');
    }

    public function export()
    {
        return Excel::download(new StudentsExport, 'students.xlsx');
    }

    public function template()
    {
        // Generate a template using the Export class but with empty data or just headings?
        // Or create a blank collection.
        // Actually, let's just create a dummy row for example.
        // BUT user asked for "template".
        // I can use `Excel::store` to generate it temporarily or verify implementation.
        // Actually, I can just use a customized Export class for Template.
        // Let's create a dynamic template via Array.
        
        $headings = [
            ['nama', 'email', 'nis', 'nisn', 'kelas', 'tempat_lahir', 'tanggal_lahir', 'jenis_kelamin', 'alamat', 'no_hp_ortu'],
            ['Contoh Nama', 'contoh@email.com', '12345', '0012345', 'X RPL 1', 'Jakarta', '2005-01-01', 'L', 'Jl. Contoh No. 1', '08123456789']
        ];

        return Excel::download(new class($headings) implements \Maatwebsite\Excel\Concerns\FromArray {
            protected $headings;
            public function __construct($headings) { $this->headings = $headings; }
            public function array(): array { return $this->headings; }
        }, 'template_siswa.xlsx');
    }
}
