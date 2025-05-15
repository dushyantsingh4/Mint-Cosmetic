<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ShippingDetail extends Model
{
    protected $table = 'shipping_details';
    protected $fillable = [
        'order_id',
        'name',
        'phone',
        'address',
        'city',
        'pincode',
        'state',
    ];
}
