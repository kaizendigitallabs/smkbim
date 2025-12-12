<?php

namespace App\Http\Controllers;

use App\Models\StudentProject; // Assuming this model exists for Portfolio
use App\Models\SchoolProfile;
use Illuminate\Http\Request;

class GalleryPublicController extends Controller
{
    public function index()
    {
        $schoolProfile = SchoolProfile::first();
        $projects = StudentProject::orderBy('created_at', 'desc')->paginate(12);
        
        return inertia('Gallery/Index', [
            'schoolProfile' => $schoolProfile,
            'projects' => $projects,
        ]);
    }
}
