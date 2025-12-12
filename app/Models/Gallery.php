<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Gallery extends Model
{
    protected $fillable = [
        'type',
        'title',
        'url',
        'thumbnail',
        'category',
        'activity_id',
    ];

    public function activity()
    {
        return $this->belongsTo(\App\Models\Activity::class);
    }
}
