<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Teacher extends Model
{
    use HasUuids;
    protected $fillable = [
        'name',
        'position',
        'subject',
        'contact',
        'photo',
        'is_active',
        'order',
        'user_id',
        'nip',
        'nuptk',
        'gender',
        'place_of_birth',
        'date_of_birth',
        'address',
        'last_education',
        'education_major',
        'university',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
