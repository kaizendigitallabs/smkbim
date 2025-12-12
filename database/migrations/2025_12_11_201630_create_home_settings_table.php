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
        Schema::create('home_settings', function (Blueprint $table) {
            $table->id();
            // Hero
            $table->string('hero_title')->nullable();
            $table->string('hero_subtitle')->nullable(); // Short text above title
            $table->text('hero_description')->nullable();
            $table->string('hero_image')->nullable();
            
            // About (Specific to Home)
            $table->string('about_title')->nullable();
            $table->text('about_description')->nullable();
            
            // CTA
            $table->string('cta_title')->nullable();
            $table->text('cta_text')->nullable();
            $table->string('cta_primary_btn_text')->default('Daftar PPDB Sekarang');
            $table->string('cta_primary_btn_url')->default('/ppdb');
            $table->string('cta_secondary_btn_text')->default('Hubungi Admin');
            $table->string('cta_secondary_btn_url')->default('/kontak');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('home_settings');
    }
};
