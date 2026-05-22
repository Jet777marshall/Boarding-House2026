import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Billings',
        href: '/billings',
    },
];

export default function Index({ tenants }: { tenants: any[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billings" />

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
                                            <Link href={route('billings.create', { tenant_id: tenant.id })}>
                                                <Button size="sm">Create Bill</Button>
                                            </Link>
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
