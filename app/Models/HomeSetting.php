<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class HomeSetting extends Model
{
    use HasUuids;
    use HasFactory, HasUuids;

    protected $fillable = [
        'hero_title',
        'hero_subtitle',
        'hero_description',
        'hero_image',
        'about_title',
        'about_description',
        'cta_title',
        'cta_text',
        'cta_primary_btn_text',
        'cta_primary_btn_url',
        'cta_secondary_btn_text',
        'cta_secondary_btn_text',
        'cta_secondary_btn_url',
        // Hero Bullets
        'hero_feature_1',
        'hero_feature_2',
        'hero_feature_3',
        // Metrics
        'metric_1_label',
        'metric_1_value',
        'metric_2_label',
        'metric_2_value',
        'metric_3_label',
        'metric_3_value',
        // Feature Cards
        'feature_1_title',
        'feature_1_description',
        'feature_2_title',
        'feature_2_description',
        'feature_3_title',
        'feature_3_description',

    ];
    //
}
