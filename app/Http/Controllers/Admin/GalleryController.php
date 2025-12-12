<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use App\Models\Activity;
use Illuminate\Http\Request;

class GalleryController extends Controller
{
    /**
     * Display a listing of gallery items.
     */
    public function index()
    {
        $galleries = Gallery::with('activity')->orderBy('created_at', 'desc')->get();
        
        return inertia('Admin/Gallery/Index', [
            'galleries' => $galleries,
        ]);
    }

    /**
     * Show the form for creating a new gallery item.
     */
    public function create()
    {
        $activities = Activity::orderBy('date', 'desc')->get();
        
        return inertia('Admin/Gallery/Create', [
            'activities' => $activities,
        ]);
    }

    /**
     * Store a newly created gallery item in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:photo,video',
            'title' => 'required|string|max:255',
            'url' => 'required|string',
            'thumbnail' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'activity_id' => 'nullable|exists:activities,id',
        ]);

        // Handle thumbnail upload for videos
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('gallery/thumbnails', 'public');
        }

        // For photos, store the uploaded file
        if ($validated['type'] === 'photo' && $request->hasFile('url')) {
            $validated['url'] = $request->file('url')->store('gallery/photos', 'public');
        }

        Gallery::create($validated);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Item galeri berhasil ditambahkan.');
    }

    /**
     * Show the form for editing the specified gallery item.
     */
    public function edit(Gallery $gallery)
    {
        $activities = Activity::orderBy('date', 'desc')->get();
        
        return inertia('Admin/Gallery/Edit', [
            'gallery' => $gallery->load('activity'),
            'activities' => $activities,
        ]);
    }

    /**
     * Update the specified gallery item in storage.
     */
    public function update(Request $request, Gallery $gallery)
    {
        $validated = $request->validate([
            'type' => 'required|in:photo,video',
            'title' => 'required|string|max:255',
            'url' => 'nullable|string',
            'thumbnail' => 'nullable|image|max:2048',
            'category' => 'nullable|string|max:255',
            'activity_id' => 'nullable|exists:activities,id',
        ]);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $validated['thumbnail'] = $request->file('thumbnail')->store('gallery/thumbnails', 'public');
        }

        // Handle photo upload
        if ($validated['type'] === 'photo' && $request->hasFile('url')) {
            $validated['url'] = $request->file('url')->store('gallery/photos', 'public');
        } elseif (!$request->hasFile('url')) {
            // Keep existing URL if no new file uploaded
            unset($validated['url']);
        }

        $gallery->update($validated);

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Item galeri berhasil diperbarui.');
    }

    /**
     * Remove the specified gallery item from storage.
     */
    public function destroy(Gallery $gallery)
    {
        $gallery->delete();

        return redirect()->route('admin.gallery.index')
            ->with('success', 'Item galeri berhasil dihapus.');
    }
}
