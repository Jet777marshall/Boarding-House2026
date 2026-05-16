<?php

namespace App\Http\Controllers;

use app\model\Tenant;
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

    public function store(Request $request){
        $request->validate([
            'full_name' => 'required|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'emergency_contact_number' => 'nullable|string|max:20',
            'email' => 'required|email|unique:tenants,email',
            'personal_number' => 'nullable|string|max:20',
            'password' => 'required|string|min:8|confirmed',
            'address' => 'nullable|string|max:255',
            'birthdate' => 'nullable|date',
        ]);

        Tenant::create($request->all());
        return redirect()->route('tenants.index')->with('success', 'Tenant registered successfully.');
    }
}
