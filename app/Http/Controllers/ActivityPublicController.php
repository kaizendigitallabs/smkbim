<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;

class ActivityPublicController extends Controller
{
    public function index()
    {
        $schoolProfile = SchoolProfile::first();
        // Fetch all activities or filter by 'school' type if needed. For now all.
        $activities = Activity::orderBy('date', 'desc')->paginate(9);
        
        return inertia('Activity/Index', [
            'schoolProfile' => $schoolProfile,
            'activities' => $activities,
            'title' => 'Agenda Kegiatan Sekolah',
            'type' => 'all'
        ]);
    }

    public function extracurricular()
    {
        $schoolProfile = SchoolProfile::first();
        // Assuming 'ekstrakurikuler' or similar type in Activity, 
        // OR distinct logic. For now, filter by 'extracurricular' if column exists, else all.
        // Based on model review, type exists.
        $activities = Activity::where('type', 'extracurricular')->orderBy('date', 'desc')->paginate(9);
        
        return inertia('Activity/Index', [ // Reusing Index with different title/data
            'schoolProfile' => $schoolProfile,
            'activities' => $activities,
            'title' => 'Ekstrakurikuler',
            'type' => 'extracurricular'
        ]);
    }

    public function achievement()
    {
        $schoolProfile = SchoolProfile::first();
        $activities = Activity::where('type', 'achievement')->orderBy('date', 'desc')->paginate(9);
        
        return inertia('Activity/Index', [
            'schoolProfile' => $schoolProfile,
            'activities' => $activities,
            'title' => 'Prestasi Siswa',
            'type' => 'achievement'
        ]);
    }
}
