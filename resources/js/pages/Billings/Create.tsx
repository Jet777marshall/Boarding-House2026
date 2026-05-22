import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { CircleAlert } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Bill',
        href: '/billings',
    },

];

export default function Index() {
    const { props } = usePage();
    const initialTenantId = (props as any).tenant_id ?? '';

    const { data, setData, post, processing, errors } = useForm({
        tenant_id: initialTenantId,
        due_date: '',
        amount: '',
        description: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('billings.store'));
    }


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Bill" />
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

                    <div className='gap-1.5'>
                        <Label htmlFor="tenant_id">Tenant ID</Label>
                        <Input readOnly placeholder='Tenant ID' value={data.tenant_id} onChange={(e) => setData('tenant_id', e.target.value)}></Input>
                    </div>

                    <div className='gap-1.5'>
                        <Label htmlFor="Due_date">Due Date</Label>
                        <Input
                            type="date"
                            id="due_date"
                            value={data.due_date}
                            onChange={(e) => setData('due_date', e.target.value)}
                        />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="amount">Amount</Label>
                        <Input placeholder='Amount' value={data.amount} onChange={(e) => setData('amount', e.target.value)}></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea placeholder='Description' value={data.description} onChange={(e) => setData('description', e.target.value)}></Textarea>
                    </div>
                    <Button type="submit">Create Bill</Button>
                </form>
            </div>
        </AppLayout>
    );
}
