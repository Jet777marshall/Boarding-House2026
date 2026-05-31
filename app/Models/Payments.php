<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tenant;
use App\Models\Billing;

class Payments extends Model
{
      protected $fillable = [
        'tenant_id',
        'billing_id',
        'amount',
        'payment_method',
        'reference_number',
        'verified_by',
        'status',
    
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

     public function billing()
    {
        return $this->belongsTo(Billing::class);
    }
}
