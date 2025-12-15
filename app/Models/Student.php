<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'nis',
        'nisn',
        'class_id', // Current active class
        'place_of_birth',
        'date_of_birth',
        'gender',
        'address',
        'parent_phone',
        'religion',
        'father_name',
        'mother_name',
        'guardian_name',
        'father_job',
        'mother_job',
        'guardian_job',
        'previous_school',
        'entry_year',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function attendances()
    {
        return $this->hasMany(Attendance::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function attitudeGrades()
    {
        return $this->hasMany(AttitudeGrade::class);
    }

    public function schoolClass()
    {
        return $this->belongsTo(SchoolClass::class, 'class_id');
    }
}
