import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, } from '@inertiajs/react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register Tenant',
        href: '/tenants/create',
    },
];
export default function Index() {

    const { data, setData, post, processing, errors } = useForm({
        user_id:'',
        fullname: '',
        company_name: '',
        emergency_contact_number: '',
        email: '',
        address: '',
        personal_number: '',
        Password: '',
    })

    const handlesubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('tenants.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenants" />
            <div className='w-8/12 p-4'>
                <form onSubmit={handlesubmit} className='space-y-4'>
                    <div className='gap-1.5'>
                        <Label htmlFor="tenant name">Full name</Label>
                        <Input placeholder="Tenant full name" value={data.fullname} onChange={(e) => setData('fullname', e.target.value)}></Input>
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
                        <Input type="password" placeholder="At least 8 characters, 1 uppercase, 1 number, 1 symbol" value={data.Password} onChange={(e) => setData('Password', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="confirm password">Confirm password</Label>
                        <Input type="password" placeholder="Re-enter password"></Input>
                    </div>
                    <Button type="submit">Register</Button>
                </form>
            </div>
        </AppLayout>
    );
}
