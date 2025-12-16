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
        Schema::table('home_settings', function (Blueprint $table) {
            // Hero Bullets
            $table->string('hero_feature_1')->nullable()->after('hero_image');
            $table->string('hero_feature_2')->nullable()->after('hero_feature_1');
            $table->string('hero_feature_3')->nullable()->after('hero_feature_2');

            // Metrics (Sekilas Info)
            $table->string('metric_1_label')->nullable()->after('hero_feature_3'); // e.g. Siswa Aktif
            $table->string('metric_1_value')->nullable()->after('metric_1_label'); // e.g. 500+
            $table->string('metric_2_label')->nullable()->after('metric_1_value');
            $table->string('metric_2_value')->nullable()->after('metric_2_label');
            $table->string('metric_3_label')->nullable()->after('metric_2_value');
            $table->string('metric_3_value')->nullable()->after('metric_3_label');

            // Feature Cards (Sekilas Info)
            $table->string('feature_1_title')->nullable()->after('metric_3_value');
            $table->text('feature_1_description')->nullable()->after('feature_1_title');
            // $table->string('feature_1_icon')->nullable(); // Using lucide name string

            $table->string('feature_2_title')->nullable()->after('feature_1_description');
            $table->text('feature_2_description')->nullable()->after('feature_2_title');

            $table->string('feature_3_title')->nullable()->after('feature_2_description');
            $table->text('feature_3_description')->nullable()->after('feature_3_title');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('home_settings', function (Blueprint $table) {
            //
        });
    }
};
