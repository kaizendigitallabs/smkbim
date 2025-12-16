<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PPDBSetting extends Model
{
    use HasUuids;
    protected $table = 'ppdb_settings';
    
    protected $fillable = [
        'key',
        'value',
    ];
}
