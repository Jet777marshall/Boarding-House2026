<?php

namespace App\Http\Requests\Settings;

use App\Models\Tenant;
use App\Models\User;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $tenant = null;

        if ($this->session()->has('tenant_id')) {
            $tenant = Tenant::find($this->session()->get('tenant_id'));
        }

        return [
            'name' => ['required', 'string', 'max:255'],

            'email' => [
                'required',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique($tenant ? Tenant::class : User::class)
                    ->ignore($tenant ? $tenant->id : $this->user()->id),
            ],
        ];
    }
}
