<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $fillable = [
        'category_id',
        'product_name',
        'slug',
        'description',
        'price',
        'discount_price',
        'stock_quantity',
        'image',
        'meta_title',
        'meta_description',
        'meta_keywords',
        'status',
        'priority',
    ];

    /**
     * Create a slug from the product name.
     *
     * @param string $value
     * @return void
     */
    public static function boot()
    {
        parent::boot();

        static::saving(function ($product) {
            $product->slug = Str::slug($product->product_name);
        });
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function colors()
    {
        return $this->belongsToMany(Color::class, 'product_colors');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class);
    }

    public function productColors()
    {
        return $this->hasMany(ProductColor::class);
    }

    public function productImages(){
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function previewImages(){
        return $this->hasMany(ProductImage::class, 'product_id')->orderBy('id')->limit(2);
    }
}
