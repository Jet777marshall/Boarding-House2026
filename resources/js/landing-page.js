const initLandingPage = () => {
    setFooterYear();
    initMobileNav();
    initAccordion();
    initSignupForms();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandingPage);
} else {
    initLandingPage();
}

function setFooterYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}

function initMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const header = document.querySelector('.site-header');

    if (!toggle || !header) {
        return;
    }

    toggle.addEventListener('click', () => {
        const isOpen = header.classList.toggle('nav-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    header.querySelectorAll('.main-nav a').forEach((link) => {
        link.addEventListener('click', () => {
            header.classList.remove('nav-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function initAccordion() {
    const triggers = document.querySelectorAll('.accordion-trigger');

    triggers.forEach((trigger) => {
        const panel = trigger.nextElementSibling;
        if (!panel) return;

        trigger.addEventListener('click', () => {
            const isOpen = trigger.getAttribute('aria-expanded') === 'true';

            triggers.forEach((other) => {
                if (other !== trigger) {
                    other.setAttribute('aria-expanded', 'false');
                    if (other.nextElementSibling) {
                        other.nextElementSibling.style.maxHeight = null;
                    }
                }
            });

            if (isOpen) {
                trigger.setAttribute('aria-expanded', 'false');
                panel.style.maxHeight = null;
            } else {
                trigger.setAttribute('aria-expanded', 'true');
                panel.style.maxHeight = `${panel.scrollHeight}px`;
            }
        });
    });
}

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

            if (!isValidEmail(email)) {
                showFormFeedback(form, 'Please enter a valid email address.', true);
                return;
            }

            showFormFeedback(form, `You're on the list — check ${email} soon.`, false);
            form.reset();
        });
    });
}

function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function showFormFeedback(form, message, isError) {
    let feedback = form.querySelector('.form-feedback');

    if (!feedback) {
        feedback = document.createElement('p');
        feedback.className = 'form-feedback';
        feedback.style.marginTop = '10px';
        feedback.style.fontSize = '0.85rem';
        form.insertAdjacentElement('afterend', feedback);
    }

    feedback.textContent = message;
    feedback.style.color = isError ? '#B3261E' : '#1B4332';
}
