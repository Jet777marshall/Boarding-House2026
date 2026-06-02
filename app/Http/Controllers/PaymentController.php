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
        $payments = \App\Models\Payments::with('tenant')
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($payment) {
                return [
                    'id'               => $payment->id,
                    'tenant_id'        => $payment->tenant_id,
                    'full_name'        => $payment->tenant?->full_name ?? 'N/A',
                    'billing_id'       => $payment->billing_id,
                    'amount'           => $payment->amount,
                    'payment_method'   => $payment->payment_method,
                    'reference_number' => $payment->reference_number,
                    'verified_by'      => $payment->verified_by,
                    'status'           => $payment->status,
                    'payment_date'     => $payment->payment_date,
                    'created_at'       => $payment->created_at,
                ];
            });

        return Inertia::render('Payments/Index', [
            'payments' => $payments,
        ]);
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
            'payment_date' => 'nullable|date_format:Y-m-d H:i:s',
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
