<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SchoolProgram extends Model
{
    use HasUuids;
    protected $fillable = [
        'title',
        'description',
        'icon',
        'order',
    ];
}
