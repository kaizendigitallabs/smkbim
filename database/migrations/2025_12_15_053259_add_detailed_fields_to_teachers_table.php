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
        Schema::table('teachers', function (Blueprint $table) {
            $table->string('nip')->nullable()->unique();
            $table->string('nuptk')->nullable()->unique();
            $table->enum('gender', ['L', 'P'])->nullable();
            $table->string('place_of_birth')->nullable();
            $table->date('date_of_birth')->nullable();
            $table->text('address')->nullable();
            $table->string('last_education')->nullable();
            $table->string('education_major')->nullable();
            $table->string('university')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('teachers', function (Blueprint $table) {
            $table->dropColumn([
                'nip',
                'nuptk',
                'gender',
                'place_of_birth',
                'date_of_birth',
                'address',
                'last_education',
                'education_major',
                'university'
            ]);
        });
    }
};
