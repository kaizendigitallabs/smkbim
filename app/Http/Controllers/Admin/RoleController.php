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
        // Reuse logic or just fetch? 
        // For Inertia, we pass data as props.
        $roles = Role::with('permissions')->get();
        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles
        ]);
    }

    public function index()
    {
        $roles = Role::with('permissions')->get();
        return response()->json($roles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:roles,name',
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        // Policy check: admin_sekolah cannot create super_admin
        if ($request->name === 'super_admin' && !auth()->user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Unauthorized to create super_admin role'], 403);
        }

        $role = Role::create(['name' => $request->name]);
        
        if ($request->has('permissions')) {
            $role->syncPermissions($request->permissions);
        }

        return response()->json($role->load('permissions'), 201);
    }

    public function show($id)
    {
        $role = Role::with('permissions')->findOrFail($id);
        return response()->json($role);
    }

    public function update(Request $request, $id)
    {
        $role = Role::findOrFail($id);
        
        // Policy check: admin_sekolah cannot update super_admin role
        if ($role->name === 'super_admin' && !auth()->user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Unauthorized to update super_admin role'], 403);
        }

        $request->validate([
            'name' => 'required|string|unique:roles,name,' . $id,
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,name',
        ]);

        $role->update(['name' => $request->name]);

        if ($request->has('permissions')) {
            // Policy check: admin_sekolah cannot unassign critical permissions from super_admin?
            // Actually super_admin always has all permissions via Gate::before typically, 
            // but explicit assignment is also used.
            // Simplified: prevent modifying super_admin permissions if not super_admin
            if ($role->name === 'super_admin' && !auth()->user()->hasRole('super_admin')) {
                 // Skip permission sync or error
                 return response()->json(['message' => 'Unauthorized to modify permissions of super_admin'], 403);
            }
            
            $role->syncPermissions($request->permissions);
        }

        return response()->json($role->load('permissions'));
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);

        // Policy check: Only super_admin can delete
        if (!auth()->user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Only super_admin can delete roles'], 403);
        }

        // Prevent deleting super_admin role
        if ($role->name === 'super_admin') {
            return response()->json(['message' => 'Cannot delete super_admin role'], 403);
        }

        $role->delete();

        return response()->json(['message' => 'Role deleted successfully']);
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
