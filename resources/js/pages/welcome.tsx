import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    const [ready, setReady] = useState(false);
    const [drift, setDrift] = useState(0);

    useEffect(() => {
        setReady(true);

        let frame = 0;
        const animate = (time: number) => {
            setDrift(Math.sin(time / 1200) * 18);
            frame = requestAnimationFrame(animate);
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <>
            <Head title="Maison Noir">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet" />
            </Head>

            <div className="min-h-screen bg-white text-[#111111] antialiased dark:bg-black dark:text-white">
                <div className="fixed inset-x-0 top-0 z-40 border-b border-black/10 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-black/70">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8">
                        <span className="text-sm font-semibold uppercase tracking-[0.35em]">Maison Noir</span>
                        <div className="hidden items-center gap-10 text-sm uppercase tracking-[0.35em] text-slate-600 dark:text-slate-300 md:flex">
                            <a href="#rooms" className="transition hover:text-black dark:hover:text-white">Rooms</a>
                            <a href="#house" className="transition hover:text-black dark:hover:text-white">House</a>
                            <a href="#stay" className="transition hover:text-black dark:hover:text-white">Stay</a>
                            <a href="#contact" className="transition hover:text-black dark:hover:text-white">Contact</a>
                        </div>
                        <div className="flex items-center gap-5">
                            <div className="flex items-center gap-6">
                                <a href={route('login')} className="text-sm uppercase tracking-[0.35em] text-slate-700 transition hover:text-black dark:text-slate-300 dark:hover:text-white">
                                    Log in
                                </a>
                                <a href={route('register')} className="text-sm uppercase tracking-[0.35em] text-slate-700 transition hover:text-black dark:text-slate-300 dark:hover:text-white">
                                    Register
                                </a>
                            </div>
                            <a
                                href="#contact"
                                className="rounded-full border border-black px-6 py-2 text-sm font-medium uppercase tracking-[0.35em] transition hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                            >
                                Reserve
                            </a>
                        </div>
                    </div>
                </div>

                <main className="relative overflow-hidden pt-24">
                    <div className={`mx-auto max-w-7xl px-6 pb-20 transition duration-700 ${ready ? 'opacity-100' : 'opacity-0 translate-y-6'} sm:px-8 lg:px-10`}>
                        <section id="house" className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
                            <div className="space-y-10">
                                <p className="text-xs uppercase tracking-[0.5em] text-slate-500 dark:text-slate-400">est. 1928 — a boarding house</p>
                                <div className="max-w-3xl space-y-6">
                                    <h1 className="text-5xl font-light leading-[0.95] sm:text-6xl lg:text-7xl">A quiet room. A shared table. Nothing more.</h1>
                                    <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                                        Maison Noir is a place for rest, writing, and slow mornings. Twelve rooms, one long table, and a calm house with an easy rhythm.
                                    </p>
                                </div>
                            </div>

                            <div
                                className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-black p-8 shadow-[0_40px_120px_rgba(0,0,0,0.12)] dark:border-white/10"
                                style={{ transform: `translateX(${drift}px)` }}
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.16),transparent_30%)]" />
                                <div className="relative space-y-7 text-white">
                                    <div className="text-xs uppercase tracking-[0.45em] text-slate-300">house notes</div>
                                    <div className="space-y-4">
                                        <p className="text-3xl font-semibold leading-tight">A few small agreements.</p>
                                        <p className="text-sm leading-7 text-slate-300">
                                            Quiet after ten, shoes at the door, and no keys — the house is kept as a shelter from noise and hurry.
                                        </p>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                                            <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Single room</p>
                                            <p className="mt-3 text-sm text-white/90">From €48 / night</p>
                                        </div>
                                        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
                                            <p className="text-xs uppercase tracking-[0.35em] text-slate-300">Long stay</p>
                                            <p className="mt-3 text-sm text-white/90">From €890 / month</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section id="stay" className="mt-24 grid gap-8 lg:grid-cols-3">
                            <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#111111] dark:text-white">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">01 — rooms</p>
                                <h2 className="mt-6 text-3xl font-medium">Simple. Bright. Yours.</h2>
                                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    A bed, a desk, a window. Linen sheets changed every other day. No television, no clutter — only small comforts.
                                </p>
                            </div>
                            <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#111111] dark:text-white">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">02 — the table</p>
                                <h2 className="mt-6 text-3xl font-medium">Meals taken together.</h2>
                                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    Breakfast is bread, fruit, eggs, and coffee. Supper is whatever the season offers, served at one long table.
                                </p>
                            </div>
                            <div className="rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-[#111111] dark:text-white">
                                <p className="text-xs uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">03 — the lounge</p>
                                <h2 className="mt-6 text-3xl font-medium">A room for reading.</h2>
                                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                                    An armchair, a lamp, and a shelf of books left by guests before you. Stay until the lamp is the only thing still on.
                                </p>
                            </div>
                        </section>

                        <section id="contact" className="mt-24 rounded-[2rem] border border-black/10 bg-black px-8 py-16 text-white shadow-[0_40px_120px_rgba(0,0,0,0.12)] sm:px-12 lg:px-16">
                            <div className="mx-auto max-w-3xl text-center">
                                <p className="text-xs uppercase tracking-[0.45em] text-slate-400">stay</p>
                                <h2 className="mt-6 text-4xl font-light leading-tight sm:text-5xl">Write to us.</h2>
                                <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                                    We answer letters in the order they arrive. Tell us the dates, how many of you, and whether you'd like a window on the garden or the street.
                                </p>
                                <a
                                    href="mailto:stay@maisonnoir.house"
                                    className="mt-10 inline-flex rounded-full border border-white px-8 py-3 text-sm uppercase tracking-[0.35em] transition hover:bg-white hover:text-black"
                                >
                                    stay@maisonnoir.house
                                </a>
                            </div>
                        </section>
                    </div>
                </main>
            </div>
        </>
    );
}
