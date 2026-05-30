<?php
use App\Http\Controllers\BillingController;
use App\Http\Controllers\TenantController;
use App\Http\Controllers\BalanceEntryController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    //tenants routes
    Route::get('/tenants', [TenantController::class , 'index'])->name('tenants.index');
    Route::post('/tenants', [TenantController::class , 'store'])->name('tenants.store');
    Route::get('/tenants/create', [TenantController::class, 'create'])->name('tenants.create');
    Route::get('/tenants/{tenant}/edit', [TenantController::class, 'edit'])->name('tenants.edit');
    Route::patch('/tenants/{tenant}', [TenantController::class, 'update'])->name('tenants.update');
    Route::patch('/tenants/{tenant}/removed', [TenantController::class, 'removed'])->name('tenants.removed');

    //billings routes
    Route::get('/billings', [BillingController::class, 'index'])->name('billings.index');
    Route::post('/billings', [BillingController::class, 'store'])->name('billings.store');
    Route::get('/billings/create', [BillingController::class, 'create'])->name('billings.create');
    Route::get('/billings/{billing}/edit', [BillingController::class, 'edit'])->name('billings.edit');
    Route::patch('/billings/{billing}', [BillingController::class, 'update'])->name('billings.update');
    Route::patch('/billings/{billing}/removed', [BillingController::class, 'removed'])->name('billings.removed');

    //balance entry routes
    Route::get('/balance_entries', [BalanceEntryController::class, 'index'])->name('balance_entries.index');
    Route::post('/balance_entries', [BalanceEntryController::class, 'store'])->name('balance_entries.store');
    Route::get('/balance_entries/create', [BalanceEntryController::class, 'create'])->name('balance_entries.create');
    Route::get('/balance_entries/{balance_entry}/edit', [BalanceEntryController::class, 'edit'])->name('balance_entries.edit');
    Route::patch('/balance_entries/{balance_entry}', [BalanceEntryController::class, 'update'])->name('balance_entries.update');
    Route::patch('/balance_entries/{balance_entry}/removed', [BalanceEntryController::class, 'removed'])->name('balance_entries.removed');


    //payment routes
    Route::get('/payments', [PaymentController::class, 'index'])->name('payments.index');
    Route::post('/payments', [PaymentController::class, 'store'])->name('payments.store');
    Route::get('/payments/create', [PaymentController::class, 'create'])->name('payments.create');
    Route::get('/payments/{payment}/edit', [PaymentController::class, 'edit'])->name('payments.edit');
    Route::patch('/payments/{payment}', [PaymentController::class, 'update'])->name('payments.update');
    Route::patch('/payments/{payment}/removed', [PaymentController::class, 'removed'])->name('payments.removed');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
