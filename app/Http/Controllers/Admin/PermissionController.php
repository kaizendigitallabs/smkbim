<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::latest()->get();
        return Inertia::render('Admin/Permissions/Index', [
            'permissions' => $permissions
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
        ]);

        Permission::create(['name' => $request->name]);

        return redirect()->back()->with('success', 'Permission created successfully');
    }

    public function update(Request $request, $id)
    {
        $permission = Permission::findOrFail($id);
        
        $request->validate([
            'name' => 'required|string|unique:permissions,name,' . $id,
        ]);

        $permission->update(['name' => $request->name]);

        return redirect()->back()->with('success', 'Permission updated successfully');
    }

    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        
        $permission->delete();

        return redirect()->back()->with('success', 'Permission deleted successfully');
    }
}
