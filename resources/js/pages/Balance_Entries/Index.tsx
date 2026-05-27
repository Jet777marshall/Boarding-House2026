import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Edit2, Trash2, Megaphone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Balance Entries',
        href: '/balance_entries',
    },
];

interface PageProps {
    flash: {
        message?: string;
    };
    tenants: Array<{
        id: number;
        full_name: string;
        balance_entries?: Array<{
            id: number;
            amount: number;
            description?: string;
            created_at?: string;
            updated_at?: string;
        }>;
    }>;
}

export default function BalanceEntries() {
    const { tenants, flash } = usePage().props as PageProps;

    const formatValue = (value: number | string | null | undefined) =>
        value !== null && value !== undefined && value !== '' ? value : '...';

    const formatDate = (d: string | null | undefined) =>
        d ? new Date(d).toLocaleDateString() : '...';

    const handleRemove = (id: number, tenantName: string) => {
        if (confirm(`Are you sure you want to remove this balance entry for ${tenantName}?`)) {
            router.patch(route('balance_entries.removed', { balance_entry: id }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Balance Entries" />
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Entry ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tenants.map((tenant) => {
                                const balanceEntry = tenant.balance_entries && tenant.balance_entries.length > 0 
                                    ? tenant.balance_entries[0] 
                                    : null;
                                
                                return (
                                    <tr key={tenant.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {balanceEntry?.id ?? '...'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {tenant.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {tenant.full_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {balanceEntry?.amount ?? '...'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {balanceEntry?.description ?? '...'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {balanceEntry ? formatDate(balanceEntry.created_at) : '...'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {balanceEntry ? formatDate(balanceEntry.updated_at) : '...'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {balanceEntry ? (
                                                <div className="flex gap-2">
                                                    <Link href={route('balance_entries.edit', { balance_entry: balanceEntry.id })}>
                                                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                                                            <Edit2 className="h-4 w-4" />
                                                            Edit
                                                        </Button>
                                                    </Link>

                                                    <Button
                                                        onClick={() => handleRemove(balanceEntry.id, tenant.full_name)}
                                                        size="sm"
                                                        variant="destructive"
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Remove
                                                    </Button>
                                                </div>
                                            ) : (
                                                <Link href={route('balance_entries.create', { tenant_id: tenant.id })}>
                                                    <Button size="sm">Create Balance Entry</Button>
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