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

    const formatDate = (d: string | null | undefined) =>
        d ? new Date(d).toLocaleDateString('en-PH', {
            year: 'numeric', month: 'short', day: 'numeric',
        }) : '—';

    const handleRemove = (id: number, tenantName: string) => {
        if (confirm(`Are you sure you want to remove this balance entry for ${tenantName}?`)) {
            router.patch(route('balance_entries.removed', { balance_entry: id }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Balance Entries" />

            <div className="m-4 space-y-4">
                {flash.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Balance Entry Records</h2>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    'Balance Entry ID',
                                    'Tenant ID',
                                    'Full Name',
                                    'Amount',
                                    'Description',
                                    'Created At',
                                    'Updated At',
                                    'Action',
                                ].map((col) => (
                                    <th
                                        key={col}
                                        className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {tenants.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-4 py-8 text-center text-gray-400"
                                    >
                                        No balance entry records found.
                                    </td>
                                </tr>
                            ) : (
                                tenants.map((tenant) => {
                                    const balanceEntry =
                                        tenant.balance_entries && tenant.balance_entries.length > 0
                                            ? tenant.balance_entries[0]
                                            : null;

                                    return (
                                        <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-gray-600">
                                                {balanceEntry?.id ?? '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {tenant.id}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {tenant.full_name}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-gray-800">
                                                {balanceEntry
                                                    ? `₱${Number(balanceEntry.amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
                                                    : '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {balanceEntry?.description ?? '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {balanceEntry ? formatDate(balanceEntry.created_at) : '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {balanceEntry ? formatDate(balanceEntry.updated_at) : '—'}
                                            </td>
                                            <td className="px-4 py-3">
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
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}