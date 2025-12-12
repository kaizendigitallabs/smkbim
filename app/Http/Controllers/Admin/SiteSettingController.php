<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SiteSettingController extends Controller
{
    public function index()
    {
        $setting = SiteSetting::firstOrCreate([]);
        
        return inertia('Admin/SiteSettings/Index', [
            'setting' => $setting
        ]);
    }

    public function update(Request $request)
    {
        $setting = SiteSetting::firstOrCreate([]);

        $validated = $request->validate([
            // General
            'site_logo' => 'nullable|image|max:2048',
            'site_favicon' => 'nullable|image|max:1024',
            'site_name' => 'nullable|string|max:255',
            'site_description' => 'nullable|string',
            'site_keywords' => 'nullable|string',
            'meta_author' => 'nullable|string|max:255',
            
            // Footer
            'footer_about_text' => 'nullable|string',
            'footer_contact_email' => 'nullable|email|max:255',
            'footer_contact_phone' => 'nullable|string|max:50',
            'footer_contact_address' => 'nullable|string',
            'footer_social_facebook' => 'nullable|url|max:255',
            'footer_social_instagram' => 'nullable|url|max:255',
            'footer_social_youtube' => 'nullable|url|max:255',
            'footer_social_twitter' => 'nullable|url|max:255',
            
            // SEO
            'google_analytics_id' => 'nullable|string|max:255',
            'google_search_console' => 'nullable|string',
            'facebook_pixel_id' => 'nullable|string|max:255',
            
            // Popup Banner
            'popup_banner_image' => 'nullable|image|max:5120',
            'popup_banner_url' => 'nullable|url|max:255',
            'enable_popup_banner' => 'nullable|boolean',
        ]);

        // Handle logo upload
        if ($request->hasFile('site_logo')) {
            if ($setting->site_logo) {
                Storage::disk('public')->delete($setting->site_logo);
            }
            $validated['site_logo'] = $request->file('site_logo')->store('site-settings', 'public');
        }

        // Handle favicon upload
        if ($request->hasFile('site_favicon')) {
            if ($setting->site_favicon) {
                Storage::disk('public')->delete($setting->site_favicon);
            }
            $validated['site_favicon'] = $request->file('site_favicon')->store('site-settings', 'public');
        }

        // Handle popup banner upload
        if ($request->hasFile('popup_banner_image')) {
            if ($setting->popup_banner_image) {
                Storage::disk('public')->delete($setting->popup_banner_image);
            }
            $validated['popup_banner_image'] = $request->file('popup_banner_image')->store('site-settings/banners', 'public');
        }

        $setting->update($validated);

        return redirect()->back()->with('success', 'Pengaturan website berhasil diperbarui.');
    }
}
