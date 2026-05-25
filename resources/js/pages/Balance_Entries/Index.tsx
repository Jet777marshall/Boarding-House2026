import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Balance Entries',
        href: '/balance_entries',
    },
];

interface PageProps {
    tenants: Array<{
        id: number;
        full_name: string;
        balanceEntries: Array<{
            id: number;
            amount: number;
        }>;
    }>;
}

export default function BalanceEntries() {
    const { tenants } = usePage().props as PageProps;

    const formatValue = (value: number | string | null | undefined) =>
        value !== null && value !== undefined && value !== '' ? value : '...';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Balance Entries" />
            <div className="p-4">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Entry ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {tenants.map((tenant) => {
                                const balance = tenant.balanceEntries && tenant.balanceEntries.length > 0 ? tenant.balanceEntries[0] : null;

                                return (
                                    <tr key={tenant.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{balance?.id ?? '...'}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatValue(tenant.id)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatValue(tenant.full_name)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{balance ? formatValue(balance.amount) : '...'}</td>
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
