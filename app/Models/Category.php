<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = 'categories';
    protected $primaryKey = 'id';
    protected $fillable = [
        'category_name',
        'slug',
        'description',
        'image',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'status',
        'show_in_menu',
        'parent_id',
        'priority',
        'category_type',
    ];

    /**
     * Create a slug from the category name.
     *
     * @param string $value
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::saving(function ($category) {
            $category->slug = Str::slug($category->category_name);
        });
    }

    public function parent(){
        return $this->belongsTo(Category::class, 'parent_id');
    }

    public function children(){
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function products(){
        return $this->hasMany(Product::class);
    }
}
