// ==========================================================================
// Loop — Landing Page JavaScript
// All interactions and animations
// ==========================================================================

const initLandingPage = () => {
    setFooterYear();
    initMobileNav();
    initAccordion();
    initSignupForms();
    initScrollReveal();
    initParallaxEffect();
    initSmoothScroll();
    initCounterAnimation();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandingPage);
} else {
    initLandingPage();
}

// ==========================================================================
// 1. Footer Year
// ==========================================================================
function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

// ==========================================================================
// 2. Mobile Navigation
// ==========================================================================
function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const header = document.querySelector('.site-header');

    if (!toggle || !header) return;

    // Toggle menu
    toggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.querySelector('svg')?.classList.toggle('rotate-90');
    });

    // Close menu on link click
    header.querySelectorAll('.main-nav a, .mobile-nav-link').forEach((link) => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (!header.contains(e.target) && header.classList.contains('nav-open')) {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && header.classList.contains('nav-open')) {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// ==========================================================================
// 3. Accordion
// ==========================================================================
function initAccordion() {
    const triggers = document.querySelectorAll('.accordion-trigger');

    triggers.forEach((trigger) => {
        const panel = trigger.nextElementSibling;
        if (!panel) return;

        trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';

            // Close all other accordions
            triggers.forEach((other) => {
                if (other !== trigger) {
                    other.setAttribute('aria-expanded', 'false');
                    const otherPanel = other.nextElementSibling;
                    if (otherPanel) {
                        otherPanel.style.maxHeight = '0';
                        otherPanel.style.opacity = '0';
                    }
                }
            });

            if (isOpen) {
                trigger.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = '0';
                panel.style.opacity = '0';
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = `${panel.scrollHeight}px`;
                panel.style.opacity = '1';
            }
        });
    });
}

// ==========================================================================
// 4. Signup Forms
// ==========================================================================
function initSignupForms() {
    const forms = [
        document.getElementById('signup-form'),
        document.getElementById('signup-form-footer'),
    ].filter(Boolean);

    forms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput ? emailInput.value.trim() : '';
            const feedback = getOrCreateFeedback(form);

            if (!isValidEmail(email)) {
                showFormFeedback(feedback, 'Please enter a valid email address.', true);
                shakeElement(emailInput);
                return;
            }

            // Simulate loading state
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showFormFeedback(
                    feedback, 
                    `✨ You're on the list — check ${email} soon!`, 
                    false
                );
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.add('btn-success');

                // Remove success state after 3 seconds
                setTimeout(() => {
                    submitBtn.classList.remove('btn-success');
                }, 3000);
            }, 800);
        });

        // Real-time validation
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                const feedback = getOrCreateFeedback(form);
                if (emailInput.value.length > 0 && !isValidEmail(emailInput.value)) {
                    emailInput.classList.add('border-red-400');
                    showFormFeedback(feedback, 'Please enter a valid email address.', true);
                } else {
                    emailInput.classList.remove('border-red-400');
                    feedback.textContent = '';
                    feedback.style.display = 'none';
                }
            });
        }
    });
}

function getOrCreateFeedback(form) {
    let feedback = form.querySelector('.form-feedback');
    if (!feedback) {
        feedback = document.createElement('p');
        feedback.className = 'form-feedback';
        feedback.style.marginTop = '12px';
        feedback.style.fontSize = '0.875rem';
        feedback.style.transition = 'all 0.3s ease';
        form.insertAdjacentElement('afterend', feedback);
    }
    return feedback;
}

function showFormFeedback(feedback, message, isError) {
    feedback.textContent = message;
    feedback.style.display = 'block';
    feedback.style.color = isError ? '#DC2626' : '#065F46';
    feedback.style.transform = 'translateY(0)';
    feedback.style.opacity = '1';
    feedback.classList.add(isError ? 'text-red-500' : 'text-emerald-600');

    if (!isError) {
        feedback.style.animation = 'slide-in-bottom 0.3s ease-out';
    }
}

function shakeElement(element) {
    if (!element) return;
    element.classList.add('animate-shake');
    setTimeout(() => {
        element.classList.remove('animate-shake');
    }, 500);
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-8px); }
        75% { transform: translateX(8px); }
    }
    .animate-shake {
        animation: shake 0.4s ease-in-out;
    }
    .btn-success {
        background-color: #065F46 !important;
        color: white !important;
    }
`;
document.head.appendChild(style);

// ==========================================================================
// 5. Scroll Reveal
// ==========================================================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });
}

// ==========================================================================
// 6. Parallax Effect
// ==========================================================================
function initParallaxEffect() {
    const heroImage = document.querySelector('.hero-photo-card img');
    if (!heroImage) return;

    let ticking = false;

    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const rate = scrolled * -0.05;
                heroImage.style.transform = `translateY(${rate}px)`;
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==========================================================================
// 7. Smooth Scroll
// ==========================================================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const targetElement = document.querySelector(href);
            if (!targetElement) return;

            e.preventDefault();

            const headerHeight = document.querySelector('.site-header')?.offsetHeight || 0;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

// ==========================================================================
// 8. Counter Animation (for dynamic counters)
// ==========================================================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach((counter) => {
        const target = parseInt(counter.getAttribute('data-counter'));
        const duration = parseInt(counter.getAttribute('data-duration')) || 1500;
        const startTime = performance.now();

        const animateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.round(target * easeOut);
            
            counter.textContent = currentValue;

            if (progress < 1) {
                requestAnimationFrame(animateCounter);
            }
        };

        // Start counter when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    requestAnimationFrame(animateCounter);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// ==========================================================================
// 9. Dynamic Background (optional)
// ==========================================================================
function initDynamicBackground() {
    const hero = document.querySelector('#intro');
    if (!hero) return;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        mouseX = (x - 0.5) * 20;
        mouseY = (y - 0.5) * 20;
        
        hero.style.setProperty('--mouse-x', `${mouseX}px`);
        hero.style.setProperty('--mouse-y', `${mouseY}px`);
    });
}

// Initialize dynamic background if needed
// initDynamicBackground();

// ==========================================================================
// 10. Add loading animation class to images
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
        img.classList.add('lazy-load');
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// Lazy load styles
const lazyStyles = document.createElement('style');
lazyStyles.textContent = `
    .lazy-load {
        opacity: 0;
        transition: opacity 0.6s ease;
    }
    .lazy-load.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(lazyStyles);

console.log('🚀 Loop — Small routines, kept.');
console.log('📖 Learn more at https://loop.app');