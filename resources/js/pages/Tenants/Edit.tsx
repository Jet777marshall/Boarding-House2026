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
    User, 
    Building2, 
    Calendar, 
    Phone, 
    Mail, 
    MapPin, 
    Lock,
    ArrowLeft,
    Save,
    Eye,
    EyeOff,
    UserCircle
} from 'lucide-react';
import { useState } from 'react';

// Import the CSS
import '../../../css/tenants-edit.css';

interface Tenant {
    id: number;
    user_id: number;
    full_name: string;
    company_name: string;
    emergency_contact_number: string;
    email: string;
    personal_number: string;
    address: string;
    birthdate: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    tenant: Tenant;
}

export default function Edit({ tenant }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        user_id: tenant.user_id.toString(),
        full_name: tenant.full_name,
        company_name: tenant.company_name,
        emergency_contact_number: tenant.emergency_contact_number,
        email: tenant.email,
        address: tenant.address,
        birthdate: tenant.birthdate,
        password_confirmation: '',
        personal_number: tenant.personal_number,
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('tenants.update', tenant.id));
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

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Tenants',
            href: '/tenants',
        },
        {
            title: `Edit: ${tenant.full_name}`,
            href: `/tenants/${tenant.id}/edit`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit Tenant - ${tenant.full_name}`} />

            <div className="tenant-edit-page">
                {/* Header */}
                <div className="tenant-edit-header">
                    <div className="tenant-edit-header-left">
                        <div className="tenant-edit-brand">
                            <div className="tenant-edit-brand-icon">
                                <UserCircle className="h-6 w-6" />
                            </div>
                            <div>
                                <h1 className="tenant-edit-title">Edit Tenant</h1>
                                <p className="tenant-edit-subtitle">
                                    Updating: <span className="font-semibold text-stone-900">{tenant.full_name}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="tenant-edit-header-right">
                        <Button 
                            variant="outline" 
                            className="tenant-edit-back-btn"
                            onClick={() => window.history.back()}
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back
                        </Button>
                    </div>
                </div>

                {/* Tenant Status Banner */}
                <div className="tenant-edit-status-banner">
                    <div className="tenant-edit-status-info">
                        <span className="tenant-edit-status-label">Status:</span>
                        <span className={`tenant-edit-status-badge ${
                            tenant.status?.toLowerCase() === 'active' 
                                ? 'tenant-edit-status-active' 
                                : 'tenant-edit-status-inactive'
                        }`}>
                            {tenant.status || 'Unknown'}
                        </span>
                    </div>
                    <div className="tenant-edit-status-info">
                        <span className="tenant-edit-status-label">Tenant ID:</span>
                        <span className="tenant-edit-status-value">#{tenant.id}</span>
                    </div>
                    <div className="tenant-edit-status-info">
                        <span className="tenant-edit-status-label">Joined:</span>
                        <span className="tenant-edit-status-value">
                            {new Date(tenant.created_at).toLocaleDateString('en-PH', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                    </div>
                </div>

                {/* Form Card */}
                <div className="tenant-edit-card">
                    {/* Validation Errors */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="tenant-edit-alert">
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

                    <form onSubmit={handleUpdate} className="tenant-edit-form">
                        {/* Personal Information Section */}
                        <div className="tenant-edit-section">
                            <div className="tenant-edit-section-header">
                                <User className="h-5 w-5" />
                                <h2 className="tenant-edit-section-title">Personal Information</h2>
                            </div>
                            <div className="tenant-edit-grid">
                                <div className="tenant-edit-field tenant-edit-field-full">
                                    <Label htmlFor="full_name" className="tenant-edit-label">
                                        Full Name <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <User className="tenant-edit-field-icon" />
                                        <Input
                                            id="full_name"
                                            placeholder="Enter full name"
                                            value={data.full_name}
                                            onChange={(e) => setData('full_name', e.target.value)}
                                            className="tenant-edit-input"
                                            required
                                        />
                                    </div>
                                    {errors.full_name && (
                                        <p className="tenant-edit-error">{errors.full_name}</p>
                                    )}
                                </div>

                                <div className="tenant-edit-field">
                                    <Label htmlFor="birthdate" className="tenant-edit-label">
                                        Birthdate <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Calendar className="tenant-edit-field-icon" />
                                        <Input
                                            type="date"
                                            id="birthdate"
                                            value={data.birthdate}
                                            onChange={(e) => setData('birthdate', e.target.value)}
                                            className="tenant-edit-input"
                                            required
                                        />
                                    </div>
                                    {errors.birthdate && (
                                        <p className="tenant-edit-error">{errors.birthdate}</p>
                                    )}
                                </div>

                                <div className="tenant-edit-field">
                                    <Label htmlFor="company_name" className="tenant-edit-label">
                                        Company / School
                                    </Label>
                                    <div className="relative">
                                        <Building2 className="tenant-edit-field-icon" />
                                        <Input
                                            id="company_name"
                                            placeholder="Company or school name"
                                            value={data.company_name}
                                            onChange={(e) => setData('company_name', e.target.value)}
                                            className="tenant-edit-input"
                                        />
                                    </div>
                                    {errors.company_name && (
                                        <p className="tenant-edit-error">{errors.company_name}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="tenant-edit-section">
                            <div className="tenant-edit-section-header">
                                <Phone className="h-5 w-5" />
                                <h2 className="tenant-edit-section-title">Contact Information</h2>
                            </div>
                            <div className="tenant-edit-grid">
                                <div className="tenant-edit-field">
                                    <Label htmlFor="email" className="tenant-edit-label">
                                        Email <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Mail className="tenant-edit-field-icon" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="personal@email.com"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            className="tenant-edit-input"
                                            required
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="tenant-edit-error">{errors.email}</p>
                                    )}
                                </div>

                                <div className="tenant-edit-field">
                                    <Label htmlFor="personal_number" className="tenant-edit-label">
                                        Personal Number <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Phone className="tenant-edit-field-icon" />
                                        <Input
                                            id="personal_number"
                                            placeholder="09XX XXX XXXX"
                                            value={data.personal_number}
                                            onChange={(e) => setData('personal_number', e.target.value)}
                                            className="tenant-edit-input"
                                            required
                                        />
                                    </div>
                                    {errors.personal_number && (
                                        <p className="tenant-edit-error">{errors.personal_number}</p>
                                    )}
                                </div>

                                <div className="tenant-edit-field tenant-edit-field-full">
                                    <Label htmlFor="emergency_contact_number" className="tenant-edit-label">
                                        Emergency Contact <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <Phone className="tenant-edit-field-icon" />
                                        <Input
                                            id="emergency_contact_number"
                                            placeholder="09XX XXX XXXX"
                                            value={data.emergency_contact_number}
                                            onChange={(e) => setData('emergency_contact_number', e.target.value)}
                                            className="tenant-edit-input"
                                            required
                                        />
                                    </div>
                                    {errors.emergency_contact_number && (
                                        <p className="tenant-edit-error">{errors.emergency_contact_number}</p>
                                    )}
                                </div>

                                <div className="tenant-edit-field tenant-edit-field-full">
                                    <Label htmlFor="address" className="tenant-edit-label">
                                        Address <span className="text-red-500">*</span>
                                    </Label>
                                    <div className="relative">
                                        <MapPin className="tenant-edit-field-icon tenant-edit-textarea-icon" />
                                        <Textarea
                                            id="address"
                                            placeholder="Full address"
                                            value={data.address}
                                            onChange={(e) => setData('address', e.target.value)}
                                            className="tenant-edit-textarea"
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    {errors.address && (
                                        <p className="tenant-edit-error">{errors.address}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Security Section */}
                        <div className="tenant-edit-section">
                            <div className="tenant-edit-section-header">
                                <Lock className="h-5 w-5" />
                                <h2 className="tenant-edit-section-title">
                                    Security
                                    <span className="text-sm font-normal text-stone-500 ml-2">
                                        (Leave blank to keep current password)
                                    </span>
                                </h2>
                            </div>
                            <div className="tenant-edit-grid">
                                <div className="tenant-edit-field">
                                    <Label htmlFor="password" className="tenant-edit-label">
                                        New Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="tenant-edit-field-icon" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="At least 8 characters, 1 uppercase, 1 number, 1 symbol"
                                            value={data.password}
                                            onChange={(e) => {
                                                setData('password', e.target.value);
                                                checkPasswordStrength(e.target.value);
                                            }}
                                            className="tenant-edit-input"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="tenant-edit-password-toggle"
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
                                        <div className="tenant-edit-password-strength">
                                            <div className="tenant-edit-password-bar">
                                                <div 
                                                    className={`tenant-edit-password-fill ${getPasswordStrengthColor()}`}
                                                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                                />
                                            </div>
                                            <span className="tenant-edit-password-text">
                                                Password strength: <strong>{getPasswordStrengthText()}</strong>
                                            </span>
                                        </div>
                                    )}
                                    
                                    {errors.password && (
                                        <p className="tenant-edit-error">{errors.password}</p>
                                    )}
                                </div>

                                <div className="tenant-edit-field">
                                    <Label htmlFor="password_confirmation" className="tenant-edit-label">
                                        Confirm New Password
                                    </Label>
                                    <div className="relative">
                                        <Lock className="tenant-edit-field-icon" />
                                        <Input
                                            id="password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Re-enter new password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            className="tenant-edit-input"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="tenant-edit-password-toggle"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password_confirmation && (
                                        <p className="tenant-edit-error">{errors.password_confirmation}</p>
                                    )}
                                    {data.password && data.password_confirmation && data.password !== data.password_confirmation && (
                                        <p className="tenant-edit-error">Passwords do not match</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="tenant-edit-actions">
                            <Button
                                type="button"
                                variant="outline"
                                className="tenant-edit-cancel"
                                onClick={() => window.history.back()}
                            >
                                Cancel
                            </Button>
                            <Button 
                                type="submit" 
                                className="tenant-edit-submit"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <span className="tenant-edit-spinner" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Update Tenant
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