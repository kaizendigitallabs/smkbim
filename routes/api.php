<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    $user = $request->user();
    
    return response()->json([
        'id' => $user->id,
        'name' => $user->name,
        'email' => $user->email,
        'roles' => $user->getRoleNames(),
        'permissions' => $user->getAllPermissions()->pluck('name'),
        'assigned_classes' => $user->getAssignedClasses()->map(function($class) {
            return [
                'id' => $class->id,
                'name' => $class->name,
            ];
        }),
        'assigned_subjects' => $user->getAssignedSubjects()->map(function($assignment) {
            return [
                'subject_id' => $assignment->subject->id,
                'subject_name' => $assignment->subject->name,
                'class_id' => $assignment->schoolClass->id ?? null,
                'class_name' => $assignment->schoolClass->name ?? 'All Classes',
            ];
        }),
    ]);
});
