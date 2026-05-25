<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tenant;

class BalanceEntry extends Model
{
    protected $fillable = [
        'tenant_id',
        'amount',
        'description',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
