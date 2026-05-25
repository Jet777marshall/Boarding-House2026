<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tenant;
use App\Models\BalanceEntry;

class BalanceEntryController extends Controller
{
    public function index(){
        $tenants = Tenant::with(['balanceEntries'])->get();

        return Inertia::render('Balance_Entries/Index', [
            'tenants' => $tenants,
        ]);
    }

    public function create(Request $request){
        $tenant_id = $request->query('tenant_id');
        return Inertia::render('Balance_Entries/Create', [
            'tenant_id' => $tenant_id,
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'amount' => 'required|numeric',
            'description' => 'nullable|string|max:255',
        ]);

        BalanceEntry::create([
            'tenant_id' => $request->tenant_id,
            'amount' => $request->amount,
            'description' => $request->description,
        ]);

        return redirect()->route('balance_entries.index')->with('message', 'Balance entry created successfully.');
    }

    public function edit(BalanceEntry $balance_entry){
        return Inertia::render('Balance_Entries/Edit', compact('balance_entry'));
    }

    public function update(Request $request, BalanceEntry $balance_entry){
        $request->validate([
            'tenant_id' => 'required|exists:tenants,id',
            'amount' => 'required|numeric',
            'description' => 'nullable|string|max:255',
        ]);

        $balance_entry->update([
            'tenant_id' => $request->tenant_id,
            'amount' => $request->amount,
            'description' => $request->description,
        ]);

        return redirect()->route('balance_entries.index')->with('message', 'Balance entry updated successfully.');
    }

    public function removed(BalanceEntry $balance_entry){
        $balance_entry->delete();

        return redirect()->route('balance_entries.index')->with('message', 'Balance entry removed successfully.');
    }

}
