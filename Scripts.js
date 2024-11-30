document.addEventListener('DOMContentLoaded', () => {
    // Initialize GLightbox
    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });

    // Reusable animation function
    const animateOnScroll = (selectors, options = {}) => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.style.transitionDelay = entry.target.dataset.delay || '0s'; // Optional delay
                    }
                });
            },
            { threshold: 0.1, ...options }
        );

        document.querySelectorAll(selectors).forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'all 0.6s ease-out';
            observer.observe(item);
        });
    };

    // Animate all sections with the following selectors
    animateOnScroll(`
        .gallery-item,
        .policy-section,
        .about-section,
        .header-title,
        .feature-box,
        .testimonial,
        .footer-links
    `);

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Tabs functionality
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', (event) => {
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));

            const tabName = event.currentTarget.getAttribute('data-tab');
            document.getElementById(tabName).classList.add('active');
            tab.classList.add('active');
        });
    });

    // Modal functionality
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    if (modal && modalImage) {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function () {
                const placeholderContent = this.querySelector('.placeholder-img')?.textContent || '';
                modalImage.textContent = placeholderContent; // Placeholder content
                modal.classList.add('active');
            });
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('active');
            }
        });
    }

    // Profile modal for about page
    document.querySelectorAll('.profile-image').forEach(image => {
        image.addEventListener('click', function () {
            const modal = document.createElement('div');
            modal.className = 'modal';
            modal.innerHTML = `
                <span class="modal-close">&times;</span>
                <div class="modal-content">
                    ${this.innerHTML}
                </div>
            `;
            document.body.appendChild(modal);

            setTimeout(() => modal.classList.add('active'), 10);

            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            });

            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    setTimeout(() => modal.remove(), 300);
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    setTimeout(() => modal.remove(), 300);
                }
            });
        });
    });
});
