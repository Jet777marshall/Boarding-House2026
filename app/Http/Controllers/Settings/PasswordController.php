<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Models\Tenant;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;
use Inertia\Response;

class PasswordController extends Controller
{
    /**
     * Show the user's password settings page.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('settings/password', [
            'mustVerifyEmail' => ! $request->session()->has('tenant_id') && $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's password.
     */
    public function update(Request $request): RedirectResponse
    {
        $isTenant = $request->session()->has('tenant_id');

        $validated = $request->validate([
            'current_password' => ['required', $isTenant ? 'string' : 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        if ($isTenant) {
            $tenant = Tenant::find($request->session()->get('tenant_id'));

            if (! $tenant || ! Hash::check($validated['current_password'], $tenant->password)) {
                return back()->withErrors(['current_password' => __('auth.password')]);
            }

            $tenant->update([
                'password' => Hash::make($validated['password']),
            ]);

            return back();
        }

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return back();
    }
}
