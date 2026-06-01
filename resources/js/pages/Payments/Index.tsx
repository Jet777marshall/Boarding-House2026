import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Edit2, Trash2 } from 'lucide-react';
import { Megaphone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

interface Payment {
    id: number;
    tenant_id: number;
    billing_id: number;
    amount: number;
    payment_method: string;
    reference_number: string;
    verified_by: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    flash: {
        message?: string;
    };
    payments: Payment[];
}

export default function Index() {
    const { flash, payments } = usePage().props as PageProps; // ← this is what was missing

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />
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
            <div className='m-4'>
                <Link href={route('payments.create')}>
                    <Button>Create Payment</Button>
                </Link>
            </div>

        </AppLayout>
    );
}