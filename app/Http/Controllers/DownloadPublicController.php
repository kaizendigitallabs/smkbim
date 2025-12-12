<?php

namespace App\Http\Controllers;

use App\Models\Download;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;

class DownloadPublicController extends Controller
{
    public function index()
    {
        $schoolProfile = SchoolProfile::first();
        $downloads = Download::orderBy('created_at', 'desc')->get();
        
        return inertia('Downloads/Index', [
            'schoolProfile' => $schoolProfile,
            'downloads' => $downloads,
        ]);
    }
}
