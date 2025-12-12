<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Major extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'description',
        'profile_content',
        'curriculum_content',
        'facilities_content',
        'image',
    ];

    public function programs()
    {
        return $this->hasMany(MajorProgram::class);
    }
}
