import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { CircleAlert, ChevronsUpDown, Check } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Create Payment', href: '/payments/create' },
];

interface Tenant {
    id: number;
    full_name: string;
    billing_id: number | null;
}

interface Props {
    tenants: Tenant[];
}

export default function Index({ tenants }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        tenant_id: '',
        billing_id: '',
        amount: '',
        payment_method: '',
        reference_number: '',
        verified_by: '',
        status: '',
        payment_date: '', // ← add this
    });

    const [search, setSearch] = useState('');
    const [open, setOpen] = useState(false);
    const comboRef = useRef<HTMLDivElement>(null);

    const filtered = tenants.filter((t) =>
        t.full_name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (tenant: Tenant) => {
        setSearch(tenant.full_name);
        setData((prev) => ({
            ...prev,
            full_name: tenant.full_name,
            tenant_id: String(tenant.id),
            billing_id: tenant.billing_id ? String(tenant.billing_id) : '',
        }));
        setOpen(false);
    };

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (comboRef.current && !comboRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('payments.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Payments" />
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

                    {/* Searchable Tenant Name */}
                    <div className="gap-1.5" ref={comboRef}>
                        <Label htmlFor="full_name">Full Name</Label>
                        <div className="relative">
                            <div className="relative">
                                <Input
                                    id="full_name"
                                    placeholder="Search tenant name..."
                                    value={search}
                                    autoComplete="off"
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                        setOpen(true);
                                        setData((prev) => ({
                                            ...prev,
                                            full_name: '',
                                            tenant_id: '',
                                            billing_id: '',
                                        }));
                                    }}
                                    onFocus={() => setOpen(true)}
                                />
                                <ChevronsUpDown className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                            </div>

                            {open && filtered.length > 0 && (
                                <ul className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md border bg-popover shadow-md text-sm">
                                    {filtered.map((tenant) => (
                                        <li
                                            key={tenant.id}
                                            onMouseDown={() => handleSelect(tenant)}
                                            className={cn(
                                                'flex cursor-pointer items-center gap-2 px-3 py-2 hover:bg-accent hover:text-accent-foreground',
                                                data.tenant_id === String(tenant.id) && 'bg-accent'
                                            )}
                                        >
                                            <Check
                                                className={cn(
                                                    'h-4 w-4 shrink-0',
                                                    data.tenant_id === String(tenant.id)
                                                        ? 'opacity-100'
                                                        : 'opacity-0'
                                                )}
                                            />
                                            {tenant.full_name}
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {open && search.length > 0 && filtered.length === 0 && (
                                <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover px-3 py-2 text-sm text-muted-foreground shadow-md">
                                    No tenant found.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tenant ID — auto-filled, read-only */}
                    <div className="gap-1.5">
                        <Label htmlFor="tenant_id">Tenant ID</Label>
                        <Input
                            id="tenant_id"
                            placeholder="Auto-filled after selecting tenant"
                            value={data.tenant_id}
                            readOnly
                            className="bg-muted text-muted-foreground cursor-not-allowed"
                        />
                    </div>

                    {/* Billing ID — auto-filled, read-only */}
                    <div className="gap-1.5">
                        <Label htmlFor="billing_id">Billing ID</Label>
                        <Input
                            id="billing_id"
                            placeholder="Auto-filled from tenant's billing"
                            value={data.billing_id}
                            readOnly
                            className="bg-muted text-muted-foreground cursor-not-allowed"
                        />
                    </div>

                    {/* Amount */}
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

                    {/* Payment Date */}
                    <div className="gap-1.5">
                        <Label htmlFor="payment_date">Payment Date</Label>
                        <Input
                            id="payment_date"
                            type="datetime-local"
                            value={data.payment_date}
                            onChange={(e) => {
                                const val = e.target.value; // "2026-06-01T09:45"
                                const formatted = val ? val.replace('T', ' ') + ':00' : '';
                                // converts to "2026-06-01 09:45:00" ← matches Y-m-d H:i:s
                                setData('payment_date', formatted);
                            }}
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Create Payment
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}