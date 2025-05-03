<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    public function productColor()
    {
        return $this->belongsTo(ProductColor::class);
    }
}
