<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BalanceEntry;

class BalanceEntryController extends Controller
{
    public function index(){
        return Inertia::render('Balance_Entries/Index', []);
    }

}
