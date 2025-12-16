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
        Schema::create('grades', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid('student_id')->constrained()->onDelete('cascade');
            $table->foreignUuid('subject_teacher_assignment_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['daily', 'daily_exam', 'midterm', 'final']); // harian, ujian_harian, UTS, UAS
            $table->decimal('score', 5, 2); // Nilai 0-100
            $table->string('description')->nullable(); // Keterangan (untuk daily/daily_exam)
            $table->date('date'); // Tanggal nilai
            $table->string('semester'); // Ganjil/Genap
            $table->string('academic_year'); // 2024/2025
            $table->timestamps();
            
            $table->index(['student_id', 'subject_teacher_assignment_id', 'type']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grades');
    }
};
