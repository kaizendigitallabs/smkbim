<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class ReportCardSetting extends Model
{
    use HasUuids;
    use HasFactory, HasUuids;

    protected $fillable = [
        'semester',
        'academic_year',
        'headmaster_name',
        'headmaster_nuks',
        'logo_watermark',
        'school_address',
        'city',
        'report_date',
        'footer_text',
    ];

    /**
     * Get the current active settings
     * Assumes only one row exists
     */
    public static function current()
    {
        return self::first();
    }
}
