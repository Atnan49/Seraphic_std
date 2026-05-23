/**
 * Seraphic.Std - Premium Interactivity Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Hamburger Menu & Overlay ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNavigation = document.getElementById('main-navigation');
    const navLinks = document.querySelectorAll('#main-navigation a');
    const navOverlay = document.getElementById('nav-overlay');

    const toggleMenu = (open) => {
        mobileMenuBtn.classList.toggle('active', open);
        mainNavigation.classList.toggle('active', open);
        if (navOverlay) navOverlay.classList.toggle('active', open);
        document.body.classList.toggle('nav-open', open);
        mobileMenuBtn.setAttribute('aria-expanded', open);
    };

    if (mobileMenuBtn && mainNavigation) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenuBtn.classList.contains('active');
            toggleMenu(!isOpen);
        });

        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                toggleMenu(false);
            });
        });

        // Close menu when overlay is clicked
        if (navOverlay) {
            navOverlay.addEventListener('click', () => {
                toggleMenu(false);
            });
        }
    }



    // --- Lightbox Modal (Portfolio, Digital Products & Promo Flyer) ---
    const lightboxItems = document.querySelectorAll('.portfolio-item, .product-card, .flyer-container');
    const lightboxModal = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (lightboxItems && lightboxModal && lightboxImg) {
        lightboxItems.forEach(item => {
            const container = item.querySelector('.portfolio-img-container, .product-img-container') || item;
            const img = item.querySelector('img');
            const title = item.querySelector('h4, h3') || { textContent: 'Promo Banner' };

            if (container && img && title) {
                container.addEventListener('click', () => {
                    lightboxModal.classList.add('active');
                    lightboxImg.src = img.src;
                    lightboxCaption.textContent = title.textContent;
                    document.body.style.overflow = 'hidden'; // Lock background scroll
                });
            }
        });

        // Close lightbox
        const closeLightbox = () => {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock background scroll
        };

        if (lightboxClose) {
            lightboxClose.addEventListener('click', closeLightbox);
        }

        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target === lightboxImg) {
                closeLightbox();
            }
        });

        // Close on ESC key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // --- Intersection Observer (Scroll Reveal Animation) ---
    const animatedElements = document.querySelectorAll(
        '#hero-section .hero-content, ' +
        '#hero-section .hero-showcase, ' +
        'section h2, ' +
        '.section-desc, ' +
        '.services-pills-container, ' +
        '.portfolio-item, ' +
        '.about-container, ' +
        '.stat-item, ' +
        '.why-choose-text, ' +
        '.why-badge-card, ' +
        '.flyer-container, ' +
        '.terms-marquee-wrapper, ' +
        '.software-item, ' +
        '.product-card, ' +
        '.order-container, ' +
        '#studio-address-card, ' +
        '#google-maps-btn, ' +
        '#studio-location-map'
    );

    // Apply basic reveal style class
    animatedElements.forEach(el => {
        el.classList.add('reveal-element');
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve once revealed to keep layout performant
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12, // Element is 12% visible before triggering
        rootMargin: '0px 0px -50px 0px' // Delay slightly before entering view
    });

    animatedElements.forEach(el => {
        revealObserver.observe(el);
    });

    // --- Scrollspy: Highlight Active Nav Link on Scroll ---
    const spySections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('#main-navigation a');

    const scrollspyOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px', // Trigger when section is in the central region of view
        threshold: 0
    };

    const scrollspyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('nav-link-active');
                    } else {
                        link.classList.remove('nav-link-active');
                    }
                });
            }
        });
    }, scrollspyOptions);

    spySections.forEach(section => {
        scrollspyObserver.observe(section);
    });

    // --- FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');

        questionBtn.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(faq => {
                faq.classList.remove('active');
                const answer = faq.querySelector('.faq-answer');
                if (answer) answer.style.maxHeight = null;
                const btn = faq.querySelector('.faq-question');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });

            // If the clicked item wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = (answer.scrollHeight + 50) + "px";
                }
                questionBtn.setAttribute('aria-expanded', 'true');
            }
        });
    });

});
