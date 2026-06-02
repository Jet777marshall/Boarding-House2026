import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage, router } from '@inertiajs/react';
import { Edit2, Trash2, Megaphone } from 'lucide-react';

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
    status: string;
    created_at: string;
    updated_at: string;
}

interface PageProps {
    flash: { message?: string };
    tenants: Tenant[];
}

const formatDate = (dateString: string, includeTime: boolean = false) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    if (includeTime) {
        return date.toLocaleString('en-PH', {
            month: 'short', day: 'numeric', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true,
        });
    }
    return date.toLocaleDateString('en-PH', {
        month: 'short', day: 'numeric', year: 'numeric',
    });
};

const statusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'active':   return { badge: 'bg-green-100 text-green-700', dot: 'bg-green-500' };
        case 'inactive': return { badge: 'bg-red-100 text-red-700',     dot: 'bg-red-500'   };
        default:         return { badge: 'bg-gray-100 text-gray-600',   dot: 'bg-gray-400'  };
    }
};

export default function Index() {
    const { flash, tenants } = usePage().props as PageProps;

    const handleRemove = (id: number, full_name: string) => {
        if (confirm(`Are you sure you want to remove tenant ${full_name}?`)) {
            router.patch(route('tenants.removed', { tenant: id }));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tenants" />

            <div className="m-4 space-y-4">
                {flash.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Tenant Records</h2>
                    <Link href={route('tenants.create')}>
                        <Button>Register Tenant</Button>
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    'ID',
                                    'User ID',
                                    'Full Name',
                                    'Company Name',
                                    'Emergency Contact',
                                    'Email',
                                    'Personal Number',
                                    'Address',
                                    'Birthdate',
                                    'Status',
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
                                        colSpan={13}
                                        className="px-4 py-8 text-center text-gray-400"
                                    >
                                        No tenant records found.
                                    </td>
                                </tr>
                            ) : (
                                tenants.map((tenant) => {
                                    const colors = statusColor(tenant.status);
                                    return (
                                        <tr key={tenant.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-4 py-3 text-gray-600">{tenant.id}</td>
                                            <td className="px-4 py-3 text-gray-600">{tenant.user_id}</td>
                                            <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                                {tenant.full_name}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {tenant.company_name || '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {tenant.emergency_contact_number || '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {tenant.email || '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600">
                                                {tenant.personal_number || '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 max-w-[200px] truncate">
                                                {tenant.address || '—'}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {formatDate(tenant.birthdate)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${colors.badge}`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
                                                    {tenant.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {formatDate(tenant.created_at, true)}
                                            </td>
                                            <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                                {formatDate(tenant.updated_at, true)}
                                            </td>
                                            <td className="px-4 py-3">
                                                <div className="flex gap-2">
                                                    <Link href={route('tenants.edit', tenant.id)}>
                                                        <Button size="sm" variant="outline" className="flex items-center gap-2">
                                                            <Edit2 className="h-4 w-4" />
                                                            Edit
                                                        </Button>
                                                    </Link>
                                                    <Button
                                                        onClick={() => handleRemove(tenant.id, tenant.full_name)}
                                                        size="sm"
                                                        variant="destructive"
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                        Remove
                                                    </Button>
                                                </div>
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