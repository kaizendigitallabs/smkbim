<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Validation\ValidationException;

use Inertia\Inertia;

class RoleController extends Controller
{
    // Render Inertia Page
    public function page()
    {
        $roles = Role::with('permissions')->get();
        $permissions = Permission::all(); // Pass all permissions for the form
        
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'permissions' => $permissions,
        ]);
    }

    public function index()
    {
        $roles = Role::with('permissions')->get();
        return response()->json($roles);
    }

    public function store(Request $request)
    {
        // Permission check
        if (!auth()->user()->hasRole('super_admin')) {
             return redirect()->back()->with('error', 'Unauthorized.');
        }

        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role = Role::create(['name' => $request->name]);
        
        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->back()->with('success', 'Role created successfully.');
    }

    public function show($id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        return response()->json($role);
    }

    public function update(Request $request, $id)
    {
        // Permission check
        if (!auth()->user()->hasRole('super_admin')) {
             return redirect()->back()->with('error', 'Unauthorized.');
        }

        $role = Role::findOrFail($id);
        
        if ($role->name === 'super_admin') {
            return redirect()->back()->with('error', 'Cannot edit super_admin role.');
        }

        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $id,
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role->update(['name' => $request->name]);

        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return redirect()->back()->with('success', 'Role updated successfully.');
    }

    public function destroy($id)
    {
        // Permission check
        if (!auth()->user()->hasRole('super_admin')) {
             return redirect()->back()->with('error', 'Unauthorized.');
        }

        $role = Role::findOrFail($id);

        if ($role->name === 'super_admin') {
            return redirect()->back()->with('error', 'Cannot delete super_admin role.');
        }

        $role->delete();

        return redirect()->back()->with('success', 'Role deleted successfully.');
    }

    public function permissions($id)
    {
        $role = Role::findOrFail($id);
        return response()->json($role->permissions);
    }

    public function syncPermissions(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        
        $request->validate([
            'permissions' => 'required|array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        if ($role->name === 'super_admin' && !auth()->user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $role->syncPermissions($request->permissions);
        
        return response()->json($role->load('permissions'));
    }
}
