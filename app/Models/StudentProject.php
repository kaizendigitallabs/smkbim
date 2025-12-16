<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class StudentProject extends Model
{
    use HasUuids;
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
