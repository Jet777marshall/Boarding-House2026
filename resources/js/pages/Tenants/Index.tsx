import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { InfoIcon, Terminal } from 'lucide-react';
import { Megaphone } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tenants',
        href: '/tenants',
    },
];

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
    created_at: string;
    updated_at: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    tenants: Tenant[];
}



export default function Index() {
    const { flash, tenants } = usePage().props as PageProps;

    // Add this helper function before your component
    const formatDate = (dateString: string, includeTime: boolean = false) => {
        if (!dateString) return '-';
        const date = new Date(dateString);

        if (includeTime) {
            return date.toLocaleString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } else {
            return date.toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: '2-digit'
            });
        }
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenants" />
            <div className='m-4'>
                <Link href={route('tenants.create')}>
                    <Button>Register Tenant</Button>
                </Link>
            </div>
            <div className='m-4'>
                {flash.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>
                            {flash.message}
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            {tenants.length > 0 && (
                <div className='m-4'>
                    <Table>
                        <TableCaption>A list of your recent tenants.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>User ID</TableHead>
                                <TableHead>Full Name</TableHead>
                                <TableHead>Company Name</TableHead>
                                <TableHead>Emergency Contact</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Personal Number</TableHead>
                                <TableHead>Address</TableHead>
                                <TableHead>Birthdate</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead>Updated At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tenants.map((tenant) =>
                                <TableRow>
                                    <TableCell className="font-medium">{tenant.id}</TableCell>
                                    <TableCell>{tenant.user_id}</TableCell>
                                    <TableCell>{tenant.full_name}</TableCell>
                                    <TableCell>{tenant.company_name}</TableCell>
                                    <TableCell>{tenant.emergency_contact_number}</TableCell>
                                    <TableCell>{tenant.email}</TableCell>
                                    <TableCell>{tenant.personal_number}</TableCell>
                                    <TableCell>{tenant.address}</TableCell>
                                    <TableCell>{formatDate(tenant.birthdate)}</TableCell>
                                    <TableCell>{formatDate(tenant.created_at, true)}</TableCell>
                                    <TableCell>{formatDate(tenant.updated_at, true)}</TableCell>
                                </TableRow>
                            )}

                        </TableBody>
                    </Table>
                </div>

            )}
        </AppLayout>
    );
}