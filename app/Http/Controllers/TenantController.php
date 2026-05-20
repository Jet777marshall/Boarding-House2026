<?php

namespace App\Http\Controllers;

use App\Models\Tenant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class TenantController extends Controller
{
    Public function index(){
        $tenants = Tenant::all();
        return Inertia::render('Tenants/Index', compact('tenants'));
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

        Tenant::create([
            'user_id' => Auth::id(), // ← Gets the logged-in user's ID
            'full_name' => $request->full_name,
            'company_name' => $request->company_name,
            'emergency_contact_number' => $request->emergency_contact_number,
            'email' => $request->email,
            'personal_number' => $request->personal_number,
            'password' => Hash::make($request->password), // ← Always hash passwords
            'address' => $request->address,
            'birthdate' => $request->birthdate,
        ]);

        return redirect()->route('tenants.index')->with('message', 'Tenant registered successfully.');
    }

    public function edit(Tenant $tenant)
    {
        return Inertia::render('Tenants/Edit', compact('tenant'));
    }

    public function update(Request $request, Tenant $tenant)
    {
        $request->validate([
            'full_name' => 'required|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'emergency_contact_number' => 'nullable|string|max:20',
            'email' => 'required|email|unique:tenants,email,' . $tenant->id, // ← Ignore current tenant's email
            'personal_number' => 'nullable|string|max:20',
            'password' => 'nullable|string|min:8|confirmed', // ← nullable so user can skip changing password
            'address' => 'nullable|string|max:255',
            'birthdate' => 'nullable|date',
        ]);

        $data = [
            'full_name' => $request->full_name,
            'company_name' => $request->company_name,
            'emergency_contact_number' => $request->emergency_contact_number,
            'email' => $request->email,
            'personal_number' => $request->personal_number,
            'address' => $request->address,
            'birthdate' => $request->birthdate,
        ];

        // Only update password if a new one is provided
        if ($request->filled('password')) {
            $data['password'] = Hash::make($request->password);
        }

        $tenant->update($data);

        return redirect()->route('tenants.index')->with('message', 'Tenant updated successfully.');
    }

    public function removed(Tenant $tenant)
    {
        $tenant->update([
            'status' => 'removed'
        ]);

        return redirect()->route('tenants.index')->with('message', 'Tenant removed successfully.');
    }
}
