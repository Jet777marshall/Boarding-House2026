<?php

use App\Models\Billing;
use App\Models\Tenant;
use App\Models\Tenant_balances;
use App\Models\User;
use Illuminate\Support\Carbon;

it('uses the linked user billing settings when generating monthly billings', function () {
    Carbon::setTestNow(Carbon::create(2026, 7, 20));

    $user = User::create([
        'name' => 'Admin User',
        'email' => 'admin-' . uniqid() . '@example.test',
        'password' => bcrypt('password123'),
        'billing_amount' => 2500.00,
        'billing_day' => 20,
    ]);

    $tenant = Tenant::create([
        'user_id' => $user->id,
        'full_name' => 'Tenant ' . uniqid(),
        'company_name' => 'Company',
        'emergency_contact_number' => '123456789',
        'email' => 'tenant-' . uniqid() . '@example.test',
        'personal_number' => (string) uniqid(),
        'password' => bcrypt('password123'),
        'address' => 'Address',
        'birthdate' => '2000-01-01',
        'status' => 'active',
    ]);

    Billing::create([
        'tenant_id' => $tenant->id,
        'amount' => 1000.00,
        'due_date' => '2026-06-01',
        'description' => 'Previous billing',
        'status' => 'paid',
    ]);

    $this->artisan('billings:generate-monthly')->assertSuccessful();

    $billing = Billing::where('tenant_id', $tenant->id)
        ->whereYear('due_date', 2026)
        ->whereMonth('due_date', 7)
        ->latest('due_date')
        ->first();

    expect($billing)->not->toBeNull()
        ->and($billing->amount)->toEqual(2500.00)
        ->and($billing->due_date->toDateString())->toBe('2026-07-20');

    $balance = Tenant_balances::where('tenant_id', $tenant->id)->first();
    expect($balance)->not->toBeNull()
        ->and($balance->total_balance)->toBe(3500.00);
});
