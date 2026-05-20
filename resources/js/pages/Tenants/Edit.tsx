import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { CircleAlert } from 'lucide-react';

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

interface Props{
    tenant: Tenant;
}
export default function Edit({tenant}: Props) {

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
    })

    const handleupdate = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('tenants.update', tenant.id));
       
    }

    return (
        <AppLayout breadcrumbs={[{title: 'Update tenant information', href: `/tenants/${tenant.id}/edit`}]}>
            <Head title="Tenants" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handleupdate} className='space-y-4'>

                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
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
                    <div className='gap-1.5'>
                        <Label htmlFor="tenant name">Full name</Label>
                        <Input placeholder="Tenant full name" value={data.full_name} onChange={(e) => setData('full_name', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="birthdate">Birthdate</Label>
                        <Input
                            type="date"
                            id="birthdate"
                            value={data.birthdate}
                            onChange={(e) => setData('birthdate', e.target.value)}
                        />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="company name">Company name</Label>
                        <Input placeholder="Company name or School" value={data.company_name} onChange={(e) => setData('company_name', e.target.value)} ></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="emergency contact number">Emergency Contact number</Label>
                        <Input placeholder="09XX XXX XXXX" value={data.emergency_contact_number} onChange={(e) => setData('emergency_contact_number', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="personal email">Email</Label>
                        <Input placeholder="Personal email" value={data.email} onChange={(e) => setData('email', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="personal number">Personal Phone number</Label>
                        <Input placeholder="09XX XXX XXXX" value={data.personal_number} onChange={(e) => setData('personal_number', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="address">Address</Label>
                        <Textarea placeholder="Full Address" value={data.address} onChange={(e) => setData('address', e.target.value)}></Textarea>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" placeholder="At least 8 characters, 1 uppercase, 1 number, 1 symbol" value={data.password} onChange={(e) => setData('password', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="confirm password">Confirm password</Label>
                        <Input
                            type="password"
                            placeholder="Re-enter password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)} // ← Add this
                        />
                    </div>
                    <Button type="submit">Update</Button>
                </form>
            </div>
        </AppLayout>
    );
}
