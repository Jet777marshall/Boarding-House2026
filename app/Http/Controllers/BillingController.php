<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Billing;
use App\Models\Tenant;

class BillingController extends Controller
{
    public function index(){
            $tenants = Tenant::with(['billings' => function($q){ $q->latest(); }])->get();
            return Inertia::render('Billings/Index', [
               'tenants' => $tenants,
            ]);
    }

    public function create(){
        return Inertia::render('Billings/Create', [
            'tenant_id' => request()->query('tenant_id'),
        ]);
    }

    public function store(Request $request){
        $data = $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'due_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        Billing::create($data);
        return redirect()->route('billings.index')->with('message', 'Billing created successfully.');
    }

    public function removed(Billing $billing)
    {
        $billing->update([
            'status' => 'removed'
        ]);

        return redirect()->route('billings.index')->with('message', 'Billing removed successfully.');
    }

    public function update(Request $request, Billing $billing)
    {
        $data = $request->validate([
            'due_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $billing->update($data);
        return redirect()->route('billings.index')->with('message', 'Billing updated successfully.');
    }

    public function edit(Billing $billing)
    {
       return Inertia::render('Billings/Edit', compact('billing'));
    }




}
