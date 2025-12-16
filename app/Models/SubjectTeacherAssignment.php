<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SubjectTeacherAssignment extends Model
{
    use HasUuids;
    /** @use HasFactory<\Database\Factories\SubjectTeacherAssignmentFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'user_id',
        'subject_id',
        'class_id',
        'academic_year',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }
}
