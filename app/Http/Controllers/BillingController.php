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
        return Inertia::render('Billings/Create', []);
    }

    public function store(Request $request){
        $request->validate([
            'due_date' => 'required|date',
            'amount' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        Billing::create($request->all());
        return redirect()->route('billings.index');
    }


}
