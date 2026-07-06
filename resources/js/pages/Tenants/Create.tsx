import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { 
    CircleAlert, 
    UserPlus, 
    Building2, 
    Calendar, 
    Phone, 
    Mail, 
    MapPin, 
    Lock, 
    User,
    ArrowLeft,
    CheckCircle,
    Eye,
    EyeOff
} from 'lucide-react';
import { useState } from 'react';

// ✅ CORRECT PATH: From resources/js/pages/Tenants/ to resources/css/
import '../../../css/tenants-create.css';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tenants',
        href: '/tenants',
    },
    {
        title: 'Register Tenant',
        href: '/tenants/create',
    },
];

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        user_id: '',
        full_name: '',
        company_name: '',
        emergency_contact_number: '',
        email: '',
        address: '',
        birthdate: '',
        password_confirmation: '',
        personal_number: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tenants.store'));
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register Tenant - The Dorm Hub" />

            <div className="tenant-create-page">
                {/* Header */}
                <div className="tenant-create-header">
                    <div className="tenant-create-header-left">
                        <div className="tenant-create-brand">
                            <div className="tenant-create-brand-icon">
                                <UserPlus className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="tenant-create-title">Register New Tenant</h1>
                                <p className="tenant-create-subtitle">Add a new tenant to The Dorm Hub</p>
                            </div>
                        </div>
                    </div>
                    <div className="tenant-create-header-right">
                        <Button 
                            variant="outline" 
                            className="tenant-create-back-btn"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>

                {/* Form Card */}
                <div className="tenant-create-card">
                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="tenant-create-alert">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Validation Error</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-4 space-y-1">
                                    {Object.values(errors).map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <form onSubmit={handleSubmit} className="tenant-create-form">
                        {/* Personal Information Section */}
                        <div className="tenant-create-section">
                            <div className="tenant-create-section-header">
                                <User className="h-5 w-5" />
                                <h2 className="tenant-create-section-title">Personal Information</h2>
                            </div>
                            <div className="tenant-create-grid">
                                <div className="tenant-create-field tenant-create-field-full">
                                    <Label htmlFor="full_name" className="tenant-create-label">
                                        Full Name <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <User className="tenant-create-field-icon" />
                                        <Input
                                            id="full_name"
                                            placeholder="Enter full name"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            className="tenant-create-input"
                                            required
                                        />
                                    </div>
                                    {errors.full_name && (
                                        <p className="tenant-create-error">{errors.full_name}</p>
                                    )}
                                </div>

                                <div className="tenant-create-field">
                                    <Label htmlFor="birthdate" className="tenant-create-label">
                                        Birthdate <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="tenant-create-field-icon" />
                                        <Input
                                            type="date"
                                            id="birthdate"
                                            value={data.birthdate}
                                            onChange={(e) => setData('birthdate', e.target.value)}
                                            className="tenant-create-input"
                                            required
                                        />
                                    </div>
                                    {errors.birthdate && (
                                        <p className="tenant-create-error">{errors.birthdate}</p>
                                    )}
                                </div>

                                <div className="tenant-create-field">
                                    <Label htmlFor="company_name" className="tenant-create-label">
                                        Company / School
                                    </Label>
                                    <div className="relative">
                                        <Building2 className="tenant-create-field-icon" />
                                        <Input
                                            id="company_name"
                                            placeholder="Company or school name"
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            className="tenant-create-input"
                                        />
                                    </div>
                                    {errors.company_name && (
                                        <p className="tenant-create-error">{errors.company_name}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="tenant-create-section">
                            <div className="tenant-create-section-header">
                                <Phone className="h-5 w-5" />
                                <h2 className="tenant-create-section-title">Contact Information</h2>
                            </div>
                            <div className="tenant-create-grid">
                                <div className="tenant-create-field">
                                    <Label htmlFor="email" className="tenant-create-label">
                                        Email <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Mail className="tenant-create-field-icon" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="personal@email.com"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="tenant-create-input"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="tenant-create-error">{errors.email}</p>
                                    )}
                                </div>

                                <div className="tenant-create-field">
                                    <Label htmlFor="personal_number" className="tenant-create-label">
                                        Personal Number <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Phone className="tenant-create-field-icon" />
                                        <Input
                                            id="personal_number"
                                            placeholder="09XX XXX XXXX"
                                            value={data.personal_number}
                                            onChange={(e) => setData('personal_number', e.target.value)}
                                            className="tenant-create-input"
                                            required
                                        />
                                    </div>
                                    {errors.personal_number && (
                                        <p className="tenant-create-error">{errors.personal_number}</p>
                                    )}
                                </div>

                                <div className="tenant-create-field tenant-create-field-full">
                                    <Label htmlFor="emergency_contact_number" className="tenant-create-label">
                                        Emergency Contact <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Phone className="tenant-create-field-icon" />
                                        <Input
                                            id="emergency_contact_number"
                                            placeholder="09XX XXX XXXX"
                                            value={data.emergency_contact_number}
                                            onChange={(e) => setData('emergency_contact_number', e.target.value)}
                                            className="tenant-create-input"
                                            required
                                        />
                                    </div>
                                    {errors.emergency_contact_number && (
                                        <p className="tenant-create-error">{errors.emergency_contact_number}</p>
                                    )}
                                </div>

                                <div className="tenant-create-field tenant-create-field-full">
                                    <Label htmlFor="address" className="tenant-create-label">
                                        Address <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="tenant-create-field-icon tenant-create-textarea-icon" />
                                        <Textarea
                                            id="address"
                                            placeholder="Full address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="tenant-create-textarea"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    {errors.address && (
                                        <p className="tenant-create-error">{errors.address}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="tenant-create-section">
                            <div className="tenant-create-section-header">
                                <Lock className="h-5 w-5" />
                                <h2 className="tenant-create-section-title">Security</h2>
                            </div>
                            <div className="tenant-create-grid">
                                <div className="tenant-create-field">
                                    <Label htmlFor="password" className="tenant-create-label">
                                        Password <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Lock className="tenant-create-field-icon" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="At least 8 characters, 1 uppercase, 1 number, 1 symbol"
                                            value={data.password}
                                            onChange={(e) => {
                                                setData('password', e.target.value);
                                                checkPasswordStrength(e.target.value);
                                            }}
                                            className="tenant-create-input"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="tenant-create-password-toggle"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    
                                    {/* Password Strength Indicator */}
                                    {data.password.length > 0 && (
                                        <div className="tenant-create-password-strength">
                                            <div className="tenant-create-password-bar">
                                                <div 
                                                    className={`tenant-create-password-fill ${getPasswordStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                                />
                                            </div>
                                            <span className="tenant-create-password-text">
                                                Password strength: <strong>{getPasswordStrengthText()}</strong>
                                            </span>
                                        </div>
                                    )}
                                    
                                    {errors.password && (
                                        <p className="tenant-create-error">{errors.password}</p>
                                    )}
                                </div>

                                <div className="tenant-create-field">
                                    <Label htmlFor="password_confirmation" className="tenant-create-label">
                                        Confirm Password <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Lock className="tenant-create-field-icon" />
                                        <Input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Re-enter password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="tenant-create-input"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="tenant-create-password-toggle"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="tenant-create-error">{errors.password_confirmation}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="tenant-create-actions">
                            <Button
                                type="button"
                                variant="outline"
                                className="tenant-create-cancel"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                className="tenant-create-submit"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <span className="tenant-create-spinner" />
                                        Registering...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="h-4 w-4" />
                                        Register Tenant
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}