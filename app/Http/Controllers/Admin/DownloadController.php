<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Download;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DownloadController extends Controller
{
    public function index()
    {
        $downloads = Download::orderBy('created_at', 'desc')->get();
        return inertia('Admin/Downloads/Index', [
            'downloads' => $downloads
        ]);
    }

    public function create()
    {
        return inertia('Admin/Downloads/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:brochure,calendar,guide,other',
            'file' => 'required|file|max:10240', // Max 10MB
        ]);

        if ($request->hasFile('file')) {
            $validated['file_path'] = $request->file('file')->store('downloads', 'public');
        }

        Download::create($validated);

        return redirect()->route('admin.downloads.index')
            ->with('success', 'File berhasil diunggah.');
    }

    public function edit(Download $download)
    {
        return inertia('Admin/Downloads/Edit', [
            'download' => $download
        ]);
    }

    public function update(Request $request, Download $download)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category' => 'required|in:brochure,calendar,guide,other',
            'file' => 'nullable|file|max:10240',
        ]);

        if ($request->hasFile('file')) {
            // Delete old file
            if ($download->file_path) {
                Storage::disk('public')->delete($download->file_path);
            }
            
            $validated['file_path'] = $request->file('file')->store('downloads', 'public');
        }

        $download->update($validated);

        return redirect()->route('admin.downloads.index')
            ->with('success', 'Data file berhasil diperbarui.');
    }

    public function destroy(Download $download)
    {
        if ($download->file_path) {
            Storage::disk('public')->delete($download->file_path);
        }
        
        $download->delete();

        return redirect()->route('admin.downloads.index')
            ->with('success', 'File berhasil dihapus.');
    }
}
