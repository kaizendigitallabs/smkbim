<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolProfile extends Model
{
    protected $fillable = [
        'name',
        'description',
        'vision',
        'mission',
        'history',
        'address',
        'phone',
        'email',
        'whatsapp',
        'logo',
        'maps_embed_link',
        'operating_hours',
        'facebook',
        'instagram',
        'youtube',
    ];
}
