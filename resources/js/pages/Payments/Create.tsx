    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AppLayout from '@/layouts/app-layout';
    import { type BreadcrumbItem } from '@/types';
    import { Head, useForm } from '@inertiajs/react';
    import { CircleAlert } from 'lucide-react';
    import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Create Payment',
            href: '/payments/create',
        },
    ];

    export default function Index() {

        const { data, setData, post, processing, errors } = useForm({
            full_name: '',         // kept for future dropdown
            tenant_id: '',
            billing_id: '',
            payment_date: '',
            payment_method: '',
            reference_number: '',
            verified_by: '',
            status: '',
        });

        const handleSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            post(route('payments.store'));
        };

        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Payments" />
                <div className='w-8/12 p-4'>
                    <form onSubmit={handleSubmit} className='space-y-4'>

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

                        {/* Full name — placeholder for future dropdown */}
                        <div className='gap-1.5'>
                            <Label htmlFor="full_name">Full Name</Label>
                            <Input
                                id="full_name"
                                placeholder="Tenant full name (dropdown coming soon)"
                                value={data.full_name}
                                onChange={(e) => setData('full_name', e.target.value)}
                            />
                        </div>

                        <div className='gap-1.5'>
                            <Label htmlFor="billing_id">Billing ID</Label>
                            <Input
                                id="billing_id"
                                placeholder="Billing ID"
                                value={data.billing_id}
                                onChange={(e) => setData('billing_id', e.target.value)}
                            />
                        </div>

                        <div className='gap-1.5'>
                            <Label htmlFor="tenant_id">Tenant ID</Label>
                            <Input
                                id="tenant_id"
                                placeholder="Tenant ID"
                                value={data.tenant_id}
                                onChange={(e) => setData('tenant_id', e.target.value)}
                            />
                        </div>


                        <div className='gap-1.5'>
                            <Label htmlFor="payment_date">Payment Date</Label>
                            <Input
                                id="payment_date"
                                type="date"
                                value={data.payment_date}
                                onChange={(e) => setData('payment_date', e.target.value)}
                            />
                        </div>

                        <div className='gap-1.5'>
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
                                <option value="bank_transfer">Bank Transfer</option>
                                <option value="check">Check</option>
                            </select>
                        </div>

                        <div className='gap-1.5'>
                            <Label htmlFor="reference_number">Reference Number</Label>
                            <Input
                                id="reference_number"
                                placeholder="Transaction / reference number"
                                value={data.reference_number}
                                onChange={(e) => setData('reference_number', e.target.value)}
                            />
                        </div>

                        <div className='gap-1.5'>
                            <Label htmlFor="verified_by">Verified By</Label>
                            <Input
                                id="verified_by"
                                placeholder="Staff name or ID"
                                value={data.verified_by}
                                onChange={(e) => setData('verified_by', e.target.value)}
                            />
                        </div>

                        <div className='gap-1.5'>
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                className="border-input bg-background flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            >
                                <option value="">Select status</option>
                                <option value="pending">Pending</option>
                                <option value="verified">Verified</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                       <Button type="submit">Create Bill</Button>

                    </form>
                </div>
            </AppLayout>
        );
    }