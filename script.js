// script.js
const menuBtn = document.querySelector('.menu-btn');
const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('closeDrawer');

if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
        const willOpen = !drawer.classList.contains('open');
        drawer.classList.toggle('open', willOpen);
        menuBtn.classList.toggle('open', willOpen); // make the bars turn into an X
    });
}

// Back to Top Button (avoid overlapping footer) — provided function
(function () {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    const footer = document.querySelector('.site-footer, .footer');
    const BASE_BOTTOM = 20; // px
    const BASE_RIGHT = 30; // px

    function updateBackToTop() {
        // Toggle visibility
        if (window.scrollY > window.innerHeight * 0.8) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }

        // Default fixed placement
        backToTop.style.position = 'fixed';
        backToTop.style.right = BASE_RIGHT + 'px';

        // If footer is visible, push the button up so it never overlaps
        let bottom = BASE_BOTTOM;
        if (footer) {
            const rect = footer.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                const overlap = Math.max(0, window.innerHeight - rect.top);
                bottom = BASE_BOTTOM + overlap;
            }
        }
        backToTop.style.bottom = bottom + 'px';
    }

    window.addEventListener('scroll', updateBackToTop);
    window.addEventListener('resize', updateBackToTop);
    // Initial position
    updateBackToTop();

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

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