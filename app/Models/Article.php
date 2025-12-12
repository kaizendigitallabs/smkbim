<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
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
