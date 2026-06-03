import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email" className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-slate-600 dark:text-slate-400">
                            Email address
                        </Label>
                        <Input
                            className="bg-slate-50 text-slate-950 border-slate-200 placeholder:text-slate-400 focus:border-black focus:ring-black/10 dark:bg-[#111111] dark:border-white/10 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white"
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password" className="text-[0.7rem] font-normal uppercase tracking-[0.28em] text-slate-600 dark:text-slate-400">
                                Password
                            </Label>
                            {canResetPassword && (
                                <TextLink href={route('password.request')} className="ml-auto text-sm text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white" tabIndex={5}>
                                    Forgot password?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            className="bg-slate-50 text-slate-950 border-slate-200 placeholder:text-slate-400 focus:border-black focus:ring-black/10 dark:bg-[#111111] dark:border-white/10 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-white"
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Checkbox id="remember" name="remember" tabIndex={3} />
                        <Label htmlFor="remember" className="text-sm text-slate-700 dark:text-slate-300">
                            Remember me
                        </Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full" size="lg" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Log in
                    </Button>
                </div>

                <div className="text-center text-sm text-slate-500 dark:text-slate-400">
                    Don't have an account?{' '}
                    <TextLink href={route('register')} className="font-semibold text-slate-900 hover:text-black dark:text-slate-100 dark:hover:text-white" tabIndex={5}>
                        Sign up
                    </TextLink>
                </div>
            </form>

            {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
        </AuthLayout>
    );
}
