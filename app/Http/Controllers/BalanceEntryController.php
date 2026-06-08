<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tenant;
use App\Models\Billing;
use App\Models\BalanceEntry;
use App\Models\Tenant_balances;

class BalanceEntryController extends Controller
{
    public function index(){
        $tenants = Tenant::with(['balanceEntries' => function($q) { 
            $q->latest(); 
        }])->get();
        
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
            'tenant_id'   => 'required|exists:tenants,id',
            'amount'      => 'required|numeric',
            'description' => 'nullable|string|max:255',
        ]);

        BalanceEntry::create([
            'tenant_id'   => $request->tenant_id,
            'amount'      => $request->amount,
            'description' => $request->description,
        ]);

        $this->recalculateBalance($request->tenant_id); // ← added

        return redirect()->route('balance_entries.index')->with('message', 'Balance entry created successfully.');
    }

    public function edit(BalanceEntry $balance_entry){
        return Inertia::render('Balance_Entries/Edit', compact('balance_entry'));
    }

    public function update(Request $request, BalanceEntry $balance_entry){
        $request->validate([
            'tenant_id'   => 'required|exists:tenants,id',
            'amount'      => 'required|numeric',
            'description' => 'nullable|string|max:255',
        ]);

        $balance_entry->update([
            'tenant_id'   => $request->tenant_id,
            'amount'      => $request->amount,
            'description' => $request->description,
        ]);

        $this->recalculateBalance($request->tenant_id); // ← added

        return redirect()->route('balance_entries.index')->with('message', 'Balance entry updated successfully.');
    }

    public function removed(BalanceEntry $balance_entry){
        $tenantId = $balance_entry->tenant_id; // ← save before delete

        $balance_entry->delete();

        $this->recalculateBalance($tenantId); // ← added

        return redirect()->route('balance_entries.index')->with('message', 'Balance entry removed successfully.');
    }

    // ← recalculates total_balance from scratch every time
    private function recalculateBalance(int $tenantId): void
    {
        $totalBilled = Billing::where('tenant_id', $tenantId)
            ->where('status', '!=', 'removed')
            ->sum('amount');

        $totalPaid = BalanceEntry::where('tenant_id', $tenantId)
            ->sum('amount');

        $balance = Tenant_balances::firstOrCreate(
            ['tenant_id' => $tenantId],
            ['total_balance' => 0, 'last_updated' => now()]
        );

        $balance->total_balance = $totalBilled + $totalPaid;
        $balance->last_updated  = now();
        $balance->save();
    }
}