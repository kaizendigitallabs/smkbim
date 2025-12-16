<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Major extends Model
{
    use HasUuids;
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
