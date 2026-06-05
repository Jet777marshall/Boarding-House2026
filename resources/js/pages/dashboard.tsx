import { Head, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const page = usePage<SharedData>();
    const user = page.props.auth?.user;
    const tenant = page.props.auth?.tenant;
    const greetingName = tenant?.full_name?.split(' ')[0] ?? user?.name ?? 'Guest';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-6 rounded-xl bg-white p-6 shadow-sm dark:bg-[#111111]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Dashboard</p>
                    <h1 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white">Welcome back, {greetingName}.</h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-400">
                        You are signed in and ready to manage your boarding house data from one place.
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Current User</p>
                        <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{tenant?.full_name ?? user?.name ?? 'Unknown'}</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tenant?.email ?? user?.email ?? 'No email available'}</p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Account Status</p>
                        <p className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">Active</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
