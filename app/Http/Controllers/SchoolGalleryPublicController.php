<?php

namespace App\Http\Controllers;

use App\Models\Gallery;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;

class SchoolGalleryPublicController extends Controller
{
    public function index()
    {
        $schoolProfile = SchoolProfile::first();
        // Fetch galleries of type 'photo' or all, ordered by creation
        $galleries = Gallery::with('activity')
            ->where('type', 'photo')
            ->orderBy('created_at', 'desc')
            ->paginate(12);
        
        return inertia('Gallery/Photos', [
            'schoolProfile' => $schoolProfile,
            'galleries' => $galleries,
        ]);
    }

    public function videos()
    {
        $schoolProfile = SchoolProfile::first();
        $galleries = Gallery::with('activity')
            ->where('type', 'video')
            ->orderBy('created_at', 'desc')
            ->paginate(12);

        return inertia('Gallery/Videos', [
            'schoolProfile' => $schoolProfile,
            'galleries' => $galleries,
        ]);
    }
}
