<?php

namespace App\Helpers;

use App\Models\General;

class GeneralHelper
{
    public static function get_general()
    {
        return General::first();
    }
}
