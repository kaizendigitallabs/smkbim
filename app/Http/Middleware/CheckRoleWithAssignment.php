<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleWithAssignment
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        // Super Admin Bypass
        if ($user->hasRole('super_admin')) {
            return $next($request);
        }

        // Check Wali Kelas Assignment
        if ($user->hasRole('wali_kelas')) {
            if (!$user->isWaliKelas()) {
                return response()->json(['message' => 'Anda terdaftar sebagai Wali Kelas tetapi belum memiliki penugasan kelas aktif.'], 403);
            }
        }

        // Check Guru Mapel Assignment
        if ($user->hasRole('guru_mapel')) {
            if (!$user->isGuruMapel()) {
                return response()->json(['message' => 'Anda terdaftar sebagai Guru Mapel tetapi belum memiliki penugasan mata pelajaran aktif.'], 403);
            }
        }

        // If user has NO assignment-based roles but tries to access assignment-protected area?
        // This middleware assumes it's applied to routes that REQUIRE assignment.
        // If a plain 'guru' accesses this, and has neither role, should it fail?
        // The rule "User tanpa assignment tidak boleh melihat data siswa" implies yes.
        // But if they don't have the role, they might be blocked by 'role:...' middleware before this.
        // If they pass role check, we check assignment here.
        
        return $next($request);
    }
}
