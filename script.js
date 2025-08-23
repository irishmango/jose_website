const menuBtn = document.querySelector('.menu-btn');
const drawer = document.getElementById('drawer');
const closeBtn = document.getElementById('closeDrawer');

menuBtn.addEventListener('click', () => {
    drawer.classList.toggle('open');
});

closeBtn.addEventListener('click', () => {
    drawer.classList.remove('open');
});
