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
        Schema::table('subjects', function (Blueprint $table) {
            $table->integer('display_order')->default(0)->after('name');
            $table->enum('subject_group', ['A', 'B', 'C'])->default('A')->after('display_order')
                ->comment('A: Umum, B: Kejuruan, C: Mulok');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            $table->dropColumn(['display_order', 'subject_group']);
        });
    }
};
