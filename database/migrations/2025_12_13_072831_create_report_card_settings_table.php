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
        Schema::create('report_card_settings', function (Blueprint $table) {
            $table->id();
            $table->string('headmaster_name');
            $table->string('headmaster_nip')->nullable();
            $table->string('school_address');
            $table->string('school_phone')->nullable();
            $table->string('school_email')->nullable();
            $table->string('city'); // Kota untuk titimangsa
            $table->string('semester'); // Current active semester (Ganjil/Genap)
            $table->string('academic_year'); // Current active academic year (2024/2025)
            $table->text('footer_text')->nullable(); // Catatan tambahan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_card_settings');
    }
};
