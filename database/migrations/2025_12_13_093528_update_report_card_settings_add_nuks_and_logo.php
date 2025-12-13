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
        Schema::table('report_card_settings', function (Blueprint $table) {
            // Rename headmaster_nip to headmaster_nuks
            $table->renameColumn('headmaster_nip', 'headmaster_nuks');
            
            // Add logo watermark field
            $table->string('logo_watermark')->nullable()->after('headmaster_nuks');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('report_card_settings', function (Blueprint $table) {
            // Rename back
            $table->renameColumn('headmaster_nuks', 'headmaster_nip');
            
            // Drop logo field
            $table->dropColumn('logo_watermark');
        });
    }
};
