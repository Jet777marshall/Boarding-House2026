import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';

interface Payment {
    id: number;
    tenant_id: number;
    billing_id: number;
    full_name: string;
    amount: string;
    payment_method: string;
    reference_number: string;
    verified_by: string;
    status: string;
    payment_date: string;
}

interface Props {
    payment: Payment;
}

export default function Edit({ payment }: Props) {
    const { data, setData, patch, processing, errors } = useForm({
        amount:           payment.amount,
        payment_method:   payment.payment_method ?? '',
        reference_number: payment.reference_number ?? '',
        verified_by:      payment.verified_by ?? '',
        status:           payment.status ?? '',
        payment_date:     payment.payment_date
            ? payment.payment_date.slice(0, 19).replace('T', ' ')
            : '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(route('payments.update', payment.id));
    };

    return (
        <AppLayout breadcrumbs={[{ title: 'Edit Payment', href: `/payments/${payment.id}/edit` }]}>
            <Head title="Edit Payment" />
            <div className="w-8/12 p-4">
                <form onSubmit={handleSubmit} className="space-y-4">

                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive">
                            <CircleAlert className="h-4 w-4" />
                            <AlertTitle>Validation Error</AlertTitle>
                            <AlertDescription>
                                <ul className="list-disc pl-4 space-y-1">
                                    {Object.values(errors).map((error, index) => (
                                        <li key={index}>{error}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    {/* Read-only fields */}
                    <div className="gap-1.5">
                        <Label>Full Name</Label>
                        <Input
                            readOnly
                            value={payment.full_name}
                            className="bg-muted text-muted-foreground cursor-not-allowed"
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label>Tenant ID</Label>
                        <Input
                            readOnly
                            value={payment.tenant_id}
                            className="bg-muted text-muted-foreground cursor-not-allowed"
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label>Billing ID</Label>
                        <Input
                            readOnly
                            value={payment.billing_id}
                            className="bg-muted text-muted-foreground cursor-not-allowed"
                        />
                    </div>

                    {/* Editable fields */}
                    <div className="gap-1.5">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="Enter payment amount"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="payment_method">Payment Method</Label>
                        <select
                            id="payment_method"
                            value={data.payment_method}
                            onChange={(e) => setData('payment_method', e.target.value)}
                            className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="">Select payment method</option>
                            <option value="cash">Cash</option>
                            <option value="gcash">GCash</option>
                            <option value="maya">Maya</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="check">Check</option>
                        </select>
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="reference_number">Reference Number</Label>
                        <Input
                            id="reference_number"
                            placeholder="Transaction / reference number"
                            value={data.reference_number}
                            onChange={(e) => setData('reference_number', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="verified_by">Verified By</Label>
                        <Input
                            id="verified_by"
                            placeholder="Staff name or ID"
                            value={data.verified_by}
                            onChange={(e) => setData('verified_by', e.target.value)}
                        />
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="status">Status</Label>
                        <select
                            id="status"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                            className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                            <option value="">Select status</option>
                            <option value="pending">Partial</option>
                            <option value="verified">Full Payment</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="gap-1.5">
                        <Label htmlFor="payment_date">Payment Date</Label>
                        <Input
                            id="payment_date"
                            type="datetime-local"
                            value={data.payment_date ? data.payment_date.slice(0, 16).replace(' ', 'T') : ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                const formatted = val ? val.replace('T', ' ') + ':00' : '';
                                setData('payment_date', formatted);
                            }}
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update Payment
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}