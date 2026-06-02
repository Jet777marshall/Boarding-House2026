import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Edit2, Trash2, Megaphone } from 'lucide-react';

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

const statusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'pending':  return { badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' };
        case 'removed':  return { badge: 'bg-red-100 text-red-700',    dot: 'bg-red-500' };
        default:         return { badge: 'bg-green-100 text-green-700', dot: 'bg-green-500' };
    }
};

const formatDate = (d: string | null | undefined) =>
    d ? new Date(d).toLocaleDateString('en-PH', {
        year: 'numeric', month: 'short', day: 'numeric',
    }) : '—';

export default function Index({ tenants }: { tenants: any[] }) {
    const { flash } = usePage().props as PageProps;

    const handleRemove = (id: number, full_name: string) => {
        if (confirm(`Are you sure you want to remove the billing for ${full_name}?`)) {
            router.patch(route('billings.removed', { billing: id }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billings" />

            <div className="m-4 space-y-4">
                {flash.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Billing Records</h2>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    'Billing ID',
                                    'Tenant ID',
                                    'Full Name',
                                    'Due Date',
                                    'Amount',
                                    'Created At',
                                    'Updated At',
                                    'Status',
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
                                        colSpan={9}
                                        className="px-4 py-8 text-center text-gray-400"
                                    >
                                        No billing records found.
                                    </td>
                                </tr>
                            ) : (
                                tenants.map((tenant: any) => {
                                    const billing =
                                        tenant.billings && tenant.billings.length > 0
                                            ? tenant.billings[0]
                                            : null;
                                    const colors = billing ? statusColor(billing.status) : null;

                                    return (
                                        <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-gray-600">
                                                {billing?.id ?? '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {tenant.id}
                                            </td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {tenant.full_name}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {billing ? formatDate(billing.due_date) : '—'}
                                            </td>
                                            <td className="px-4 py-3 font-semibold text-gray-800">
                                                {billing
                                                    ? `₱${Number(billing.amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}`
                                                    : '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {billing ? formatDate(billing.created_at) : '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {billing ? formatDate(billing.updated_at) : '—'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {billing && colors ? (
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors.badge}`}>
                                                        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                                                        {billing.status}
                                                    </span>
                                                ) : '—'}
                                            </td>
                                            <td className="px-4 py-3">
                                                {billing ? (
                                                    <div className="flex gap-2">
                                                        <Link href={route('billings.edit', { billing: billing.id })}>
                                                            <Button size="sm" variant="outline" className="flex items-center gap-2">
                                                                <Edit2 className="h-4 w-4" />
                                                                Edit
                                                            </Button>
                                                        </Link>
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
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}