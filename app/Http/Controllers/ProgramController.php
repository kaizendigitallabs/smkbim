<?php

namespace App\Http\Controllers;

use App\Models\Major;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function majors()
    {
        $schoolProfile = SchoolProfile::first();
        $majors = Major::orderBy('name')->get();
        
        return inertia('Program/Majors/Index', [
            'schoolProfile' => $schoolProfile,
            'majors' => $majors,
        ]);
    }

    public function showMajor($slug)
    {
        $schoolProfile = SchoolProfile::first();
        $major = Major::where('slug', $slug)->firstOrFail();
        
        // Get other majors for sidebar/navigation
        $otherMajors = Major::where('id', '!=', $major->id)
            ->orderBy('name')
            ->select('name', 'slug')
            ->get();
            
        return inertia('Program/Majors/Show', [
            'schoolProfile' => $schoolProfile,
            'major' => $major,
            'otherMajors' => $otherMajors,
        ]);
    }

    public function featured()
    {
        $schoolProfile = SchoolProfile::first();
        // Assuming SchoolProgram model exists and has title, description, image
        $programs = \App\Models\SchoolProgram::all();
        
        return inertia('Program/Featured', [
            'schoolProfile' => $schoolProfile,
            'programs' => $programs,
        ]);
    }

    public function curriculum()
    {
        $schoolProfile = SchoolProfile::first();
        
        return inertia('Program/Curriculum', [
            'schoolProfile' => $schoolProfile,
        ]);
    }
}
