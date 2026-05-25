import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Add Balance',
        href: '/balance_entries/create',
    },
];

interface PageProps {
    tenant_id?: number | string;
}

export default function CreateBalanceEntry() {
    const { tenant_id } = usePage().props as PageProps;

    const { data, setData, post, processing, errors } = useForm({
        tenant_id: tenant_id ?? '',
        amount: '',
        description: '',
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        post(route('balance_entries.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Balance" />
            <div className="w-full max-w-3xl p-4">
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

                    <div className="space-y-2">
                        <Label htmlFor="tenant_id">Tenant ID</Label>
                        <Input
                            id="tenant_id"
                            value={data.tenant_id}
                            onChange={(event) => setData('tenant_id', event.target.value)}
                            placeholder="Tenant ID"
                            readOnly={Boolean(tenant_id)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input
                            id="amount"
                            type="number"
                            step="0.01"
                            value={data.amount}
                            onChange={(event) => setData('amount', event.target.value)}
                            placeholder="Enter amount"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(event) => setData('description', event.target.value)}
                            placeholder="Description (optional)"
                        />
                    </div>

                    <Button type="submit" disabled={processing}>
                        Add balance
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
