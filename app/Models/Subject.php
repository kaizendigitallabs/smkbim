<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Subject extends Model
{
    use HasUuids;
    /** @use HasFactory<\Database\Factories\SubjectFactory> */
    use HasFactory, HasUuids;

    protected $fillable = [
        'name',
        'code',
        'display_order',
        'subject_group',
        'description',
    ];

    public function assignments()
    {
        return $this->hasMany(SubjectTeacherAssignment::class);
    }
}
