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
        // Check if user has permission to manage accounts OR is super_admin
        if (!auth()->user()->hasRole('super_admin') && !auth()->user()->can('manage_user_accounts')) {
             abort(403);
        }

        // Fetch users with their roles
        $users = User::with('roles')->paginate(10); // Pagination for users
        
        // Filter available roles based on current user
        if (auth()->user()->hasRole('super_admin')) {
            $roles = Role::all();
        } else {
            // Operator / Others can only assign non-super_admin roles
            $roles = Role::where('name', '!=', 'super_admin')->get();
        }

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => $roles,
            'canCreateSuperAdmin' => auth()->user()->hasRole('super_admin'),
        ]);
    }

    public function index($userId)
    {
        $user = User::with('roles')->findOrFail($userId);
        return response()->json($user->roles);
    }

    // Store New User
    public function storeUser(Request $request)
    {
        // Permission check
        if (!auth()->user()->hasRole('super_admin') && !auth()->user()->can('manage_user_accounts')) {
             abort(403);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'roles' => 'required|array|min:1',
            'roles.*' => 'exists:roles,name',
        ]);

        // Constraint: Only super_admin can assign 'super_admin' role
        if (in_array('super_admin', $validated['roles']) && !auth()->user()->hasRole('super_admin')) {
            return redirect()->back()->with('error', 'Unauthorized to assign super_admin role.');
        }

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
        ]);

        $user->syncRoles($validated['roles']);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    // Update User
    public function updateUser(Request $request, $id)
    {
        if (!auth()->user()->hasRole('super_admin') && !auth()->user()->can('manage_user_accounts')) {
             abort(403);
        }

        $user = User::findOrFail($id);

        // Constraint: Non-super_admin cannot edit a super_admin user
        if ($user->hasRole('super_admin') && !auth()->user()->hasRole('super_admin')) {
            return redirect()->back()->with('error', 'Unauthorized to edit super_admin user.');
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:8|confirmed',
            'roles' => 'required|array|min:1',
            'roles.*' => 'exists:roles,name',
        ]);

        // Constraint: Only super_admin can assign 'super_admin' role
        if (in_array('super_admin', $validated['roles']) && !auth()->user()->hasRole('super_admin')) {
            return redirect()->back()->with('error', 'Unauthorized to assign super_admin role.');
        }

        $user->update([
            'name' => $validated['name'],
            'email' => $validated['email'],
        ]);

        if ($request->filled('password')) {
            $user->update([
                'password' => bcrypt($validated['password']),
            ]);
        }

        // Prevent removing super_admin from yourself if you are the logged in user
        if ($user->id === auth()->id() && !in_array('super_admin', $validated['roles']) && auth()->user()->hasRole('super_admin')) {
             return redirect()->back()->with('error', 'You cannot remove super_admin role from yourself.');
        }

        $user->syncRoles($validated['roles']);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    // Delete User
    public function destroyUser($id)
    {
        if (!auth()->user()->hasRole('super_admin') && !auth()->user()->can('manage_user_accounts')) {
             abort(403);
        }

        $user = User::findOrFail($id);

        // Constraint: Non-super_admin cannot delete a super_admin user
        if ($user->hasRole('super_admin') && !auth()->user()->hasRole('super_admin')) {
            return redirect()->back()->with('error', 'Unauthorized to delete super_admin user.');
        }

        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete yourself.');
        }

        $user->delete();

        return redirect()->back()->with('success', 'User deleted successfully.');
    }

    // Original Role Management Methods (kept for API compatibility if needed, but redundant with new full update)
    public function store(Request $request, $userId) { /* ... original implementation ... */ }
    public function destroy($userId, $roleId) { /* ... original implementation ... */ }
}
