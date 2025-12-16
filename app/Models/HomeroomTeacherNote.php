<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class HomeroomTeacherNote extends Model
{
    use HasUuids;
    use HasFactory, HasUuids;

    protected $fillable = [
        'student_id',
        'teacher_id',
        'notes',
        'semester',
        'academic_year',
    ];

    /**
     * Get the student that owns the note
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the teacher who wrote the note
     */
    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }
}
