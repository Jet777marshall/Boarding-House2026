<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Billing;

class BillingController extends Controller
{
    public function index(){
         return Inertia::render('Billings/Index', []);
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
