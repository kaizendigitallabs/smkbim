<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;

class PermissionController extends Controller
{
    public function index()
    {
        $permissions = Permission::all();
        return response()->json($permissions);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:permissions,name',
        ]);

        $permission = Permission::create(['name' => $request->name]);

        return response()->json($permission, 201);
    }

    public function update(Request $request, $id)
    {
        $permission = Permission::findOrFail($id);
        
        // System core permissions protection?
        // Maybe implement policy later. For now, allow super_admin.

        $request->validate([
            'name' => 'required|string|unique:permissions,name,' . $id,
        ]);

        $permission->update(['name' => $request->name]);

        return response()->json($permission);
    }

    public function destroy($id)
    {
        $permission = Permission::findOrFail($id);
        
        // Protect core permissions if needed
        
        $permission->delete();

        return response()->json(['message' => 'Permission deleted successfully']);
    }
}
