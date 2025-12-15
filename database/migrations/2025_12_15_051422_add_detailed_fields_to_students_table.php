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
        Schema::table('students', function (Blueprint $table) {
            $table->string('religion')->nullable();
            $table->string('father_name')->nullable();
            $table->string('mother_name')->nullable();
            $table->string('guardian_name')->nullable();
            $table->string('father_job')->nullable();
            $table->string('mother_job')->nullable();
            $table->string('guardian_job')->nullable();
            $table->string('previous_school')->nullable();
            $table->string('entry_year', 4)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('students', function (Blueprint $table) {
            $table->dropColumn([
                'religion',
                'father_name',
                'mother_name',
                'guardian_name',
                'father_job',
                'mother_job',
                'guardian_job',
                'previous_school',
                'entry_year'
            ]);
        });
    }
};
