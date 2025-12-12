<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MajorProgram extends Model
{
    protected $fillable = [
        'major_id',
        'title',
        'description',
        'order',
    ];

    public function major()
    {
        return $this->belongsTo(Major::class);
    }
}
