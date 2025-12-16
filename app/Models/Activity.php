<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Activity extends Model
{
    use HasUuids;
    protected $fillable = [
        'type',
        'title',
        'slug',
        'date',
        'description',
        'cover_image',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
