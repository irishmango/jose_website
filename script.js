// script.js
const menuBtn = document.querySelector('.menu-btn');
const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('closeDrawer');

if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
        const willOpen = !drawer.classList.contains('open');
        drawer.classList.toggle('open', willOpen);
        menuBtn.classList.toggle('open', willOpen); // <-- this line makes the bars turn into an X
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
        menuBtn.classList.remove('open'); // <-- return to hamburger
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