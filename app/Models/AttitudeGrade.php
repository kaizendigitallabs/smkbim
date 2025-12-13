<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AttitudeGrade extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'class_id',
        'aspect',
        'grade',
        'description',
        'semester',
        'academic_year',
        'teacher_id',
    ];

    // Relationships
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    // Scopes
    public function scopeSpiritual($query)
    {
        return $query->where('aspect', 'spiritual');
    }

    public function scopeSocial($query)
    {
        return $query->where('aspect', 'social');
    }

    public function scopeForSemester($query, $semester, $academicYear)
    {
        return $query->where('semester', $semester)
                    ->where('academic_year', $academicYear);
    }
}
