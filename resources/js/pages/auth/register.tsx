import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, User, Mail, Lock, Eye, EyeOff, UserPlus, Building2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Import the CSS
import '../../../css/register.css';

interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<RegisterForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    // Password strength checker
    const checkPasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;
        setPasswordStrength(strength);
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0: return 'Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return '';
        }
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return 'bg-red-500';
            case 1: return 'bg-red-400';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-blue-500';
            case 4: return 'bg-emerald-500';
            default: return 'bg-gray-300';
        }
    };

    const getPasswordRequirements = () => {
        const requirements = [];
        if (data.password.length === 0) return [];
        if (data.password.length < 8) requirements.push('At least 8 characters');
        if (!/[A-Z]/.test(data.password)) requirements.push('One uppercase letter');
        if (!/[0-9]/.test(data.password)) requirements.push('One number');
        if (!/[^A-Za-z0-9]/.test(data.password)) requirements.push('One special character');
        return requirements;
    };

    const passwordRequirements = getPasswordRequirements();

    return (
        <>
            <Head title="Register - The Dorm Hub" />

            <div className="register-page">
                {/* Brand Logo */}
                <div className="register-brand">
                    <div className="register-logo">
                        <span className="register-logo-text">DH</span>
                    </div>
                    <div>
                        <h1 className="register-brand-title">The Dorm Hub</h1>
                        <p className="register-brand-tagline">Premium Boarding House</p>
                    </div>
                </div>

                {/* Register Card */}
                <div className="register-card">
                    <div className="register-card-header">
                        <h2 className="register-card-title">Create Your Account</h2>
                        <p className="register-card-subtitle">Join The Dorm Hub community today</p>
                    </div>

                    <form className="register-form" onSubmit={submit}>
                        <div className="register-form-fields">
                            {/* Name Field */}
                            <div className="register-field">
                                <Label htmlFor="name" className="register-label">
                                    <User className="register-label-icon" />
                                    Full Name
                                </Label>
                                <div className="register-input-wrapper">
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        disabled={processing}
                                        placeholder="Enter your full name"
                                        className="register-input register-input-name"
                                    />
                                </div>
                                <InputError message={errors.name} className="register-error" />
                            </div>

                            {/* Email Field */}
                            <div className="register-field">
                                <Label htmlFor="email" className="register-label">
                                    <Mail className="register-label-icon" />
                                    Email Address
                                </Label>
                                <div className="register-input-wrapper">
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        disabled={processing}
                                        placeholder="you@example.com"
                                        className="register-input register-input-email"
                                    />
                                </div>
                                <InputError message={errors.email} className="register-error" />
                            </div>

                            {/* Password Field */}
                            <div className="register-field">
                                <Label htmlFor="password" className="register-label">
                                    <Lock className="register-label-icon" />
                                    Password
                                </Label>
                                <div className="register-input-wrapper register-password-wrapper">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => {
                                            setData('password', e.target.value);
                                            checkPasswordStrength(e.target.value);
                                        }}
                                        disabled={processing}
                                        placeholder="Create a strong password"
                                        className="register-input register-input-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="register-password-toggle"
                                        tabIndex={5}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="register-toggle-icon" />
                                        ) : (
                                            <Eye className="register-toggle-icon" />
                                        )}
                                    </button>
                                </div>
                                
                                {/* Password Strength Indicator */}
                                {data.password.length > 0 && (
                                    <div className="register-password-strength">
                                        <div className="register-password-bar">
                                            <div 
                                                className={`register-password-fill ${getPasswordStrengthColor()}`}
                                                style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                            />
                                        </div>
                                        <span className="register-password-text">
                                            Strength: <strong>{getPasswordStrengthText()}</strong>
                                        </span>
                                    </div>
                                )}

                                {/* Password Requirements */}
                                {passwordRequirements.length > 0 && (
                                    <ul className="register-password-requirements">
                                        {passwordRequirements.map((req, index) => (
                                            <li key={index} className="register-password-requirement">
                                                <span className="register-password-requirement-icon">✕</span>
                                                {req}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {data.password.length > 0 && passwordRequirements.length === 0 && (
                                    <p className="register-password-valid">
                                        ✓ Password meets all requirements
                                    </p>
                                )}

                                <InputError message={errors.password} className="register-error" />
                            </div>

                            {/* Confirm Password Field */}
                            <div className="register-field">
                                <Label htmlFor="password_confirmation" className="register-label">
                                    <Lock className="register-label-icon" />
                                    Confirm Password
                                </Label>
                                <div className="register-input-wrapper register-password-wrapper">
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        value={data.password_confirmation}
                                        onChange={(e) => setData('password_confirmation', e.target.value)}
                                        disabled={processing}
                                        placeholder="Confirm your password"
                                        className="register-input register-input-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="register-password-toggle"
                                        tabIndex={6}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="register-toggle-icon" />
                                        ) : (
                                            <Eye className="register-toggle-icon" />
                                        )}
                                    </button>
                                </div>
                                
                                {/* Password Match Indicator */}
                                {data.password_confirmation.length > 0 && (
                                    <p className={`register-password-match ${
                                        data.password === data.password_confirmation 
                                            ? 'register-password-match-success' 
                                            : 'register-password-match-error'
                                    }`}>
                                        {data.password === data.password_confirmation 
                                            ? '✓ Passwords match' 
                                            : '✕ Passwords do not match'}
                                    </p>
                                )}
                                
                                <InputError message={errors.password_confirmation} className="register-error" />
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="register-submit-btn"
                                tabIndex={7} 
                                disabled={processing}
                            >
                                {processing ? (
                                    <LoaderCircle className="register-spinner" />
                                ) : (
                                    <>
                                        <UserPlus className="register-submit-icon" />
                                        <span className="register-submit-text">Create Account</span>
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Login Link */}
                        <div className="register-login-link">
                            Already have an account?{' '}
                            <TextLink href={route('login')} className="register-login-text" tabIndex={8}>
                                Log in
                            </TextLink>
                        </div>

                        {/* Dorm Hub Info */}
                        <div className="register-footer-info">
                            <Building2 className="register-footer-icon" />
                            <span>Your home away from home</span>
                        </div>
                    </form>
                </div>

                {/* Footer */}
                <div className="register-footer">
                    &copy; {new Date().getFullYear()} The Dorm Hub. All rights reserved.
                </div>
            </div>
        </>
    );
}