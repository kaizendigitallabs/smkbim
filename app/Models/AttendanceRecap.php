<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Student;
use App\Models\SchoolClass;
use App\Models\User;

class AttendanceRecap extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'class_id',
        'month',
        'semester',
        'academic_year',
        'present',
        'sick',
        'permission',
        'absent',
        'recorded_by',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }

    public function recorder()
    {
        return $this->belongsTo(User::class, 'recorded_by');
    }
}
