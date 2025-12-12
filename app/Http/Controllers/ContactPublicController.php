<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use App\Models\SchoolProfile;
use Illuminate\Http\Request;

class ContactPublicController extends Controller
{
    public function index()
    {
        $schoolProfile = SchoolProfile::first();
        
        return inertia('Contact/Index', [
            'schoolProfile' => $schoolProfile,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'message' => 'required|string',
        ]);

        Contact::create($validated);

        return back()->with('success', 'Pesan Anda berhasil dikirim. Kami akan segera menghubungi Anda.');
    }
}
