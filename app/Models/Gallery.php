<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Gallery extends Model
{
    use HasUuids;
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
