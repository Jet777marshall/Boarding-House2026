import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { InfoIcon, Terminal, Edit2, Trash2 } from 'lucide-react';
import { Megaphone } from 'lucide-react';


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billings',
        href: '/billings',
    },
];

interface PageProps {
    flash: {
        message?: string;
    };
}

export default function Index({ tenants }: { tenants: any[] }) {
    const { flash } = usePage().props as PageProps;

    const handleRemove = (id: number, full_name: string) => {
        if (confirm(`Are you sure you want to remove tenant ${full_name}?`)) {
            router.patch(route('billings.removed', { billing: id }));
        }
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billings" />
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
            <div className="p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Billing ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tenants.map((tenant: any) => {
                                const billing = tenant.billings && tenant.billings.length > 0 ? tenant.billings[0] : null;
                                const formatDate = (d: string | null) => d ? new Date(d).toLocaleDateString() : '...';

                                return (
                                    <tr key={tenant.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{billing?.id ?? '...'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tenant.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tenant.full_name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{billing ? formatDate(billing.due_date) : '...'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{billing?.amount ?? '...'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{billing ? formatDate(billing.created_at) : '...'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{billing ? formatDate(billing.updated_at) : '...'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {billing ? (
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium
                                                     ${billing.status === 'pending'
                                                        ? 'bg-yellow-100 text-yellow-700'
                                                        : billing.status === 'removed'
                                                            ? 'bg-red-100 text-red-700'
                                                            : 'bg-green-100 text-green-700'
                                                    }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full 
                                                    ${billing.status === 'pending' ? 'bg-yellow-500' : billing.status === 'removed' ? 'bg-red-500' : 'bg-green-500'}`}
                                                    />
                                                    {billing.status}
                                                </span>
                                            ) : '...'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {billing ? (
                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                                                        <Edit2 className="h-4 w-4" />
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        onClick={() => handleRemove(billing.id, tenant.full_name)}
                                                        size="sm" 
                                                        variant="destructive"
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Link href={route('billings.create', { tenant_id: tenant.id })}>
                                                    <Button size="sm">Create Bill</Button>
                                                </Link>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
