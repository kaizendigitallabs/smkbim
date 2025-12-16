<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Download extends Model
{
    use HasUuids;
    protected $fillable = [
        'name',
        'description',
        'category',
        'file_path',
    ];

    protected $appends = ['file_url'];

    /**
     * Get the file URL accessor
     */
    protected function fileUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => $this->file_path ? asset('storage/' . $this->file_path) : null,
        );
    }
}
