<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PPDBSetting;
use Illuminate\Http\Request;

class PPDBSettingController extends Controller
{
    /**
     * Display PPDB settings.
     */
    public function index()
    {
        $settings = PPDBSetting::all()->pluck('value', 'key')->toArray();
        
        return inertia('Admin/PPDB/Settings', [
            'settings' => $settings,
        ]);
    }

    /**
     * Update PPDB settings.
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'is_open' => 'required|boolean',
            'start_date' => 'nullable|date',
            'end_date' => 'nullable|date|after_or_equal:start_date',
            'quota' => 'nullable|integer|min:0',
            'requirements' => 'nullable|string',
            'contact_info' => 'nullable|string',
        ]);

        foreach ($validated as $key => $value) {
            PPDBSetting::updateOrCreate(
                ['key' => $key],
                ['value' => $value]
            );
        }

        return redirect()->route('admin.ppdb.settings')
            ->with('success', 'Pengaturan PPDB berhasil diperbarui.');
    }
}
