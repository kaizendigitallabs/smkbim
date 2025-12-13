<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{
    protected $fillable = [
        'name',
        'position',
        'subject',
        'contact',
        'photo',
        'is_active',
        'order',
        'user_id',
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
