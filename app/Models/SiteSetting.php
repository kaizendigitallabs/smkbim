<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class SiteSetting extends Model
{
    use HasUuids;
    protected $fillable = [
        // General
        'site_logo',
        'site_favicon',
        'site_name',
        'site_description',
        'site_keywords',
        'meta_author',
        
        // Footer
        'footer_about_text',
        'footer_contact_email',
        'footer_contact_phone',
        'footer_contact_address',
        'footer_social_facebook',
        'footer_social_instagram',
        'footer_social_youtube',
        'footer_social_twitter',
        
        // SEO
        'google_analytics_id',
        'google_search_console',
        'facebook_pixel_id',
        
        // Popup Banner
        'popup_banner_image',
        'popup_banner_url',
        'enable_popup_banner',
    ];

    protected $casts = [
        'enable_popup_banner' => 'boolean',
    ];
}
