<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use App\Models\Payments;

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

    public function store(Request $request)
    {
        $data = $request->validate([
            'tenant_id'        => 'required|exists:tenants,id',
            'billing_id'       => 'required|exists:billings,id',
            'amount'           => 'required|numeric|min:0',
            'reference_number' => 'nullable|string|max:255',
            'verified_by'      => 'nullable|string|max:255',
            'status'           => 'nullable|string|max:255',
            'payment_method'   => 'nullable|string',
        ]);

        // Hash the reference number if it's present
        if (!empty($data['reference_number'])) {
            $data['reference_number'] = Hash::make($data['reference_number']);
        }

        Payments::create($data);
        return redirect()->route('payments.index')->with('message', 'Payment recorded successfully.');
    }

}
