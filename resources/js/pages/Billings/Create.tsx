import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Bill',
        href: '/billings',
    },

];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Bill" />
            <div className='w-8/12 p-4'>
                <form>
                    <div className='gap-1.5'>
                        <Label htmlFor="due_date">Due Date</Label>
                        <Input
                            type="date"
                            id="due_date"
                        />
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="amount">Amount</Label>
                        <Input placeholder='Amount'></Input>
                    </div>
                    <div className='gap-1.5'>
                        <Label htmlFor="description">Description</Label>
                        <Textarea placeholder='Description'></Textarea>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
