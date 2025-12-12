<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HomeSetting extends Model
{
    use HasFactory;

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
        'cta_secondary_btn_url',
    ];
    //
}
