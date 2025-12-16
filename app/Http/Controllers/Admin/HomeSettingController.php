<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\HomeSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class HomeSettingController extends Controller
{
    /**
     * Display the home settings page.
     */
    public function index()
    {
        // Get the single row, or create one if it doesn't exist
        $setting = HomeSetting::firstOrCreate([]);
        
        // Get school programs for features section
        $schoolPrograms = \App\Models\SchoolProgram::orderBy('order')->get();
        
        return Inertia::render('Admin/HomeSettings/Index', [
            'setting' => $setting,
            'schoolPrograms' => $schoolPrograms
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit()
    {
        // Get the single row, or create one if it doesn't exist
        $setting = HomeSetting::firstOrCreate([]);
        
        return Inertia::render('Dashboard/HomeSetting/Index', [
            'setting' => $setting
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $setting = HomeSetting::firstOrCreate([]);

        $validated = $request->validate([
            'hero_title' => 'nullable|string|max:255',
            'hero_subtitle' => 'nullable|string|max:255',
            'hero_description' => 'nullable|string',
            'hero_image' => 'nullable|image|max:5120', // 5MB Max for big hero image
            
            'about_title' => 'nullable|string|max:255',
            'about_description' => 'nullable|string',
            
            'cta_title' => 'nullable|string|max:255',
            'cta_text' => 'nullable|string',
            'cta_primary_btn_text' => 'nullable|string',
            'cta_primary_btn_url' => 'nullable|string',
            'cta_secondary_btn_text' => 'nullable|string',
            'cta_secondary_btn_url' => 'nullable|string',

            // Hero Bullets
            'hero_feature_1' => 'nullable|string',
            'hero_feature_2' => 'nullable|string',
            'hero_feature_3' => 'nullable|string',
            // Metrics
            'metric_1_label' => 'nullable|string',
            'metric_1_value' => 'nullable|string',
            'metric_2_label' => 'nullable|string',
            'metric_2_value' => 'nullable|string',
            'metric_3_label' => 'nullable|string',
            'metric_3_value' => 'nullable|string',
            // Feature Cards
            'feature_1_title' => 'nullable|string',
            'feature_1_description' => 'nullable|string',
            'feature_2_title' => 'nullable|string',
            'feature_2_description' => 'nullable|string',
            'feature_3_title' => 'nullable|string',
            'feature_3_description' => 'nullable|string',

        ]);

        if ($request->hasFile('hero_image')) {
            // Delete old hero image if exists
            if ($setting->hero_image) {
                Storage::disk('public')->delete($setting->hero_image);
            }
            $path = $request->file('hero_image')->store('home-settings', 'public');
            $validated['hero_image'] = $path;
        }

        $setting->update($validated);

        return redirect()->back()->with('success', 'Home Setting updated successfully.');
    }
}
