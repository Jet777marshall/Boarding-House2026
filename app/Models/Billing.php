<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Tenant;

class Billing extends Model
{
    protected $fillable = [
        'tenant_id',
        'amount',
        'due_date',
        'description',
        'status',
    ];

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }
}
