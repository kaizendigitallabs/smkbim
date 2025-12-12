<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudentProject extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'description',
        'student_name',
        'major_id',
        'image',
        'year',
    ];

    public function major()
    {
        return $this->belongsTo(Major::class);
    }
}
