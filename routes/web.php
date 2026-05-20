<?php
use App\Http\Controllers\BillingController;
use App\Http\Controllers\TenantController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('/tenants', [TenantController::class , 'index'])->name('tenants.index');
    Route::post('/tenants', [TenantController::class , 'store'])->name('tenants.store');
    Route::get('/tenants/create', [TenantController::class, 'create'])->name('tenants.create');
    Route::get('/tenants/{tenant}/edit', [TenantController::class, 'edit'])->name('tenants.edit');
    Route::patch('/tenants/{tenant}', [TenantController::class, 'update'])->name('tenants.update');
    Route::patch('/tenants/{tenant}/removed', [TenantController::class, 'removed'])->name('tenants.removed');
    Route::get('/billings', [BillingController::class, 'index'])->name('billings.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
