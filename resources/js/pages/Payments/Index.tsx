import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Megaphone } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Payments', href: '/payments' },
];

interface Payment {
    id: number;
    tenant_id: number;
    full_name: string;
    billing_id: number;
    amount: number;
    payment_method: string;
    reference_number: string;
    verified_by: string;
    status: string;
    payment_date: string;
    created_at: string;
}

interface PageProps {
    flash: { message?: string };
    payments: Payment[];
}

const statusColor = (status: string) => {
    switch (status?.toLowerCase()) {
        case 'paid':     return 'bg-green-100 text-green-700';
        case 'pending':  return 'bg-yellow-100 text-yellow-700';
        case 'overdue':  return 'bg-red-100 text-red-700';
        default:         return 'bg-gray-100 text-gray-600';
    }
};

export default function Index() {
    const { flash, payments } = usePage().props as PageProps;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />

            <div className="m-4 space-y-4">
                {flash.message && (
                    <Alert>
                        <Megaphone className="h-4 w-4" />
                        <AlertTitle>Notification!</AlertTitle>
                        <AlertDescription>{flash.message}</AlertDescription>
                    </Alert>
                )}

                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Payment Records</h2>
                    <Link href={route('payments.create')}>
                        <Button>Create Payment</Button>
                    </Link>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                {[
                                    'Full Name',
                                    'Tenant ID',
                                    'Billing ID',
                                    'Amount',
                                    'Payment Method',
                                    'Reference No.',
                                    'Verified By',
                                    'Status',
                                    'Payment Date',
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
                            {payments.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="px-4 py-8 text-center text-gray-400"
                                    >
                                        No payment records found.
                                    </td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr key={payment.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                                            {payment.full_name}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {payment.tenant_id}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {payment.billing_id}
                                        </td>
                                        <td className="px-4 py-3 font-semibold text-gray-800">
                                            ₱{Number(payment.amount).toLocaleString('en-PH', { minimumFractionDigits: 2 })}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 capitalize">
                                            {payment.payment_method ?? '—'}
                                        </td>
                                        <td className="px-4 py-3 text-gray-500 font-mono text-xs">
                                            {payment.reference_number
                                                ? `${payment.reference_number.slice(0, 8)}…`
                                                : '—'}
                                        </td>
                                        <td className="px-4 py-3 text-gray-600">
                                            {payment.verified_by ?? '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusColor(payment.status)}`}>
                                                {payment.status ?? 'unknown'}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                                            {payment.payment_date
                                                ? new Date(payment.payment_date).toLocaleDateString('en-PH', {
                                                    year: 'numeric', month: 'short', day: 'numeric',
                                                })
                                                : '—'}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}