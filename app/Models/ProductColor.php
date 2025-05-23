<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductColor extends Model
{
    protected $table = 'product_colors';

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function color()
    {
        return $this->belongsTo(Color::class);
    }

    public function images()
    {
        return $this->hasMany(Image::class, 'product_color_id');
    }

    public function previewImages()
    {
        return $this->hasMany(Image::class, 'product_color_id')->orderBy('id')->limit(2);
    }

}
