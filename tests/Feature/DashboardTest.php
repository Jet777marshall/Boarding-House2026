<?php

use App\Models\Tenant;
use App\Models\Tenant_balances;
use App\Models\User;
use Inertia\Testing\AssertableInertia as AssertableInertia;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $this->actingAs($user = User::factory()->create());

    $this->get('/dashboard')->assertOk();
});

test('admin users do not see the tenant balance card', function () {
    $this->actingAs(User::factory()->create());

    $this->get('/dashboard')
        ->assertOk()
        ->assertDontSee('Total Balance');
});

test('tenant dashboard shows only the logged in tenant total balance', function () {
    $tenantUser = User::factory()->create();

    $tenant = Tenant::create([
        'user_id' => $tenantUser->id,
        'full_name' => 'Tenant One',
        'company_name' => 'Company One',
        'emergency_contact_number' => '123456789',
        'email' => 'tenant-one-' . uniqid() . '@example.test',
        'personal_number' => (string) uniqid(),
        'password' => bcrypt('password123'),
        'address' => 'Address',
        'birthdate' => '2000-01-01',
        'status' => 'active',
    ]);

    Tenant_balances::create([
        'tenant_id' => $tenant->id,
        'total_balance' => 1545.50,
        'last_updated' => now(),
    ]);

    $this->withSession(['tenant_id' => $tenant->id])
        ->actingAs($tenantUser)
        ->get('/dashboard')
        ->assertInertia(fn (AssertableInertia $page) =>
            $page->where('auth.tenant.id', $tenant->id)
                ->where('auth.tenant.total_balance', 1545.50)
        );
});