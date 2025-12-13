<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model
{
    /** @use HasFactory<\Database\Factories\SchoolClassFactory> */
    use HasFactory;

    protected $table = 'classes';

    protected $fillable = [
        'name',
        'level',
        'academic_year',
        'homeroom_teacher_id',
        'description',
    ];

    public function homeroomTeacher()
    {
        return $this->belongsTo(User::class, 'homeroom_teacher_id');
    }

    public function students()
    {
        return $this->hasMany(Student::class, 'class_id');
    }

    public function assignments()
    {
        return $this->hasMany(ClassTeacherAssignment::class, 'class_id');
    }

    public function subjectAssignments()
    {
        return $this->hasMany(SubjectTeacherAssignment::class, 'class_id');
    }
}
