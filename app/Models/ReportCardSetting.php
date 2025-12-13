<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportCardSetting extends Model
{
    use HasFactory;

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
