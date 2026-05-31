<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    public function index()
    {
        return Inertia::render('Payments/Index',[]);
    }

   public function create()
{
    $tenants = \App\Models\Tenant::with('billings') // or 'billing' depending on relationship
        ->select('id', 'full_name')
        ->get()
        ->map(function ($tenant) {
            return [
                'id' => $tenant->id,
                'full_name' => $tenant->full_name,
                'billing_id' => $tenant->billings->first()?->id ?? null,
                // adjust if it's hasOne: $tenant->billing?->id
            ];
        });

    return Inertia::render('Payments/Create', [
        'tenants' => $tenants,
    ]);
}
}
