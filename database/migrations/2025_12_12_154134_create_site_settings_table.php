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
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            
            // General
            $table->string('site_logo')->nullable();
            $table->string('site_favicon')->nullable();
            $table->string('site_name')->nullable();
            $table->text('site_description')->nullable();
            $table->text('site_keywords')->nullable();
            $table->string('meta_author')->nullable();
            
            // Footer
            $table->text('footer_about_text')->nullable();
            $table->string('footer_contact_email')->nullable();
            $table->string('footer_contact_phone')->nullable();
            $table->text('footer_contact_address')->nullable();
            $table->string('footer_social_facebook')->nullable();
            $table->string('footer_social_instagram')->nullable();
            $table->string('footer_social_youtube')->nullable();
            $table->string('footer_social_twitter')->nullable();
            
            // SEO
            $table->string('google_analytics_id')->nullable();
            $table->text('google_search_console')->nullable();
            $table->string('facebook_pixel_id')->nullable();
            
            // Ads
            $table->string('google_adsense_client')->nullable();
            $table->string('google_adsense_slot_header')->nullable();
            $table->string('google_adsense_slot_sidebar')->nullable();
            $table->string('google_adsense_slot_footer')->nullable();
            $table->boolean('enable_ads')->default(false);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
