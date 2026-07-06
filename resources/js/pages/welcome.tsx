import { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';

const faqItems = [
    {
        question: 'What happens if I miss a day?',
        answer: 'Nothing dramatic. Your streak resets, the day just shows empty on the grid, and Loop moves on with you.',
    },
    {
        question: 'Can I track weekly habits, not just daily ones?',
        answer: 'Yes. Set any habit cadence to daily, a few times a week, or weekly — the grid adjusts automatically.',
    },
    {
        question: 'Is there a free plan?',
        answer: 'Loop is free for up to three habits. Beyond that, a small monthly plan unlocks unlimited habits and history export.',
    },
];

export default function Welcome() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState(0);
    const [count, setCount] = useState(0);
    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());

        const target = 42;
        const duration = 1200;
        const start = performance.now();

        const step = (time: number) => {
            const progress = Math.min((time - start) / duration, 1);
            setCount(Math.round(target * progress));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        const frame = requestAnimationFrame(step);
        return () => cancelAnimationFrame(frame);
    }, []);

    return (
        <>
            <Head title="Loop — Small routines, kept.">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#f7efe8] text-stone-900">
                <header className="site-header sticky top-0 z-40 border-b border-stone-900/10 bg-[#f7efe8]/90 backdrop-blur">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-10">
                        <a href="#top" className="flex items-center gap-3 text-lg font-semibold tracking-[0.2em] uppercase">
                            <span className="h-2.5 w-2.5 rounded-full bg-stone-900" aria-hidden="true" />
                            Loop
                        </a>

                        <nav className="main-nav hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.25em] text-stone-700 md:flex">
                            <a href="#how" className="transition hover:text-stone-950">How it works</a>
                            <a href="#photos" className="transition hover:text-stone-950">Inside Loop</a>
                            <a href="#streaks" className="transition hover:text-stone-950">Streaks</a>
                            <a href="#faq" className="transition hover:text-stone-950">FAQ</a>
                        </nav>

                        <div className="hidden items-center gap-3 md:flex">
                            <a href={route('login')} className="rounded-full border border-stone-900/20 px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] transition hover:bg-stone-900 hover:text-white">
                                Log in
                            </a>
                            <a href={route('register')} className="rounded-full bg-stone-900 px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] text-white transition hover:bg-stone-700">
                                Get started
                            </a>
                        </div>

                        <button
                            id="nav-toggle"
                            className="rounded-full border border-stone-900/20 p-2 md:hidden"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen((value) => !value)}
                        >
                            <span className="block h-0.5 w-5 bg-stone-900" />
                            <span className="mt-1 block h-0.5 w-5 bg-stone-900" />
                            <span className="mt-1 block h-0.5 w-5 bg-stone-900" />
                        </button>
                    </div>

                    {mobileMenuOpen ? (
                        <div className="border-t border-stone-900/10 bg-[#f7efe8] px-6 py-4 md:hidden">
                            <div className="flex flex-col gap-3 text-sm font-medium uppercase tracking-[0.25em] text-stone-700">
                                <a href="#how" onClick={() => setMobileMenuOpen(false)}>How it works</a>
                                <a href="#photos" onClick={() => setMobileMenuOpen(false)}>Inside Loop</a>
                                <a href="#streaks" onClick={() => setMobileMenuOpen(false)}>Streaks</a>
                                <a href="#faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                            </div>
                        </div>
                    ) : null}
                </header>

                <main id="top">
                    <section className="mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28" id="intro">
                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-stone-600">Habit tracking, without the guilt trip</p>
                            <h1 className="mt-6 font-['Fraunces'] text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                                Small routines,
                                <span className="block text-stone-700">kept honestly.</span>
                            </h1>
                            <p className="mt-8 max-w-xl text-lg leading-8 text-stone-700">
                                Loop is a quiet place to track the habits you actually care about — no streak-shaming, no gamified pressure.
                                Just a clear picture of what you showed up for.
                            </p>

                            <form id="signup-form" className="mt-10 flex flex-col gap-3 sm:flex-row">
                                <label htmlFor="email" className="sr-only">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-full border border-stone-300 bg-white px-5 py-3 text-sm outline-none ring-0 placeholder:text-stone-400 focus:border-stone-900"
                                    required
                                />
                                <button type="submit" className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-stone-700">
                                    Start your first loop
                                </button>
                            </form>
                            <p className="mt-4 text-sm text-stone-600">Free for your first 3 habits. No card needed.</p>
                        </div>

                        <div className="relative">
                            <figure className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white p-3 shadow-[0_25px_80px_rgba(0,0,0,0.12)]">
                                <img
                                    src="https://picsum.photos/id/1005/900/1100"
                                    alt="Person journaling with a cup of coffee, tracking a morning routine"
                                    className="h-full w-full rounded-[1.5rem] object-cover"
                                />
                                <figcaption className="px-2 pb-2 pt-4 text-sm text-stone-600">Morning pages, day 42.</figcaption>
                            </figure>
                            <div className="absolute -bottom-5 left-5 rounded-full border border-stone-900/10 bg-white px-5 py-3 shadow-lg">
                                <span className="text-3xl font-semibold text-stone-900">{count}</span>
                                <span className="ml-2 text-sm uppercase tracking-[0.25em] text-stone-500">day streak</span>
                            </div>
                        </div>
                    </section>

                    <section className="border-y border-stone-900/10 bg-white/70" id="how">
                        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10">
                            <h2 className="text-3xl font-semibold sm:text-4xl">Three honest steps</h2>
                            <p className="mt-3 max-w-2xl text-lg leading-8 text-stone-700">No onboarding maze. Loop gets out of the way fast.</p>

                            <div className="mt-12 grid gap-6 lg:grid-cols-3">
                                {[
                                    ['01', 'Name the routine', 'Write it the way you would say it out loud — “stretch after coffee,” not “Habit_003.”'],
                                    ['02', 'Mark it, don’t manage it', 'One tap logs the day. No notes, no mood scores, unless you actually want them.'],
                                    ['03', 'See the honest shape of it', 'Loop shows real patterns — including the gaps — instead of hiding misses behind a badge.'],
                                ].map(([index, title, copy]) => (
                                    <article key={title} className="rounded-[2rem] border border-stone-900/10 bg-[#f7efe8] p-8 shadow-sm">
                                        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">{index}</span>
                                        <h3 className="mt-5 text-2xl font-semibold">{title}</h3>
                                        <p className="mt-4 text-base leading-7 text-stone-700">{copy}</p>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10" id="photos">
                        <h2 className="text-3xl font-semibold sm:text-4xl">What Loop looks like in a real day</h2>
                        <p className="mt-3 max-w-2xl text-lg leading-8 text-stone-700">A few sample moments from people using their loops.</p>

                        <div className="mt-12 grid gap-6 md:grid-cols-2">
                            <figure className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white shadow-sm md:col-span-2">
                                <img src="https://picsum.photos/id/1011/1000/700" alt="Runner tying shoes before a morning run" className="h-72 w-full object-cover" />
                                <figcaption className="px-5 py-4 text-sm text-stone-600">Run habit — logged before the coffee’s even ready.</figcaption>
                            </figure>
                            <figure className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white shadow-sm">
                                <img src="https://picsum.photos/id/1025/700/900" alt="Dog resting beside a reading habit tracker on a desk" className="h-72 w-full object-cover" />
                                <figcaption className="px-5 py-4 text-sm text-stone-600">Reading, 15 minutes a night.</figcaption>
                            </figure>
                            <figure className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white shadow-sm">
                                <img src="https://picsum.photos/id/292/700/900" alt="Hands typing on a laptop for a daily writing habit" className="h-72 w-full object-cover" />
                                <figcaption className="px-5 py-4 text-sm text-stone-600">200 words, most days.</figcaption>
                            </figure>
                            <figure className="overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white shadow-sm md:col-span-2">
                                <img src="https://picsum.photos/id/1080/1000/700" alt="Plants being watered as part of a weekly care routine" className="h-72 w-full object-cover" />
                                <figcaption className="px-5 py-4 text-sm text-stone-600">Watering day — a weekly loop, not a daily one.</figcaption>
                            </figure>
                        </div>
                    </section>

                    <section className="bg-white/70 py-20" id="streaks">
                        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
                            <div>
                                <h2 className="text-3xl font-semibold sm:text-4xl">The grid tells the truth</h2>
                                <p className="mt-5 text-lg leading-8 text-stone-700">
                                    Every square is a real day. Filled means you showed up. Empty means you didn’t — and that’s fine, it’s just data.
                                </p>
                                <ul className="mt-8 space-y-3 text-sm uppercase tracking-[0.25em] text-stone-600">
                                    <li className="flex items-center gap-3"><span className="h-3.5 w-3.5 rounded-full bg-stone-900" /> Logged</li>
                                    <li className="flex items-center gap-3"><span className="h-3.5 w-3.5 rounded-full border border-stone-200 bg-transparent" /> Skipped</li>
                                    <li className="flex items-center gap-3"><span className="h-3.5 w-3.5 rounded-full bg-amber-400" /> Today</li>
                                </ul>
                            </div>

                            <div className="grid grid-cols-12 gap-2 sm:gap-3">
                                {Array.from({ length: 84 }, (_, index) => {
                                    const filled = index % 5 !== 0 && index % 11 !== 0;
                                    const today = index === 83;
                                    return (
                                        <div
                                            key={index}
                                            className={`h-4 w-4 rounded-[0.25rem] sm:h-5 sm:w-5 ${today ? 'bg-amber-400' : filled ? 'bg-stone-900' : 'border border-stone-200 bg-transparent'}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10" id="faq">
                        <h2 className="text-3xl font-semibold sm:text-4xl">Questions, answered plainly</h2>
                        <div className="mt-10 space-y-4">
                            {faqItems.map((item, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div key={item.question} className="accordion-item rounded-[1.5rem] border border-stone-900/10 bg-white p-6 shadow-sm">
                                        <button
                                            className="accordion-trigger flex w-full items-center justify-between text-left"
                                            aria-expanded={isOpen}
                                            onClick={() => setOpenFaq(isOpen ? -1 : index)}
                                        >
                                            <span className="text-lg font-semibold">{item.question}</span>
                                            <span className="text-2xl text-stone-500">{isOpen ? '−' : '+'}</span>
                                        </button>
                                        {isOpen ? (
                                            <div className="accordion-panel mt-4 max-w-2xl text-base leading-7 text-stone-700">
                                                <p>{item.answer}</p>
                                            </div>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10" id="signup">
                        <div className="rounded-[2rem] border border-stone-900/10 bg-stone-900 px-8 py-16 text-white shadow-[0_25px_80px_rgba(0,0,0,0.16)] sm:px-12 lg:px-16">
                            <h2 className="text-3xl font-semibold sm:text-4xl">Start a loop you can actually keep.</h2>
                            <form id="signup-form-footer" className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <label htmlFor="email-footer" className="sr-only">Email address</label>
                                <input
                                    id="email-footer"
                                    name="email-footer"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white outline-none placeholder:text-stone-300 focus:border-white"
                                    required
                                />
                                <button type="submit" className="rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-900 transition hover:bg-stone-200">
                                    Get started free
                                </button>
                            </form>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-stone-900/10 bg-[#f7efe8]">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                        <p>© <span id="year">{year}</span> Loop. Small routines, kept.</p>
                        <a href="#top" className="uppercase tracking-[0.25em] transition hover:text-stone-900">Back to top</a>
                    </div>
                </footer>
            </div>
        </>
    );
}
