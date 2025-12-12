<?php

namespace App\Http\Controllers;

use App\Models\SchoolProfile;
use App\Models\Teacher;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function profile()
    {
        $schoolProfile = SchoolProfile::first();
        
        return inertia('About/Profile', [
            'schoolProfile' => $schoolProfile,
        ]);
    }

    public function teachers()
    {
        $schoolProfile = SchoolProfile::first();
        $teachers = Teacher::where('is_active', true)
            ->orderBy('order')
            ->get();
        
        return inertia('About/Teachers', [
            'schoolProfile' => $schoolProfile,
            'teachers' => $teachers,
        ]);
    }

    public function organization()
    {
        $schoolProfile = SchoolProfile::first();
        
        return inertia('About/Organization', [
            'schoolProfile' => $schoolProfile,
        ]);
    }
}
