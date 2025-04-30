<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
        'image',
        'product_color_id',
    ];

    public function productColor()
    {
        return $this->belongsTo(ProductColor::class, 'product_color_id');
    }

    public function product()
    {
        return $this->productColor ? $this->productColor->product : null;
    }

    public function color()
    {
        return $this->productColor ? $this->productColor->color : null;
    }
}
