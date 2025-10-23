// script.js
const menuBtn = document.querySelector('.menu-btn');
const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('closeDrawer');
const backToTopBtn = document.getElementById('backToTop');
const footerEl = document.querySelector('.footer');

if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
        const willOpen = !drawer.classList.contains('open');
        drawer.classList.toggle('open', willOpen);
        menuBtn.classList.toggle('open', willOpen); // make the bars turn into an X
    });
}

// Back-to-top: show after scrolling and enable smooth scroll
if (backToTopBtn) {
    const toggleBackToTop = () => {
        const y = window.scrollY || document.documentElement.scrollTop;
        backToTopBtn.style.display = y > 400 ? 'block' : 'none';

        // Lift the button up when the footer enters the viewport so they don't overlap
        if (footerEl && backToTopBtn.style.display !== 'none') {
            const rect = footerEl.getBoundingClientRect();
            const btnH = backToTopBtn.getBoundingClientRect().height || 48;
            const base = 20; // must match CSS base bottom offset
            const gap = 12; // distance we want above the footer
            const distanceToFooterTop = Math.max(0, window.innerHeight - rect.top);
            const overlap = base + btnH + gap - (window.innerHeight - rect.top);
            const lift = Math.max(0, overlap);
            backToTopBtn.style.bottom = `calc(${base + lift}px + env(safe-area-inset-bottom, 0px))`;
        }
    };

    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    window.addEventListener('resize', toggleBackToTop);
    toggleBackToTop(); // initialize on load

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
        menuBtn.classList.remove('open'); // return to hamburger
    });

    // Close the drawer when a nav link is clicked
    const navLinks = drawer ? drawer.querySelectorAll('.drawer-nav a') : [];
    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            menuBtn.classList.remove('open'); // returns hamburger from X
        });
    });
}