import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { InfoIcon, Terminal, Edit2, Trash2 } from 'lucide-react';
import { Megaphone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Payments',
        href: '/payments',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />
            <div className='m-4'>
                <Link href={route('payments.create')}>
                    <Button>Create Payment</Button>
                </Link>
            </div>
            <div>
                <Link href=''></Link>
            </div>
            <div className="m-4">

            </div>
        </AppLayout>
    );
}
