<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Billing;
use App\Models\BalanceEntry;
use App\Models\Tenant_balances;
use App\Models\User;

class Tenant extends Model
{
    protected $fillable = [
    'user_id',
    'full_name',
    'company_name',
    'emergency_contact_number',
    'email',
    'personal_number',
    'password',
    'address',
    'birthdate',
    'status',
];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function billings()
    {
        return $this->hasMany(Billing::class);
    }

    public function balanceEntries()
    {
        return $this->hasMany(BalanceEntry::class);
    }

    public function tenantBalance()
    {
        return $this->hasOne(Tenant_balances::class, 'tenant_id');
    }
}
