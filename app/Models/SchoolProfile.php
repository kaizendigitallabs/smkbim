<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SchoolProfile extends Model
{
    use HasUuids;
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
        'instagram',
        'youtube',
        'accreditation_grade',
        'accreditation_label',
    ];
}
