<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantController extends Controller
{
    Public function index(){
        return Inertia::render('Tenants/Index', []);
    }

    public function create(){
        return Inertia::render('Tenants/Create');
    }
}
