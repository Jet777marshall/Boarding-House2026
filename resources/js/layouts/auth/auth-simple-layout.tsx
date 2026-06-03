import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';

interface AuthLayoutProps {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#f4f3ef] text-slate-950 flex items-center justify-center px-6 py-10 dark:bg-[#050505] dark:text-white">
            <div className="w-full max-w-md">
                <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white/95 shadow-[0_32px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-white/10 dark:bg-[#0b0b0b] dark:shadow-[0_32px_80px_rgba(0,0,0,0.35)]">
                    <div className="border-b border-black/10 p-8 dark:border-white/10">
                        <Link href={route('home')} className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-slate-950 no-underline dark:text-slate-100">
                            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-slate-950 text-white dark:border-white/10 dark:bg-white dark:text-black">
                                <AppLogoIcon className="h-5 w-5" />
                            </div>
                            Maison Noir
                        </Link>

                        <div className="mt-8 space-y-3">
                            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h1>
                            <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">{description}</p>
                        </div>
                    </div>
                    <div className="p-8">{children}</div>
                </div>
            </div>
        </div>
    );
}
