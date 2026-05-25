<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Billing;
use App\Models\BalanceEntry;

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

    public function billings()
    {
        return $this->hasMany(Billing::class);
    }

    public function balanceEntries()
    {
        return $this->hasMany(BalanceEntry::class);
    }
}
