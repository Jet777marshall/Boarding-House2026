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

        return redirect()->route('billings.index');
    }


}
