<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Article extends Model
{
    use HasUuids;
    protected $fillable = [
        'category',
        'title',
        'slug',
        'content',
        'meta_title',
        'meta_description',
        'tags',
        'status',
        'cover_image',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
    ];
}
