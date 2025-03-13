<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FeatureFlagModel extends Model
{
    //
    protected $table = "feature_flags";

    protected $fillable = [
        'user_id',
        'display_name',
        'key',
        'is_on'
    ];
}
