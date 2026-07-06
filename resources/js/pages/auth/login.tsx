import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

// Correct path: from resources/js/pages/auth/ to resources/css/
import '../../../css/login.css';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Log in - The Dorm Hub" />

            <div className="login-page">
                {/* Brand Logo */}
                <div className="login-brand">
                    <div className="login-logo">
                        <span className="login-logo-text">DH</span>
                    </div>
                    <div>
                        <h1 className="login-brand-title">The Dorm Hub</h1>
                        <p className="login-brand-tagline">Premium Boarding House</p>
                    </div>
                </div>

                {/* Login Card */}
                <div className="login-card">
                    <div className="login-card-header">
                        <h2 className="login-card-title">Welcome Back</h2>
                        <p className="login-card-subtitle">Log in to your Dorm Hub account</p>
                    </div>

                    <form className="login-form" onSubmit={submit}>
                        <div className="login-form-fields">
                            {/* Email Field */}
                            <div className="login-field">
                                <Label 
                                    htmlFor="email" 
                                    className="login-label"
                                >
                                    <Mail className="login-label-icon" />
                                    Email address
                                </Label>
                                <div className="login-input-wrapper">
                                    <Input
                                        className="login-input login-input-email"
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Password Field */}
                            <div className="login-field">
                                <div className="login-password-header">
                                    <Label 
                                        htmlFor="password" 
                                        className="login-label"
                                    >
                                        <Lock className="login-label-icon" />
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink 
                                            href={route('password.request')} 
                                            className="login-forgot-link"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="login-input-wrapper login-password-wrapper">
                                    <Input
                                        className="login-input login-input-password"
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="login-password-toggle"
                                        tabIndex={3}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="login-toggle-icon" />
                                        ) : (
                                            <Eye className="login-toggle-icon" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            {/* Remember Me */}
                            <div className="login-remember">
                                <Checkbox 
                                    id="remember" 
                                    name="remember" 
                                    tabIndex={4}
                                    className="login-checkbox"
                                />
                                <Label htmlFor="remember" className="login-remember-label">
                                    Remember me
                                </Label>
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="login-submit-btn"
                                size="lg" 
                                tabIndex={4} 
                                disabled={processing}
                            >
                                {processing ? (
                                    <LoaderCircle className="login-spinner" />
                                ) : (
                                    <span className="login-submit-text">Log in</span>
                                )}
                            </Button>
                        </div>

                        {/* Sign Up Link */}
                        <div className="login-signup-link">
                            Don't have an account?{' '}
                            <TextLink 
                                href={route('register')} 
                                className="login-signup-text"
                                tabIndex={5}
                            >
                                Sign up
                            </TextLink>
                        </div>

                        {/* Dorm Hub Info */}
                        <div className="login-footer-info">
                            <Building2 className="login-footer-icon" />
                            <span>Your home away from home</span>
                        </div>
                    </form>

                    {status && (
                        <div className="login-status-message">
                            {status}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="login-footer">
                    &copy; {new Date().getFullYear()} The Dorm Hub. All rights reserved.
                </div>
            </div>
        </>
    );
}

// Building2 icon component
function Building2({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    );
}