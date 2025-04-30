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
        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('category_name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->text('meta_description')->nullable();
            $table->text('meta_keywords')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->boolean('show_in_menu')->default(true);
            $table->foreignId('parent_id')->nullable()->constrained('categories');
            $table->integer('priority')->default(0);
            $table->enum('category_type', ['standard', 'promotion', 'featured'])->default('standard');
            $table->timestamps();
            $table->index(['category_name', 'slug']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
