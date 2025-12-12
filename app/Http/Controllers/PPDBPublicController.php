<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Models\PPDBRegistration;
use App\Models\PPDBSetting;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PPDBPublicController extends Controller
{
    public function index()
    {
        $schoolProfile = SchoolProfile::first();
        $settings = PPDBSetting::pluck('value', 'key')->all();
        $majors = Major::orderBy('name')->select('name')->get();
        
        $isOpen = filter_var($settings['is_open'] ?? false, FILTER_VALIDATE_BOOLEAN);
        
        return inertia('PPDB/Register', [
            'schoolProfile' => $schoolProfile,
            'settings' => $settings,
            'majors' => $majors,
            'isOpen' => $isOpen,
        ]);
    }

    public function store(Request $request)
    {
        // Check if PPDB is open
        $settings = PPDBSetting::pluck('value', 'key')->all();
        $isOpen = filter_var($settings['is_open'] ?? false, FILTER_VALIDATE_BOOLEAN);
        
        if (!$isOpen) {
            return back()->withErrors(['message' => 'Pendaftaran PPDB sedang ditutup.']);
        }

        $validated = $request->validate([
            'nik' => 'required|string|size:16|unique:ppdb_registrations,nik',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'origin_school' => 'required|string|max:255',
            'graduation_year' => 'required|integer|digits:4',
            'major_choice_1' => 'required|string|exists:majors,name',
            'major_choice_2' => 'nullable|string|exists:majors,name|different:major_choice_1',
            'address' => 'required|string',
            'parent_name' => 'required|string|max:255',
            'parent_phone' => 'required|string|max:20',
        ]);

        // Generate registration number (REG-YYYY-XXXX)
        $year = date('Y');
        $count = PPDBRegistration::whereYear('created_at', $year)->count() + 1;
        $registrationNumber = 'REG-' . $year . '-' . str_pad($count, 4, '0', STR_PAD_LEFT);
        
        $registration = PPDBRegistration::create([
            'registration_number' => $registrationNumber,
            'nik' => $validated['nik'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'origin_school' => $validated['origin_school'],
            'graduation_year' => $validated['graduation_year'],
            'major_choice_1' => $validated['major_choice_1'],
            'major_choice_2' => $validated['major_choice_2'],
            'address' => $validated['address'],
            'parent_name' => $validated['parent_name'],
            'parent_phone' => $validated['parent_phone'],
            'status' => 'pending',
        ]);

        return redirect()->route('ppdb.success', ['id' => $registration->registration_number]);
    }

    public function success($id)
    {
        $schoolProfile = SchoolProfile::first();
        $registration = PPDBRegistration::where('registration_number', $id)->firstOrFail();
        
        return inertia('PPDB/Success', [
            'schoolProfile' => $schoolProfile,
            'registration' => $registration,
        ]);
    }
}
