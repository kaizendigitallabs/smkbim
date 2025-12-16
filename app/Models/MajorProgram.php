<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class MajorProgram extends Model
{
    use HasUuids;
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
