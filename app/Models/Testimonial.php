<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Testimonial extends Model
{
    use HasUuids;
    protected $fillable = [
        'name',
        'role',
        'content',
        'avatar',
        'rating',
        'is_active',
    ];
    //
}
