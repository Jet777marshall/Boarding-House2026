<?php

namespace App\Console\Commands;

use App\Models\Billing;
use App\Models\Tenant;
use App\Models\Tenant_balances;
use App\Models\BalanceEntry;
use Carbon\Carbon;
use Illuminate\Console\Command;

class GenerateMonthlyBillings extends Command
{
    protected $signature   = 'billings:generate-monthly';
    protected $description = 'Auto-generate monthly billing for all active tenants';

    public function handle(): void
    {
        $today = Carbon::today();

        Tenant::where('status', '!=', 'removed')->each(function ($tenant) use ($today) {
            $billingDay = optional($tenant->user)->billing_day;

            if (is_null($billingDay)) {
                $firstBilling = Billing::where('tenant_id', $tenant->id)
                    ->where('status', '!=', 'removed')
                    ->oldest('due_date')
                    ->first();

                if (!$firstBilling) {
                    return;
                }

                $billingDay = Carbon::parse($firstBilling->due_date)->day;
            }

            if ($today->day !== (int) $billingDay) {
                return;
            }

            $dueDate = Carbon::create($today->year, $today->month, min((int) $billingDay, $today->daysInMonth))->startOfDay();

            $exists = Billing::where('tenant_id', $tenant->id)
                ->whereYear('due_date', $dueDate->year)
                ->whereMonth('due_date', $dueDate->month)
                ->where('status', '!=', 'removed')
                ->exists();

            if ($exists) {
                return;
            }

            $billingAmount = optional($tenant->user)->billing_amount;

            if (is_null($billingAmount)) {
                $lastBilling = Billing::where('tenant_id', $tenant->id)
                    ->where('status', '!=', 'removed')
                    ->latest('due_date')
                    ->first();

                if (!$lastBilling) {
                    return;
                }

                $billingAmount = $lastBilling->amount;
            }

            Billing::create([
                'tenant_id'   => $tenant->id,
                'amount'      => $billingAmount,
                'due_date'    => $dueDate->toDateString(),
                'description' => 'Monthly billing — ' . $dueDate->format('F Y'),
                'status'      => 'pending',
            ]);

            $this->recalculateBalance($tenant->id);

            $this->info("Billed: {$tenant->full_name} — ₱{$billingAmount}");
        });

        $this->info('Done!');
    }

    private function recalculateBalance(int $tenantId): void
    {
        $totalBilled = Billing::where('tenant_id', $tenantId)
            ->where('status', '!=', 'removed')->sum('amount');

        $totalPaid = BalanceEntry::where('tenant_id', $tenantId)->sum('amount');

        $balance = Tenant_balances::firstOrCreate(
            ['tenant_id' => $tenantId],
            ['total_balance' => 0, 'last_updated' => now()]
        );

        $balance->total_balance = $totalBilled - $totalPaid;
        $balance->last_updated  = now();
        $balance->save();
    }
}