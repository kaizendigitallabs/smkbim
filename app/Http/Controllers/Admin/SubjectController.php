<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subject;

use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\SubjectsImport;

class SubjectController extends Controller
{
    // Render Inertia Page
    public function page()
    {
        if (!auth()->user()->can('manage_subjects')) {
            abort(403);
        }

        $subjects = Subject::all();
        return Inertia::render('Admin/Subjects/Index', [
            'subjects' => $subjects
        ]);
    }

    public function index()
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subjects = Subject::all();
        return response()->json($subjects);
    }

    public function store(Request $request)
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:subjects,code',
            'description' => 'nullable|string',
            'subject_group' => 'required|in:A,B,C',
            'display_order' => 'required|integer|min:0',
        ]);

        $subject = Subject::create($request->all());
        
        return redirect()->back()->with('success', 'Subject created successfully');
    }

    public function update(Request $request, $id)
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subject = Subject::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50|unique:subjects,code,' . $id,
            'description' => 'nullable|string',
            'subject_group' => 'required|in:A,B,C',
            'display_order' => 'required|integer|min:0',
        ]);


        $subject->update($request->all());
        
        return redirect()->back()->with('success', 'Subject updated successfully');
    }

    public function destroy($id)
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $subject = Subject::findOrFail($id);
        $subject->delete();
        
        return redirect()->back()->with('success', 'Subject deleted successfully');
    }

    public function template()
    {
        if (!auth()->user()->can('manage_subjects')) {
            abort(403);
        }

        return Excel::download(new \App\Exports\SubjectsTemplateExport, 'template_mapel.xlsx');
    }

    public function import(Request $request)
    {
        if (!auth()->user()->can('manage_subjects')) {
             return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'file' => 'required|mimes:xlsx,xls,csv',
        ]);

        try {
            Excel::import(new SubjectsImport, $request->file('file'));
            return redirect()->back()->with('success', 'Data mapel berhasil diimport.');
        } catch (\Maatwebsite\Excel\Validators\ValidationException $e) {
             $failures = $e->failures();
             $messages = [];
             foreach ($failures as $failure) {
                 $messages[] = 'Baris ' . $failure->row() . ': ' . implode(', ', $failure->errors());
             }
             return redirect()->back()->withErrors(['file' => implode(' | ', $messages)]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(['file' => 'Gagal import: ' . $e->getMessage()]);
        }
    }
}
