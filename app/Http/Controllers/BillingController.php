<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Billing;
use App\Models\Tenant;
use App\Models\Tenant_balances;
use App\Models\BalanceEntry; // ← added

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

    public function store(Request $request)
    {
        $data = $request->validate([
            'tenant_id'   => 'required|exists:tenants,id',
            'due_date'    => 'required|date',
            'amount'      => 'required|numeric|min:0',
            'description' => 'nullable|string',
            'months'      => 'nullable|integer|min:1|max:24',
        ]);

        $startDate = \Carbon\Carbon::parse($data['due_date']);
        $months    = $data['months'] ?? 1;

        for ($i = 0; $i < $months; $i++) {
            $dueDate = $startDate->copy()->addMonths($i);

            $exists = Billing::where('tenant_id', $data['tenant_id'])
                ->whereYear('due_date', $dueDate->year)
                ->whereMonth('due_date', $dueDate->month)
                ->where('status', '!=', 'removed')
                ->exists();

            if ($exists) continue;

            Billing::create([
                'tenant_id'   => $data['tenant_id'],
                'due_date'    => $dueDate->toDateString(),
                'amount'      => $data['amount'],
                'description' => $data['description'] ?? 'Monthly billing — ' . $dueDate->format('F Y'),
                'status'      => 'pending',
            ]);
        }

        $this->recalculateBalance($data['tenant_id']); // ← replaces old balance block

        return redirect()->route('billings.index')->with('message', 'Monthly billings generated successfully.');
    }

    public function removed(Billing $billing)
    {
        $tenantId = $billing->tenant_id;

        $billing->update(['status' => 'removed']);

        $this->recalculateBalance($tenantId); // ← added

        return redirect()->route('billings.index')->with('message', 'Billing removed successfully.');
    }

    public function update(Request $request, Billing $billing)
    {
        $data = $request->validate([
            'due_date'    => 'required|date',
            'amount'      => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ]);

        $billing->update($data);

        $this->recalculateBalance($billing->tenant_id); // ← added

        return redirect()->route('billings.index')->with('message', 'Billing updated successfully.');
    }

    public function edit(Billing $billing)
    {
        return Inertia::render('Billings/Edit', compact('billing'));
    }

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

        $balance->total_balance = $totalBilled - $totalPaid;
        $balance->last_updated  = now();
        $balance->save();
    }
}