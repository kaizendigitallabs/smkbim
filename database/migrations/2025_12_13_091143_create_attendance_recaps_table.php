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
        Schema::create('attendance_recaps', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid('student_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('class_id')->constrained('classes')->onDelete('cascade');
            $table->string('month', 7); // Format: YYYY-MM
            $table->string('semester', 10); // Ganjil/Genap
            $table->string('academic_year', 10); // e.g., 2024/2025
            $table->integer('present')->default(0);
            $table->integer('sick')->default(0);
            $table->integer('permission')->default(0);
            $table->integer('absent')->default(0);
            $table->foreignUuid('recorded_by')->constrained('users')->onDelete('cascade');
            $table->timestamps();
            
            // Unique constraint: one recap per student per month
            $table->unique(['student_id', 'class_id', 'month']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attendance_recaps');
    }
};
