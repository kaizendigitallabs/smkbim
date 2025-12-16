<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SchoolProfileController extends Controller
{
    /**
     * Display the school profile (only one profile exists).
     */
    public function index()
    {
        $profile = \App\Models\SchoolProfile::first();
        
        return inertia('Admin/SchoolProfile/Index', [
            'profile' => $profile,
        ]);
    }

    /**
     * Show the form for editing the school profile.
     */
    public function edit()
    {
        $profile = \App\Models\SchoolProfile::first();
        
        if (!$profile) {
            $profile = \App\Models\SchoolProfile::create([
                'name' => 'SMK Bina Insan Mulia',
            ]);
        }
        
        return inertia('Admin/SchoolProfile/Edit', [
            'profile' => $profile,
        ]);
    }

    /**
     * Update the school profile in storage.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'history' => 'nullable|string',
            'address' => 'nullable|string',
            'phone' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'whatsapp' => 'nullable|string|max:255',
            'logo' => 'nullable|image|max:2048',
            'maps_embed_link' => 'nullable|string',
            'operating_hours' => 'nullable|string|max:255',
            'facebook' => 'nullable|url|max:255',
            'instagram' => 'nullable|url|max:255',
            'youtube' => 'nullable|url|max:255',
            'accreditation_grade' => 'nullable|string',
            'accreditation_label' => 'nullable|string',

        ]);

        $profile = \App\Models\SchoolProfile::first();
        
        if (!$profile) {
            $profile = \App\Models\SchoolProfile::create($validated);
        } else {
            // Handle logo upload if present
            if ($request->hasFile('logo')) {
                $logoPath = $request->file('logo')->store('logos', 'public');
                $validated['logo'] = $logoPath;
            }
            
            $profile->update($validated);
        }

        return redirect()->route('admin.school-profile.index')
            ->with('success', 'Profil sekolah berhasil diperbarui.');
    }
}
