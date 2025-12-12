<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            // Remove AdSense fields
            $table->dropColumn([
                'google_adsense_client',
                'google_adsense_slot_header',
                'google_adsense_slot_sidebar',
                'google_adsense_slot_footer',
                'enable_ads',
            ]);
            
            // Add Popup Banner fields
            $table->string('popup_banner_image')->nullable()->after('facebook_pixel_id');
            $table->string('popup_banner_url')->nullable();
            $table->boolean('enable_popup_banner')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('site_settings', function (Blueprint $table) {
            // Restore AdSense fields
            $table->string('google_adsense_client')->nullable();
            $table->string('google_adsense_slot_header')->nullable();
            $table->string('google_adsense_slot_sidebar')->nullable();
            $table->string('google_adsense_slot_footer')->nullable();
            $table->boolean('enable_ads')->default(false);
            
            // Remove Popup Banner fields
            $table->dropColumn([
                'popup_banner_image',
                'popup_banner_url',
                'enable_popup_banner',
            ]);
        });
    }
};
