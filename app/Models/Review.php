<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'customer_id',
        'product_id',
        'title',
        'rating',
        'comment',
        'verified_purchase',
        'status'
    ];

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function product(){
        return $this->belongsTo(Product::class);
    }

    public function scopeApproved($query){
        return $query->where('status', 'approved');
    }

}
