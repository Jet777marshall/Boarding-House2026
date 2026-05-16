<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
];
}
