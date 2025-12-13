<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grade extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'subject_teacher_assignment_id',
        'type',
        'score',
        'description',
        'date',
        'semester',
        'academic_year',
    ];

    protected $casts = [
        'date' => 'date',
        'score' => 'decimal:2',
    ];

    // Relationships
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function assignment()
    {
        return $this->belongsTo(SubjectTeacherAssignment::class, 'subject_teacher_assignment_id');
    }

    // Scopes for filtering by type
    public function scopeDaily($query)
    {
        return $query->where('type', 'daily');
    }

    public function scopeDailyExam($query)
    {
        return $query->where('type', 'daily_exam');
    }

    public function scopeMidterm($query)
    {
        return $query->where('type', 'midterm');
    }

    public function scopeFinal($query)
    {
        return $query->where('type', 'final');
    }

    public function scopeForSemester($query, $semester, $academicYear)
    {
        return $query->where('semester', $semester)
                    ->where('academic_year', $academicYear);
    }
}
