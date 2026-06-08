<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tenant_balances extends Model
{
   public $timestamps = false; // ← table has no created_at/updated_at

    protected $table = 'tenant_balances';

    protected $fillable = [
        'tenant_id',
        'total_balance', // ← lowercase t
        'last_updated',  // ← matches your DB column
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
