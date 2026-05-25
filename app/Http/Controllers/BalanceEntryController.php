<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Tenant;

class BalanceEntryController extends Controller
{
    public function index(){
        $tenants = Tenant::with(['balanceEntries'])->get();

        return Inertia::render('Balance_Entries/Index', [
            'tenants' => $tenants,
        ]);
    }

}
