<?php

namespace App\Http\Controllers;

use App\Models\SchoolProfile;
use App\Models\Activity;
use App\Models\Article;
use App\Models\PPDBSetting;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $schoolProfile = SchoolProfile::first();
        

        // Kegiatan & Ekstrakurikuler (Non-Prestatsi) - Limit 3 for section 5
        $activities = Activity::whereIn('type', ['school', 'extracurricular'])
            ->orderBy('date', 'desc')
            ->take(3)
            ->get();
            
        // Prestasi Siswa - Limit 3 for section 6
        $achievements = Activity::where('type', 'achievement')
            ->orderBy('date', 'desc')
            ->take(3)
            ->get();

        // Berita & Artikel - Limit 3 for section 7
        $latestArticles = Article::where('status', 'published')
            ->orderBy('published_at', 'desc')
            ->take(3)
            ->get();
        
        // Galeri Singkat (Photos) - Limit 6 for section 8 (Grid 2x3)
        $galleries = \App\Models\Gallery::where('type', 'photo')
            ->orderBy('created_at', 'desc')
            ->take(6)
            ->get();

        // PPDB Status
        $ppdbSettings = PPDBSetting::all()->pluck('value', 'key')->toArray();
        $ppdbIsOpen = isset($ppdbSettings['is_open']) && ($ppdbSettings['is_open'] === 'true' || $ppdbSettings['is_open'] === '1');
        
        // Data Lain
        $majors = \App\Models\Major::orderBy('name')->get();
        $schoolPrograms = \App\Models\SchoolProgram::orderBy('order')->get();
        
        // Home Settings
        $homeSettings = \App\Models\HomeSetting::first();
        
        // Testimonials
        $testimonials = \App\Models\Testimonial::where('is_active', true)
            ->orderBy('rating', 'desc')
            ->take(6)
            ->get();

        return inertia('Home', [
            'schoolProfile' => $schoolProfile,
            'activities' => $activities,
            'achievements' => $achievements,
            'articles' => $latestArticles,
            'galleries' => $galleries,
            'ppdbIsOpen' => $ppdbIsOpen,
            'majors' => $majors,
            'schoolPrograms' => $schoolPrograms,
            
            // New Data
            'homeSettings' => $homeSettings,
            'testimonials' => $testimonials,
        ]);
    }
}
