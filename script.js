/**
 * Seraphic.Std - Premium Interactivity Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Hamburger Menu ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNavigation = document.getElementById('main-navigation');
    const navLinks = document.querySelectorAll('#main-navigation a');

    if (mobileMenuBtn && mainNavigation) {
        mobileMenuBtn.addEventListener('click', () => {
            const isOpen = mobileMenuBtn.classList.contains('active');
            mobileMenuBtn.classList.toggle('active');
            mainNavigation.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
        });

        // Close menu when a navigation link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('active');
                mainNavigation.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Dynamic WhatsApp Order Generator ---
    const servicePills = document.querySelectorAll('.service-pill');
    const whatsappBtn = document.getElementById('whatsapp-order-btn');
    const orderSection = document.getElementById('order-now');
    
    // Create status text inside order container to show active selection
    const orderContainer = document.querySelector('.order-container');
    let selectionStatusText = document.createElement('p');
    selectionStatusText.className = 'whatsapp-selection-status';
    selectionStatusText.style.fontWeight = 'bold';
    selectionStatusText.style.color = 'var(--color-accent)';
    selectionStatusText.style.marginTop = '-15px';
    selectionStatusText.style.marginBottom = '20px';
    selectionStatusText.style.fontSize = '15px';
    selectionStatusText.style.transition = 'all 0.3s ease';
    
    if (orderContainer && whatsappBtn) {
        // Insert right above the WhatsApp button description
        const btnDescription = orderContainer.querySelector('p');
        orderContainer.insertBefore(selectionStatusText, btnDescription);
    }

    servicePills.forEach(pill => {
        pill.addEventListener('click', () => {
            const serviceName = pill.textContent.trim();
            let formattedService = serviceName;
            
            // Format some naming variations nicely for WA chat
            if (serviceName === 'Apa Aja!!') {
                formattedService = 'Desain Custom';
            } else if (serviceName === 'UMKM') {
                formattedService = 'Desain Branding UMKM';
            }

            // Update WA button URL
            const textMessage = `Halo Seraphic.Std, saya tertarik untuk konsultasi jasa desain ${formattedService}. Bagaimana prosedurnya?`;
            const encodedText = encodeURIComponent(textMessage);
            whatsappBtn.href = `https://wa.me/6285126712214?text=${encodedText}`;
            
            // Highlight active service pill
            servicePills.forEach(p => p.classList.remove('active-pill'));
            pill.classList.add('active-pill');

            // Show confirmation text at CTA area
            selectionStatusText.innerHTML = `Layanan Terpilih: <span style="text-decoration: underline;">${formattedService}</span> ✨`;
            
            // Smooth scroll to order section
            orderSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- Portfolio Lightbox Modal ---
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    const lightboxModal = document.getElementById('portfolio-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');

    if (portfolioItems && lightboxModal && lightboxImg) {
        portfolioItems.forEach(item => {
            const container = item.querySelector('.portfolio-img-container');
            const img = item.querySelector('img');
            const title = item.querySelector('h4');

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
        '.order-container'
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

});
