<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Color extends Model
{
    protected $fillable = [
        'name',
        'hex_code'
    ];

    public function productColors()
    {
        return $this->hasMany(ProductColor::class);
    }
    
    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_colors');
    }
}
