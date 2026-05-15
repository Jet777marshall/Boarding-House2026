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

 const { data, setData, post, processing, errors} = useForm({
   name:'',
   company_name:'',
   emergency_contact_number:'',
   Email:'',
   Personal_number:'',
   personal_number:'',
   Password:'',
 })

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenants" />
            <div className='w-8/12 p-4'>
                <form className='space-y-4'>
                    <div className='gap-1.5'>
                        <Label htmlFor="tenant name">Full name</Label>
                        <Input placeholder="Tenant full name"></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="company name">Company name</Label>
                        <Input placeholder="Company name or School"></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="emergency contact number">Emergency Contact number</Label>
                        <Input placeholder="09XX XXX XXXX"></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="personal email">Email</Label>
                        <Input placeholder="Personal email"></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="personal number">Personal Phone number</Label>
                        <Input placeholder="09XX XXX XXXX"></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="address">Address</Label>
                        <Textarea placeholder="Full Address"></Textarea>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="password">Password</Label>
                        <Input type="password" placeholder="At least 8 characters, 1 uppercase, 1 number, 1 symbol"></Input>
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
