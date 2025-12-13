<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ReportCardSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ReportCardSettingController extends Controller
{
    /**
     * Display the report card settings form
     * Only accessible by operator role
     */
    public function index()
    {
        $settings = ReportCardSetting::first();
        
        return Inertia::render('Admin/ReportCardSettings/Index', [
            'settings' => $settings
        ]);
    }

    /**
     * Store or update report card settings
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'semester' => 'required|in:Ganjil,Genap',
            'academic_year' => 'required|string',
            'headmaster_name' => 'required|string|max:255',
            'headmaster_nuks' => 'nullable|string|max:50',
            'logo_watermark' => 'nullable|image|mimes:png,jpg,jpeg|max:2048',
            'school_address' => 'required|string',
            'city' => 'required|string|max:100',
            'report_date' => 'nullable|date',
            'footer_text' => 'nullable|string',
        ]);

        // Handle logo upload
        if ($request->hasFile('logo_watermark')) {
            $file = $request->file('logo_watermark');
            $filename = 'logo_watermark_' . time() . '.' . $file->getClientOriginalExtension();
            $path = $file->storeAs('report-cards', $filename, 'public');
            $validated['logo_watermark'] = $path;
        }

        $settings = ReportCardSetting::first();
        
        if ($settings) {
            // Delete old logo if new one uploaded
            if ($request->hasFile('logo_watermark') && $settings->logo_watermark) {
                Storage::disk('public')->delete($settings->logo_watermark);
            }
            $settings->update($validated);
        } else {
            ReportCardSetting::create($validated);
        }

        return redirect()->back()->with('success', 'Pengaturan rapot berhasil disimpan');
    }
}
