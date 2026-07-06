import { useEffect, useState, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { 
    Home,
    Users,
    Wifi,
    Coffee,
    Bed,
    Bath,
    ParkingCircle,
    Shield,
    Star,
    MapPin,
    Calendar,
    Phone,
    Mail,
    ChevronRight,
    Sparkles,
    CheckCircle,
    Building2,
    Clock,
    Utensils,
    Dumbbell,
    Wind,
    Tv
} from 'lucide-react';

const faqItems = [
    {
        question: 'What utilities are included in the rent?',
        answer: 'Electricity, water, high-speed WiFi, and garbage collection are all included in the monthly rent. You only pay for your personal expenses.'
    },
    {
        question: 'Is there a minimum stay requirement?',
        answer: 'Yes, we require a minimum stay of 3 months. This helps us maintain a stable and friendly community environment.'
    },
    {
        question: 'Are visitors allowed?',
        answer: 'Yes, visitors are welcome during reasonable hours (8 AM - 10 PM). We just ask that you respect other residents\' privacy and quiet hours.'
    },
    {
        question: 'What amenities are available?',
        answer: 'We offer fully furnished rooms, high-speed WiFi, study areas, communal kitchen, laundry facilities, parking, 24/7 security, and a cozy common lounge.'
    },
    {
        question: 'How do I book a room?',
        answer: 'Simply fill out the booking form on our website, or give us a call. We\'ll schedule a viewing and guide you through the application process.'
    }
];

const roomTypes = [
    {
        name: 'Standard Single',
        price: '₱8,500/month',
        description: 'Spacious premium room with added comfort features.',
        features: ['Single bed', 'Study desk', 'Wardrobe', 'Window'],
        image: 'https://picsum.photos/id/1/700/500',
        icon: Bed
    },
    {
        name: 'Deluxe Single',
        price: '₱12,000/month',
        description: 'Spacious room with premium furnishings and additional comfort features.',
        features: ['Queen bed', 'Large desk', 'AC unit', 'Private balcony'],
        image: 'https://picsum.photos/id/2/700/500',
        icon: Home
    },
    {
        name: 'Twin Sharing',
        price: '₱6,500/month',
        description: 'Perfect for friends or colleagues, sharing a comfortable room with separate beds.',
        features: ['2 single beds', '2 desks', 'Shared closet', 'Window'],
        image: 'https://picsum.photos/id/3/700/500',
        icon: Users
    }
];

const amenities = [
    { icon: Wifi, name: 'High-Speed WiFi', desc: '100 Mbps fiber internet throughout the building' },
    { icon: Coffee, name: 'Kitchen Access', desc: 'Fully equipped communal kitchen with appliances' },
    { icon: Bath, name: 'Laundry Facility', desc: 'Coin-operated washing machines and dryers' },
    { icon: ParkingCircle, name: 'Parking Space', desc: 'Secure parking available for residents' },
    { icon: Shield, name: '24/7 Security', desc: 'CCTV cameras and security personnel on site' },
    { icon: Users, name: 'Common Lounge', desc: 'Comfortable area for studying and socializing' },
    { icon: Clock, name: 'Study Areas', desc: 'Quiet study rooms available 24/7' },
    { icon: Dumbbell, name: 'Fitness Corner', desc: 'Basic gym equipment for residents' }
];

const testimonials = [
    {
        name: 'Maria Santos',
        role: 'University Student',
        content: 'The Dorm Hub feels like home away from home. The community here is amazing, and the facilities are top-notch!',
        avatar: 'https://picsum.photos/id/64/100/100',
        rating: 5
    },
    {
        name: 'James Rodriguez',
        role: 'Software Engineer',
        content: 'Perfect location, great amenities, and the management is very responsive. Best boarding house I\'ve stayed in.',
        avatar: 'https://picsum.photos/id/65/100/100',
        rating: 5
    },
    {
        name: 'Anna Reyes',
        role: 'Medical Student',
        content: 'The study areas and quiet hours make it ideal for students. Plus, the staff is incredibly helpful and friendly.',
        avatar: 'https://picsum.photos/id/66/100/100',
        rating: 5
    }
];

export default function Welcome() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    const [year] = useState(new Date().getFullYear());
    const [activeRoom, setActiveRoom] = useState(0);
    const [hoveredRoom, setHoveredRoom] = useState<number | null>(null);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSuccess, setEmailSuccess] = useState('');
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const [availableRooms, setAvailableRooms] = useState(5);
    
    const observerRef = useRef<IntersectionObserver | null>(null);

    // Simulate room availability updates
    useEffect(() => {
        const interval = setInterval(() => {
            setAvailableRooms(prev => {
                const change = Math.random() > 0.7 ? 1 : -1;
                const newCount = Math.max(0, Math.min(8, prev + change));
                return newCount;
            });
        }, 8000);
        return () => clearInterval(interval);
    }, []);

    // Auto-rotate testimonials
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
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

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!email || !isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            setEmailSuccess('');
            return;
        }

        setEmailError('');
        setEmailSuccess(`Thank you! We'll send you details about The Dorm Hub at ${email}`);
        setEmail('');
        setTimeout(() => setEmailSuccess(''), 5000);
    };

    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const renderStars = (count: number) => {
        return Array.from({ length: 5 }, (_, i) => (
            <Star 
                key={i} 
                className={`h-4 w-4 ${i < count ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} 
            />
        ));
    };

    return (
        <>
            <Head title="The Dorm Hub — Premium Boarding House">
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
                            <span className="logo-mark flex h-8 w-8 items-center justify-center rounded-full bg-stone-900 text-white text-xs">
                                DH
                            </span>
                            <span className="hidden sm:inline">The Dorm Hub</span>
                            <span className="sm:hidden">DH</span>
                        </a>

                        <nav className="main-nav hidden items-center gap-8 text-sm font-medium uppercase tracking-[0.25em] text-stone-700 md:flex">
                            <a href="#rooms" className="relative transition hover:text-stone-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full">
                                Rooms
                            </a>
                            <a href="#amenities" className="relative transition hover:text-stone-950 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-stone-900 after:transition-all after:duration-300 hover:after:w-full">
                                Amenities
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
                                href="#contact" 
                                className="group rounded-full border border-stone-900/20 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] transition-all hover:border-stone-900 hover:bg-stone-900 hover:text-white"
                            >
                                Contact
                            </a>
                            <a 
                                href={route('login')} 
                                className="group relative overflow-hidden rounded-full bg-stone-900 px-6 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-700"
                            >
                                <span className="relative z-10">Login</span>
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
                                <a href="#rooms" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-stone-950 hover:pl-2">
                                    Rooms
                                </a>
                                <a href="#amenities" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-stone-950 hover:pl-2">
                                    Amenities
                                </a>
                                <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-stone-950 hover:pl-2">
                                    Testimonials
                                </a>
                                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="transition hover:text-stone-950 hover:pl-2">
                                    FAQ
                                </a>
                                <div className="mt-4 flex flex-col gap-3">
                                    <a href="#contact" className="rounded-full border border-stone-900/20 px-4 py-2.5 text-center transition hover:bg-stone-900 hover:text-white">
                                        Contact
                                    </a>
                                    <a href={route('login')} className="rounded-full bg-stone-900 px-4 py-2.5 text-center text-white transition hover:bg-stone-700">
                                        Login
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <main id="top">
                    {/* Hero Section */}
                    <section className="relative overflow-hidden" id="intro">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-amber-200/20 blur-3xl" />
                            <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-3xl" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-stone-200/10 blur-3xl" />
                        </div>

                        <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-28">
                            <div className="max-w-2xl">
                                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-1.5 text-sm font-medium text-amber-800 animate-pulse">
                                    <Sparkles className="h-4 w-4" />
                                    {availableRooms} rooms available now
                                </div>
                                <h1 className="mt-6 font-['Fraunces'] text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
                                    Find Your Perfect
                                    <span className="block text-stone-700 relative">
                                        Home at The Dorm Hub
                                        <span className="absolute -bottom-2 left-0 h-2 w-32 bg-amber-400/30 rounded-full blur-sm" />
                                    </span>
                                </h1>
                                <p className="mt-8 max-w-xl text-lg leading-8 text-stone-700">
                                    Premium boarding house designed for students and young professionals. 
                                    Comfortable rooms, modern amenities, and a vibrant community — all in one place.
                                </p>

                                <div className="mt-8 flex flex-wrap gap-4">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-stone-600" />
                                        <span className="text-stone-700">Near Universities & CBD</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-5 w-5 text-stone-600" />
                                        <span className="text-stone-700">24/7 Security</span>
                                    </div>
                                </div>

                                <form onSubmit={handleEmailSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row">
                                    <div className="relative flex-1">
                                        <label htmlFor="email" className="sr-only">Email address</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Enter your email for inquiry"
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
                                        <span className="relative z-10">Inquire Now</span>
                                        <span className="absolute inset-0 translate-y-full bg-amber-500 transition-transform duration-300 group-hover:translate-y-0" />
                                    </button>
                                </form>
                                {emailSuccess && (
                                    <p className="mt-2 text-sm text-emerald-600 animate-in slide-in-from-top-2 duration-300">
                                        {emailSuccess}
                                    </p>
                                )}
                            </div>

                            <div className="relative">
                                <figure className="group overflow-hidden rounded-[2rem] border border-stone-900/10 bg-white p-3 shadow-[0_25px_80px_rgba(0,0,0,0.12)] transition-all duration-500 hover:shadow-[0_35px_100px_rgba(0,0,0,0.2)] hover:-translate-y-2">
                                    <img
                                        src="https://picsum.photos/id/40/900/1100"
                                        alt="Modern boarding house interior with cozy common area"
                                        className="h-full w-full rounded-[1.5rem] object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <figcaption className="px-2 pb-2 pt-4 text-sm text-stone-600 flex items-center gap-2">
                                        <Home className="h-4 w-4" />
                                        Modern boarding house with premium amenities
                                    </figcaption>
                                </figure>
                                <div className="absolute -bottom-5 -right-5 rounded-full border border-stone-900/10 bg-white px-5 py-3 shadow-lg">
                                    <div className="flex items-center gap-2">
                                        <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                                        <span className="text-2xl font-semibold text-stone-900">4.9</span>
                                        <span className="text-sm text-stone-500">(120 reviews)</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Room Types Section */}
                    <section className="relative overflow-hidden border-y border-stone-900/10 bg-white/70" id="rooms">
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
                        </div>

                        <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">
                            <div className="text-center max-w-2xl mx-auto reveal">
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Our Rooms</p>
                                <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">Choose Your Perfect Space</h2>
                                <p className="mt-4 text-lg text-stone-700">Comfortable, well-designed rooms to suit every need and budget.</p>
                            </div>

                            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {roomTypes.map((room, index) => (
                                    <article
                                        key={room.name}
                                        className={`group relative flex flex-col overflow-hidden rounded-[2rem] border border-stone-900/10 bg-[#f7efe8] shadow-sm transition-all duration-500 ${
                                            hoveredRoom === index ? '-translate-y-3 shadow-xl shadow-stone-900/10' : ''
                                        }`}
                                        onMouseEnter={() => setHoveredRoom(index)}
                                        onMouseLeave={() => setHoveredRoom(null)}
                                    >
                                        <div className="relative h-52 overflow-hidden">
                                            <img
                                                src={room.image}
                                                alt={room.name}
                                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/10 to-transparent" />
                                            <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 text-sm font-semibold text-stone-900">
                                                {room.price}
                                            </div>
                                        </div>

                                        <div className="flex flex-1 flex-col p-8">
                                            <div className="mb-3 flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-stone-900 text-white transition-colors duration-300 group-hover:bg-amber-500">
                                                    <room.icon className="h-5 w-5" />
                                                </div>
                                                <h3 className="text-2xl font-semibold">{room.name}</h3>
                                            </div>
                                            <p className="text-base leading-7 text-stone-700">{room.description}</p>
                                            
                                            <ul className="mt-4 space-y-2">
                                                {room.features.map((feature) => (
                                                    <li key={feature} className="flex items-center gap-2 text-sm text-stone-600">
                                                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>

                                            <button className="mt-6 w-full rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-stone-700 group-hover:shadow-lg">
                                                View Room
                                            </button>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Amenities Section */}
                    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10" id="amenities">
                        <div className="text-center max-w-2xl mx-auto reveal">
                            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Amenities</p>
                            <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">Everything You Need</h2>
                            <p className="mt-4 text-lg text-stone-700">Modern amenities designed to make your stay comfortable and convenient.</p>
                        </div>

                        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {amenities.map((amenity, index) => (
                                <div 
                                    key={index}
                                    className="group p-6 rounded-2xl border border-stone-900/10 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 reveal"
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-stone-900 text-white transition-all duration-300 group-hover:bg-amber-500 group-hover:scale-110">
                                        <amenity.icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="text-lg font-semibold">{amenity.name}</h3>
                                    <p className="mt-1 text-sm text-stone-600">{amenity.desc}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="bg-white/70 py-20" id="testimonials">
                        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
                            <div className="text-center max-w-2xl mx-auto reveal">
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Testimonials</p>
                                <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">What Our Residents Say</h2>
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
                                        <div className="mt-3 flex">
                                            {renderStars(testimonial.rating)}
                                        </div>
                                        <p className="mt-3 text-stone-700 leading-relaxed">"{testimonial.content}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Location & Contact Section */}
                    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10" id="contact">
                        <div className="grid gap-12 lg:grid-cols-2">
                            <div className="reveal">
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">Contact Us</p>
                                <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">Get in Touch</h2>
                                <p className="mt-4 text-lg text-stone-700">Visit us or reach out — we're here to help you find your perfect room.</p>
                                
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-start gap-4">
                                        <MapPin className="h-5 w-5 text-stone-600 mt-1" />
                                        <div>
                                            <p className="font-semibold">Location</p>
                                            <p className="text-stone-600">123 University Avenue, City Center<br />Metro Manila, Philippines</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Phone className="h-5 w-5 text-stone-600 mt-1" />
                                        <div>
                                            <p className="font-semibold">Phone</p>
                                            <p className="text-stone-600">+63 (2) 8123 4567</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Mail className="h-5 w-5 text-stone-600 mt-1" />
                                        <div>
                                            <p className="font-semibold">Email</p>
                                            <p className="text-stone-600">info@thedormhub.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-stone-900 rounded-[2rem] p-8 text-white reveal">
                                <h3 className="text-2xl font-semibold">Send a Message</h3>
                                <form className="mt-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Name</label>
                                        <input 
                                            type="text" 
                                            className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-stone-400 focus:border-white outline-none"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Email</label>
                                        <input 
                                            type="email" 
                                            className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-stone-400 focus:border-white outline-none"
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Message</label>
                                        <textarea 
                                            rows={3}
                                            className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-2.5 text-white placeholder:text-stone-400 focus:border-white outline-none resize-none"
                                            placeholder="I'm interested in..."
                                        />
                                    </div>
                                    <button 
                                        type="submit" 
                                        className="w-full rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-stone-900 transition-all hover:bg-stone-200"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="bg-white/70 py-20" id="faq">
                        <div className="mx-auto max-w-4xl px-6 sm:px-8 lg:px-10">
                            <div className="text-center reveal">
                                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-600">FAQ</p>
                                <h2 className="mt-3 font-['Fraunces'] text-3xl sm:text-4xl">Frequently Asked Questions</h2>
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
                        </div>
                    </section>

                    {/* Booking CTA Section */}
                    <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10" id="booking">
                        <div className="group relative overflow-hidden rounded-[2rem] border border-stone-900/10 bg-stone-900 px-8 py-16 text-white shadow-[0_25px_80px_rgba(0,0,0,0.16)] sm:px-12 lg:px-16 transition-all duration-500 hover:shadow-[0_35px_100px_rgba(0,0,0,0.25)]">
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-amber-500/10 blur-3xl" />
                                <div className="absolute -bottom-40 -left-40 h-[300px] w-[300px] rounded-full bg-emerald-500/10 blur-3xl" />
                            </div>
                            
                            <div className="relative text-center reveal">
                                <h2 className="text-3xl font-semibold sm:text-4xl">Ready to Find Your New Home?</h2>
                                <p className="mt-4 text-stone-300 max-w-2xl mx-auto">
                                    Join our community of happy residents at The Dorm Hub. Book your room today and experience 
                                    comfortable living at its best.
                                </p>
                                
                                <div className="mt-8 flex flex-wrap justify-center gap-4">
                                    <a 
                                        href="#contact" 
                                        className="group relative overflow-hidden rounded-full bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-stone-900 transition-all hover:bg-stone-200"
                                    >
                                        <span className="relative z-10">Book a Room</span>
                                    </a>
                                    <a 
                                        href="#contact" 
                                        className="group rounded-full border border-white/30 px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all hover:bg-white/10"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                                <p className="mt-4 text-sm text-stone-400">No booking fee • Flexible payment options</p>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="border-t border-stone-900/10 bg-[#f7efe8]">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-8 text-sm text-stone-600 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
                        <div className="flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-stone-900 text-white text-xs font-bold">
                                DH
                            </span>
                            <p>© <span id="year">{year}</span> The Dorm Hub. Premium boarding house.</p>
                        </div>
                        <div className="flex items-center gap-6">
                            <a href="#top" className="group flex items-center gap-2 uppercase tracking-[0.25em] transition hover:text-stone-900">
                                Back to top
                                <ChevronRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

// Import X icon for mobile menu
function X({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
    );
}