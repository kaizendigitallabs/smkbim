<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;

use Inertia\Inertia;

class UserRoleController extends Controller
{
    // Render Inertia Page
    public function page()
    {
        if (!auth()->user()->hasRole('super_admin')) {
             abort(403);
        }

        // Fetch users with their roles
        $users = User::with('roles')->paginate(10); // Pagination for users
        $roles = Role::all();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    public function index($userId)
    {
        $user = User::with('roles')->findOrFail($userId);
        return response()->json($user->roles);
    }

    public function store(Request $request, $userId)
    {
        $user = User::findOrFail($userId);
        
        $request->validate([
            'roles' => 'required|array',
            'roles.*' => 'exists:roles,name',
        ]);

        // Policy Check: Only super_admin can assign roles
        if (!auth()->user()->hasRole('super_admin')) {
             return response()->json(['message' => 'Unauthorized. Only super_admin can assign roles.'], 403);
        }

        // Prevent assigning super_admin if not super_admin (double check)
        if (in_array('super_admin', $request->roles) && !auth()->user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Unauthorized to assign super_admin role'], 403);
        }

        // Sync roles (replaces existing ones)
        $user->syncRoles($request->roles);

        return response()->json($user->load('roles'));
    }

    public function destroy($userId, $roleId)
    {
        $user = User::findOrFail($userId);
        $role = Role::findOrFail($roleId);

        // Policy Check: Only super_admin
        if (!auth()->user()->hasRole('super_admin')) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Prevent removing super_admin from yourself?
        if ($user->id === auth()->id() && $role->name === 'super_admin') {
             return response()->json(['message' => 'Cannot remove super_admin role from yourself'], 403);
        }

        $user->removeRole($role);

        return response()->json(['message' => 'Role removed from user']);
    }
}
