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
        Schema::create('attitude_grades', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid('student_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('class_id')->constrained('classes')->onDelete('cascade');
            $table->enum('aspect', ['spiritual', 'social']); // Spiritual, Sosial
            $table->enum('grade', ['A', 'B', 'C', 'D']); // Predikat
            $table->text('description')->nullable(); // Deskripsi
            $table->string('semester');
            $table->string('academic_year');
            $table->foreignUuid('teacher_id')->constrained('users'); // Wali kelas yang input
            $table->timestamps();
            
            $table->unique(['student_id', 'aspect', 'semester', 'academic_year'], 'unique_student_aspect_semester');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attitude_grades');
    }
};
