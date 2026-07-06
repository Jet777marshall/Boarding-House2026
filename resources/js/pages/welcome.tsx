import { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { 
    PenLine, 
    MousePointerClick, 
    LineChart, 
    ArrowRight,
    Menu,
    X,
    CheckCircle,
    Calendar,
    TrendingUp,
    Sparkles,
    Users,
    Shield,
    Zap,
    ChevronRight
} from 'lucide-react';

// Animation variants for framer-motion style animations
const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

const faqItems = [
    {
        question: 'What happens if I miss a day?',
        answer: 'Nothing dramatic. Your streak resets, the day just shows empty on the grid, and Loop moves on with you.'
    },
    {
        question: 'Can I track weekly habits, not just daily ones?',
        answer: 'Yes. Set any habit cadence to daily, a few times a week, or weekly — the grid adjusts automatically.'
    },
    {
        question: 'Is there a free plan?',
        answer: 'Loop is free for up to three habits. Beyond that, a small monthly plan unlocks unlimited habits and history export.'
    },
    {
        question: 'How does Loop handle privacy?',
        answer: 'Your data stays yours. We don\'t sell or share your habit data with anyone. Everything is encrypted.'
    },
    {
        question: 'Can I export my data?',
        answer: 'Yes! You can export your full habit history as CSV or JSON at any time from the settings page.'
    }
];

const steps = [
    {
        index: '01',
        title: 'Name the routine',
        copy: 'Write it the way you would say it out loud — "stretch after coffee," not "Habit_003."',
        image: 'https://picsum.photos/id/20/700/500',
        alt: 'Open notebook with a pen, used to jot down a new routine',
        Icon: PenLine,
        color: 'from-amber-500/20 to-amber-500/5'
    },
    {
        index: '02',
        title: "Mark it, don't manage it",
        copy: 'One tap logs the day. No notes, no mood scores, unless you actually want them.',
        image: 'https://picsum.photos/id/96/700/500',
        alt: 'Hand tapping a phone screen to log a habit',
        Icon: MousePointerClick,
        color: 'from-blue-500/20 to-blue-500/5'
    },
    {
        index: '03',
        title: 'See the honest shape of it',
        copy: 'Loop shows real patterns — including the gaps — instead of hiding misses behind a badge.',
        image: 'https://picsum.photos/id/1040/700/500',
        alt: 'Notebook with a hand-drawn chart showing progress over time',
        Icon: LineChart,
        color: 'from-emerald-500/20 to-emerald-500/5'
    }
];

const testimonials = [
    {
        name: 'Sarah K.',
        role: 'Product Designer',
        content: 'Loop helped me build a consistent meditation practice without the pressure of maintaining a perfect streak.',
        avatar: 'https://picsum.photos/id/64/100/100'
    },
    {
        name: 'Mike R.',
        role: 'Software Engineer',
        content: 'The simplicity is what I love most. No bells and whistles, just a clear view of my habits.',
        avatar: 'https://picsum.photos/id/65/100/100'
    },
    {
        name: 'Emma L.',
        role: 'Writer',
        content: 'Finally a habit tracker that doesn\'t guilt-trip me. It\'s honest and encouraging.',
        avatar: 'https://picsum.photos/id/66/100/100'
    }
];

export default function Welcome() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [count, setCount] = useState(0);
    const [year] = useState(new Date().getFullYear());
    const [isVisible, setIsVisible] = useState(false);
    const [hoveredStep, setHoveredStep] = useState<number | null>(null);
    const [animatedGrid, setAnimatedGrid] = useState<boolean[]>([]);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSuccess, setEmailSuccess] = useState('');
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    
    const heroRef = useRef<HTMLElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Animated counter effect
    useEffect(() => {
        const target = 42;
        const duration = 1500;
        const startTime = performance.now();

        const animateCounter = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.round(target * easeOut);
            
            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            }
        };

        requestAnimationFrame(animateCounter);
    }, []);

    // Grid animation
    useEffect(() => {
        const gridSize = 84;
        const initialGrid = Array(gridSize).fill(false);
        setAnimatedGrid(initialGrid);

        // Animate grid filling with random delay
        const fillGrid = () => {
            const newGrid = [...initialGrid];
            let filled = 0;
            const totalToFill = Math.floor(gridSize * 0.7);

            const interval = setInterval(() => {
                if (filled >= totalToFill) {
                    clearInterval(interval);
                    return;
                }

                // Find random empty slot
                const emptyIndices = newGrid
                    .map((val, idx) => val ? -1 : idx)
                    .filter(idx => idx !== -1);
                
                if (emptyIndices.length === 0) return;
                
                const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
                newGrid[randomIndex] = true;
                setAnimatedGrid([...newGrid]);
                filled++;
            }, 20);
        };

        // Start after a delay
        const timeout = setTimeout(fillGrid, 500);
        return () => {
            clearTimeout(timeout);
            clearInterval(0);
        };
    }, []);

    // Intersection Observer for scroll animations
    useEffect(() => {
        observerRef.current = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        document.querySelectorAll('.reveal').forEach(el => {
            observerRef.current?.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            setEmailSuccess('');
            return;
        }

        setEmailError('');
        setEmailSuccess(`You're on the list — check ${email} soon.`);
        setEmail('');
        setTimeout(() => setEmailSuccess(''), 3000);
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const renderGrid = () => {
        return Array.from({ length: 84 }, (_, index) => {
            const filled = animatedGrid[index] || false;
            const isToday = index === 83;
            const shouldBeFilled = index % 5 !== 0 && index % 11 !== 0;
            const isFilled = filled && shouldBeFilled;

            return (
                <div
                    key={index}
                    className={`streak-day transition-all duration-300 ease-out ${
                        isToday 
                            ? 'bg-amber-400 ring-2 ring-amber-500 ring-offset-2' 
                            : isFilled 
                            ? 'bg-stone-900 opacity-100' 
                            : 'border border-stone-200 bg-transparent'
                    }`}
                    style={{
                        transform: isFilled ? 'scale(1)' : 'scale(0.9)',
                        opacity: isFilled ? 1 : 0.3,
                        transitionDelay: `${(index % 12) * 10}ms`
                    }}
                />
            );
        });
    };

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
                <header className="site-header sticky top-0 z-40 border-b border-stone-900/10 bg-[#f7efe8]/90 backdrop-blur-lg">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8 lg:px-10">
                        <a href="#top" className="logo flex items-center gap-3 text-lg font-semibold tracking-[0.2em] uppercase">
                            <span className="logo-mark h-2.5 w-2.5 rounded-full bg-stone-900 transition-all duration-300 hover:scale-150" />
                            Loop
                        </a>

                        <nav className="main-nav hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.25em] text-stone-700 md:flex">
                            <a href="#how" className="relative transition hover:text-stone-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full">
                                How it works
                            </a>
                            <a href="#features" className="relative transition hover:text-stone-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full">
                                Features
                            </a>
                            <a href="#testimonials" className="relative transition hover:text-stone-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full">
                                Testimonials
                            </a>
                            <a href="#faq" className="relative transition hover:text-stone-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full">
                                FAQ
                            </a>
                        </nav>

                        <div className="hidden items-center gap-3 md:flex">
                            <a 
                                href={route('login')} 
                                className="group rounded-full border border-stone-900/20 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] transition-all hover:border-stone-900 hover:bg-stone-900 hover:text-white"
                            >
                                Log in
                            </a>
                            <a 
                                href={route('register')} 
                                className="group relative overflow-hidden rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-700"
                            >
                                <span className="relative z-10">Get started</span>
                                <span className="absolute inset-0 translate-y-full bg-amber-500 transition-transform duration-300 group-hover:translate-y-0" />
                            </a>
                        </div>

                        <button
                            id="nav-toggle"
                            className="rounded-full border border-stone-900/20 p-2 md:hidden transition-all hover:bg-stone-900/5"
                            aria-label="Toggle menu"
                            aria-expanded={mobileMenuOpen}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X className="h-5 w-5" />
                            ) : (
                                <div className="flex flex-col gap-1.5">
                                    <span className="block h-0.5 w-5 bg-stone-900 transition-all duration-300" />
                                    <span className="block h-0.5 w-5 bg-stone-900 transition-all duration-300" />
                                    <span className="block h-0.5 w-5 bg-stone-900 transition-all duration-300" />
                                </div>
                            )}
                        </button>
                    </div>

                    <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="border-t border-stone-900/10 bg-[#f7efe8] px-6 py-4">
                            <div className="flex flex-col gap-3 text-sm font-medium uppercase tracking-[0.25em] text-stone-700">
                                <a 
                                    href="#how" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="transition hover:text-stone-950 hover:pl-2"
                                >
                                    How it works
                                </a>
                                <a 
                                    href="#features" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="transition hover:text-stone-950 hover:pl-2"
                                >
                                    Features
                                </a>
                                <a 
                                    href="#testimonials" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="transition hover:text-stone-950 hover:pl-2"
                                >
                                    Testimonials
                                </a>
                                <a 
                                    href="#faq" 
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="transition hover:text-stone-950 hover:pl-2"
                                >
                                    FAQ
                                </a>
                                <div className="mt-4 flex flex-col gap-3">
                                    <a 
                                        href={route('login')} 
                                        className="rounded-full border border-stone-900/20 px-4 py-2.5 text-center transition hover:bg-stone-900 hover:text-white"
                                    >
                                        Log in
                                    </a>
                                    <a 
                                        href={route('register')} 
                                        className="rounded-full bg-stone-900 px-4 py-2.5 text-center text-white transition hover:bg-stone-700"
                                    >
                                        Get started
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main id="top">
                    {/* Hero Section */}
                    <section ref={heroRef} className="relative overflow-hidden" id="intro">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-amber-200/20 blur-3xl" />
                            <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
                        </div>

                        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800">
                                    <Sparkles className="h-4 w-4" />
                                    New — Available now
                                </div>
                                <h1 className="mt-6 font-['Fraunces'] text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                                    Small routines,
                                    <span className="block text-stone-700 relative">
                                        kept honestly.
                                        <span className="absolute -bottom-2 left-0 h-2 w-24 bg-amber-400/30 rounded-full blur-sm" />
                                    </span>
                                </h1>
                                <p className="mt-8 max-w-xl text-lg leading-8 text-stone-700">
                                    Loop is a quiet place to track the habits you actually care about — no streak-shaming, no gamified pressure.
                                    Just a clear picture of what you showed up for.
                                </p>

                                <form onSubmit={handleEmailSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row">
                                    <div className="relative flex-1">
                                        <label htmlFor="email" className="sr-only">Email address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={`w-full rounded-full border bg-white px-5 py-3.5 text-sm outline-none ring-0 placeholder:text-stone-400 transition-all focus:ring-2 ${
                                                emailError ? 'border-red-400 ring-red-200' : 'border-stone-300 focus:border-stone-900 focus:ring-stone-200'
                                            }`}
                                            required
                                        />
                                        {emailError && (
                                            <p className="absolute -bottom-6 left-4 text-xs text-red-500">{emailError}</p>
                                        )}
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="group relative overflow-hidden rounded-full bg-stone-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-700"
                                    >
                                        <span className="relative z-10">Start your first loop</span>
                                        <span className="absolute inset-0 translate-y-full bg-amber-500 transition-transform duration-300 group-hover:translate-y-0" />
                                    </button>
                                </form>
                                {emailSuccess && (
                                    <p className="mt-2 text-sm text-emerald-600 animate-in slide-in-from-top-2 duration-300">
                                        {emailSuccess}
                                    </p>
                                )}
                                <p className="mt-4 text-sm text-stone-600">Free for your first 3 habits. No card needed.</p>

                                <div className="mt-8 flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                                        <span className="text-stone-600">Free forever plan</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-emerald-600" />
                                        <span className="text-stone-600">Privacy-first</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative">
                                <figure className="group overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white p-3 shadow-[0_25px_80px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_35px_100px_rgba(0,0,0,0.2)] hover:-translate-y-2">
                                    <img
                                        src="https://picsum.photos/id/1005/900/1100"
                                        alt="Person journaling with a cup of coffee, tracking a morning routine"
                                        className="h-full w-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <figcaption className="px-2 pb-2 pt-4 text-sm text-stone-600 flex items-center gap-2">
                                        <Calendar className="h-4 w-4" />
                                        Morning pages, day 42.
                                    </figcaption>
                                </figure>
                                <div className="absolute -bottom-5 left-5 animate-bounce-slow rounded-full border border-stone-900/10 bg-white px-5 py-3 shadow-lg">
                                    <span className="text-3xl font-semibold text-stone-900 tabular-nums">{count}</span>
                                    <span className="ml-2 text-sm uppercase tracking-[0.25em] text-stone-500">day streak</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* How It Works Section */}
                    <section className="relative overflow-hidden border-y border-stone-900/10 bg-white/70" id="how">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
                            <div className="absolute -left-24 bottom-24 h-64 w-64 rounded-full bg-emerald-200/30 blur-3xl" />
                        </div>

                        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                                <div className="reveal">
                                    <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">The process</p>
                                    <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">Three honest steps</h2>
                                </div>
                                <p className="max-w-sm text-lg leading-7 text-stone-700 reveal">
                                    No onboarding maze. Loop gets out of the way fast.
                                </p>
                            </div>

                            <div className="relative mt-16 grid gap-8 lg:grid-cols-3">
                                <div
                                    className="pointer-events-none absolute left-[16.5%] right-[16.5%] top-[7.5rem] hidden h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent lg:block"
                                    aria-hidden="true"
                                />

                                {steps.map(({ index, title, copy, image, alt, Icon, color }, i) => (
                                    <article
                                        key={title}
                                        className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-stone-900/10 bg-[#f7efe8] shadow-sm transition-all duration-500 ${
                                            hoveredStep === i ? '-translate-y-3 shadow-xl shadow-stone-900/10' : ''
                                        }`}
                                        onMouseEnter={() => setHoveredStep(i)}
                                        onMouseLeave={() => setHoveredStep(null)}
                                    >
                                        <div className="relative h-52 overflow-hidden">
                                            <img
                                                src={image}
                                                alt={alt}
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
                                            <span className="absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 font-mono text-xs font-semibold text-stone-900 shadow-sm transition-all duration-300 group-hover:scale-110">
                                                {index}
                                            </span>
                                        </div>

                                        <div className="flex flex-1 flex-col p-8">
                                            <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-500`}>
                                                <Icon className="h-5 w-5" strokeWidth={1.75} />
                                            </div>
                                            <h3 className="text-2xl font-semibold">{title}</h3>
                                            <p className="mt-4 flex-1 text-base leading-7 text-stone-700">{copy}</p>

                                            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-stone-600 group-hover:text-stone-900 transition-colors">
                                                Learn more
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Features Section */}
                    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10" id="features">
                        <div className="text-center max-w-2xl mx-auto reveal">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Features</p>
                            <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">Everything you need, nothing you don't</h2>
                            <p className="mt-4 text-lg text-stone-700">Simple, focused, and designed to help you build lasting habits.</p>
                        </div>

                        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                { icon: Calendar, title: 'Daily Tracking', desc: 'Log your habits with a single tap. No complicated forms or inputs.' },
                                { icon: TrendingUp, title: 'Honest Insights', desc: 'See your real patterns, including the gaps. No sugar-coating.' },
                                { icon: Zap, title: 'Lightning Fast', desc: 'Open the app, tap once, and you\'re done. That\'s it.' },
                                { icon: Shield, title: 'Privacy First', desc: 'Your data stays yours. Encrypted and never shared.' },
                                { icon: Users, title: 'Community', desc: 'Join thousands of people building better routines.' },
                                { icon: Sparkles, title: 'Free to Start', desc: 'Get started with 3 habits for free. No credit card needed.' }
                            ].map((feature, index) => (
                                <div 
                                    key={index}
                                    className="group p-6 rounded-2xl border border-stone-900/10 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 reveal"
                                    style={{ transitionDelay: `${index * 100}ms` }}
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-white transition-all duration-300 group-hover:bg-amber-500 group-hover:scale-110">
                                        <feature.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                                    <p className="mt-2 text-stone-700">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Grid Section */}
                    <section className="bg-white/70 py-20" id="streaks">
                        <div className="mx-auto grid max-w-7xl gap-12 px-6 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
                            <div className="reveal">
                                <h2 className="text-3xl font-semibold sm:text-4xl">The grid tells the truth</h2>
                                <p className="mt-5 text-lg leading-8 text-stone-700">
                                    Every square is a real day. Filled means you showed up. Empty means you didn't — and that's fine, it's just data.
                                </p>
                                <ul className="mt-8 space-y-3 text-sm uppercase tracking-[0.25em] text-stone-600">
                                    <li className="flex items-center gap-3">
                                        <span className="h-3.5 w-3.5 rounded-full bg-stone-900 transition-all duration-300 hover:scale-125" /> 
                                        Logged
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="h-3.5 w-3.5 rounded-full border border-stone-200 bg-transparent transition-all duration-300 hover:scale-125" /> 
                                        Skipped
                                    </li>
                                    <li className="flex items-center gap-3">
                                        <span className="h-3.5 w-3.5 rounded-full bg-amber-400 animate-pulse transition-all duration-300 hover:scale-125" /> 
                                        Today
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-white rounded-2xl p-6 shadow-lg border border-stone-900/10 reveal">
                                <div className="grid grid-cols-12 gap-1.5 sm:gap-2">
                                    {renderGrid()}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10" id="testimonials">
                        <div className="text-center max-w-2xl mx-auto reveal">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Testimonials</p>
                            <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">What people are saying</h2>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-3">
                            {testimonials.map((testimonial, index) => (
                                <div 
                                    key={index}
                                    className={`p-6 rounded-2xl border border-stone-900/10 bg-white shadow-sm transition-all duration-500 ${
                                        activeTestimonial === index 
                                            ? 'ring-2 ring-amber-400 ring-offset-2 scale-105' 
                                            : 'hover:shadow-lg hover:-translate-y-1'
                                    }`}
                                    style={{ 
                                        opacity: activeTestimonial === index ? 1 : 0.7,
                                        transform: activeTestimonial === index ? 'scale(1.05)' : 'scale(1)'
                                    }}
                                >
                                    <div className="flex items-center gap-4">
                                        <img 
                                            src={testimonial.avatar} 
                                            alt={testimonial.name}
                                            className="h-12 w-12 rounded-full object-cover"
                                        />
                                        <div>
                                            <h4 className="font-semibold">{testimonial.name}</h4>
                                            <p className="text-sm text-stone-600">{testimonial.role}</p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-stone-700 leading-relaxed">"{testimonial.content}"</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8 lg:px-10" id="faq">
                        <div className="text-center reveal">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">FAQ</p>
                            <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">Questions, answered plainly</h2>
                        </div>

                        <div className="mt-10 space-y-4">
                            {faqItems.map((item, index) => {
                                const isOpen = openFaq === index;
                                return (
                                    <div 
                                        key={item.question} 
                                        className={`rounded-2xl border border-stone-900/10 bg-white shadow-sm transition-all duration-300 ${
                                            isOpen ? 'ring-2 ring-amber-400/50 ring-offset-2' : ''
                                        }`}
                                    >
                                        <button
                                            className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-stone-50/50 rounded-2xl"
                                            aria-expanded={isOpen}
                                            onClick={() => setOpenFaq(isOpen ? null : index)}
                                        >
                                            <span className="text-lg font-semibold">{item.question}</span>
                                            <span className={`text-2xl text-stone-500 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                                                {isOpen ? '×' : '+'}
                                            </span>
                                        </button>
                                        <div 
                                            className={`overflow-hidden transition-all duration-300 ${
                                                isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                                            }`}
                                        >
                                            <div className="px-6 pb-6 max-w-2xl text-base leading-7 text-stone-700">
                                                <p>{item.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* CTA Section */}
                    <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10" id="signup">
                        <div className="group relative overflow-hidden rounded-[2rem] border border-stone-900/10 bg-stone-900 px-8 py-16 text-white shadow-[0_25px_80px_rgba(0,0,0,0.16)] sm:px-12 lg:px-16 transition-all duration-500 hover:shadow-[0_35px_100px_rgba(0,0,0,0.25)]">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-3xl" />
                                <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
                            </div>
                            
                            <div className="relative text-center reveal">
                                <h2 className="text-3xl font-semibold sm:text-4xl">Start a loop you can actually keep.</h2>
                                <p className="mt-4 text-stone-300">Join thousands of people building better routines, one day at a time.</p>
                                
                                <form onSubmit={handleEmailSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row max-w-md mx-auto">
                                    <label htmlFor="email-footer" className="sr-only">Email address</label>
                                    <input
                                        id="email-footer"
                                        name="email-footer"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm text-white outline-none placeholder:text-stone-300 focus:border-white transition-all focus:ring-2 focus:ring-white/20"
                                        required
                                    />
                                    <button 
                                        type="submit" 
                                        className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-stone-900 transition-all hover:bg-stone-200"
                                    >
                                        <span className="relative z-10">Get started free</span>
                                        <span className="absolute inset-0 translate-y-full bg-amber-400 transition-transform duration-300 group-hover:translate-y-0" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-stone-900/10 bg-[#f7efe8]">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                        <div className="flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-stone-900" />
                            <p>© <span id="year">{year}</span> Loop. Small routines, kept.</p>
                        </div>
                        <a href="#top" className="group flex items-center gap-2 uppercase tracking-[0.25em] transition hover:text-stone-900">
                            Back to top
                            <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>
                </footer>
            </div>
        </>
    );
}