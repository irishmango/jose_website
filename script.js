// script.js

// ============ Nav scroll-spy (index sections only) ============
(function () {
    const links = document.querySelectorAll('.site-navbar-links a[data-spy]');
    if (!links.length) return;
    const sections = [];
    links.forEach((a) => {
        const id = a.getAttribute('data-spy');
        const el = document.getElementById(id);
        if (el) sections.push({ id, el, link: a });
    });
    if (!sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            const match = sections.find((s) => s.el === entry.target);
            if (!match) return;
            if (entry.isIntersecting) {
                links.forEach((a) => a.classList.remove('active'));
                match.link.classList.add('active');
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach((s) => observer.observe(s.el));
})();

// ============ Mobile hamburger menu ============
(function () {
    const burger = document.getElementById('navBurger');
    const links = document.querySelector('.site-navbar-links');
    if (!burger || !links) return;

    function setOpen(open) {
        links.classList.toggle('open', open);
        burger.setAttribute('aria-expanded', String(open));
    }

    burger.addEventListener('click', () => setOpen(!links.classList.contains('open')));
    links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && links.classList.contains('open')) setOpen(false);
    });
})();

// ============ Scroll reveal ============
(function () {
    const items = document.querySelectorAll('.reveal');
    if (!items.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        items.forEach((el) => el.classList.add('in'));
        return;
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    items.forEach((el) => observer.observe(el));
})();

// ============ Press review modal ============
(function () {
    const modal = document.getElementById('reviewModal');
    if (!modal) return;
    const titleEl = document.getElementById('reviewModalTitle');
    const bodyEl = document.getElementById('reviewModalBody');
    const sourceEl = document.getElementById('reviewModalSource');
    const closeEl = document.getElementById('reviewModalClose');
    const backdrop = modal.querySelector('.review-modal-backdrop');
    const entries = document.querySelectorAll('.press-entry');

    function open(entry) {
        const lang = (document.documentElement.getAttribute('lang') || 'en').startsWith('de') ? 'de' : 'en';
        const title = lang === 'de' && entry.dataset.titleDe ? entry.dataset.titleDe : entry.dataset.title;
        const body = lang === 'de' && entry.dataset.bodyDe ? entry.dataset.bodyDe : entry.dataset.body;
        const source = lang === 'de' && entry.dataset.sourceDe ? entry.dataset.sourceDe : entry.dataset.source;
        titleEl.textContent = title || '';
        bodyEl.textContent = body || '';
        sourceEl.textContent = source || '';
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    entries.forEach((entry) => {
        entry.addEventListener('click', () => open(entry));
        entry.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(entry); }
        });
    });
    if (closeEl) closeEl.addEventListener('click', close);
    if (backdrop) backdrop.addEventListener('click', close);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') close();
    });
})();

// ============ Gallery lightbox (production subpages) ============
(function () {
    const cells = document.querySelectorAll('.project-gallery-cell');
    const lightbox = document.getElementById('lightbox');
    if (!cells.length || !lightbox) return;

    const imgEl = document.getElementById('lightboxImg');
    const countEl = document.getElementById('lightboxCount');
    const closeEl = document.getElementById('lightboxClose');
    const prevEl = document.getElementById('lightboxPrev');
    const nextEl = document.getElementById('lightboxNext');

    const photos = Array.from(cells).map((c) => c.style.backgroundImage);
    let current = 0;

    function show(i) {
        current = (i + photos.length) % photos.length;
        imgEl.style.backgroundImage = photos[current];
        countEl.textContent = (current + 1) + ' / ' + photos.length;
    }

    function open(i) {
        show(i);
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function close() {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    cells.forEach((cell, i) => {
        cell.addEventListener('click', () => open(i));
    });
    if (closeEl) closeEl.addEventListener('click', close);
    if (prevEl) prevEl.addEventListener('click', () => show(current - 1));
    if (nextEl) nextEl.addEventListener('click', () => show(current + 1));
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
    document.addEventListener('keydown', (e) => {
        if (lightbox.getAttribute('aria-hidden') !== 'false') return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
})();

// ============ Internationalization (EN/DE) — toggle, persist in localStorage ============
(function () {
    const STORAGE_KEY = 'site_lang';
    const DEFAULT_LANG = (document.documentElement.getAttribute('lang') || 'en').toLowerCase().startsWith('de') ? 'de' : 'en';

    const translations = {
        en: {
            nav: { HOME: 'Home', BIOGRAPHY: 'Biography', PROJECTS: 'Productions', REVIEWS: 'Press', CONTACT: 'Contact' },
            sectionHeads: { PROJECTS: 'Productions', BIOGRAPHY: 'Biography', REVIEWS: 'Press', CONTACT: 'Contact' },
            footer: { IMPRINT: 'imprint', PRIVACY: 'privacy policy' },
            contact: { ROLE: 'Opera Director' },
            heroEyebrow: 'Opera Director',
            langToggle: 'DE',
            long: {
                biography: [
                    'Born in Puerto Rico, José Cortés completed the Ofelia D’Acosta Acting Academy as well as the Escuela Central de Artes Visuales in San Juan. He studied Spanish literature at the University of Puerto Rico and gained diverse artistic experience in dance, theater, and film.',
                    'His path then led him to Berlin, where he completed a bachelor’s and master’s degree in opera singing. He worked as an assistant director at the Deutsche Oper Berlin, the Staatsoper Berlin, and the Oper Graz, among others. This was followed by seminars and directing workshops with Tatjana Gürbaca, Claus Guth, Hans Neuenfels, Nadja Loschky, and Katharina Wagner.',
                    'His productions include La Bohème, Così fan tutte, Die Fledermaus, La Calisto, the world premiere of Lovelease, as well as the first festival performance at Goetheplatz with the orchestra and soloists of the Bayreuth Festival.',
                    'On March 15, 2025, Cortés makes his debut with Puccini’s Tosca at the Staatstheater Wiesbaden.',
                    'In 2025, Cortés made his debut as a film director with The Answering Machine.'
                ]
            }
        },
        de: {
            nav: { HOME: 'Startseite', BIOGRAPHY: 'Biografie', PROJECTS: 'Produktionen', REVIEWS: 'Presse', CONTACT: 'Kontakt' },
            sectionHeads: { PROJECTS: 'Produktionen', BIOGRAPHY: 'Biografie', REVIEWS: 'Presse', CONTACT: 'Kontakt' },
            footer: { IMPRINT: 'impressum', PRIVACY: 'datenschutz' },
            contact: { ROLE: 'Opernregisseur' },
            heroEyebrow: 'Opernregisseur',
            langToggle: 'EN',
            long: {
                biography: [
                    'In Puerto Rico geboren, absolvierte José Cortés die Schauspielakademie Ofelia D’Acosta sowie die Escuela Central de Artes Visuales in San Juan. Er studierte spanische Literatur an der Universidad de Puerto Rico und sammelte vielseitige künstlerische Erfahrungen in den Bereichen Tanz, Theater und Film.',
                    'Sein Weg führte ihn anschließend nach Berlin, wo er ein Bachelor- und Masterstudium im Operngesang absolvierte. Als Regieassistent war er unter anderem an der Deutschen Oper Berlin, der Staatsoper Berlin und der Oper Graz tätig. Es folgten Seminare und Regie-Workshops bei Tatjana Gürbaca, Claus Guth, Hans Neuenfels, Nadja Loschky und Katharina Wagner.',
                    'Zu seinen Inszenierungen zählen La Bohème, Così fan tutte, Die Fledermaus, La Calisto, die Uraufführung von Lovelease sowie die erste Festspielarbeit am Goetheplatz mit Orchester und Solisten der Bayreuther Festspiele.',
                    'Am 15. März 2025 debütiert Cortés mit Tosca von Puccini am Staatstheater Wiesbaden.',
                    '2025 feierte Cortés sein Debut als Filmregisseur mit The Answering Machine.'
                ]
            }
        }
    };

    // Creative team role label translations for project pages
    const roleLabels = {
        en: {
            'regie': 'Director', 'inszenierung': 'Director', 'director': 'Director',
            'bühnenbild': 'Set design', 'buhnenbild': 'Set design', 'set design': 'Set design',
            'bühnen- und kostümbild': 'Set & costume design',
            'belichtung': 'Lighting', 'licht': 'Lighting', 'licht/video': 'Lighting/Video', 'lighting': 'Lighting',
            'fotos': 'Photos', 'photos': 'Photos',
            'requisite': 'Props', 'requisiten': 'Props', 'props': 'Props',
            'sopran': 'Soprano', 'soprano': 'Soprano', 'sängerin': 'Singer',
            'bass-bariton': 'Bass-baritone', 'bass-baritone': 'Bass-baritone',
            'tenor': 'Tenor', 'sänger': 'Singer',
            'instrumentalstudierende': 'Instrumental students', 'instrumental students': 'Instrumental students',
            'chor': 'Chorus', 'chorus': 'Chorus',
            'kostüm': 'Costumes', 'kostum': 'Costumes', 'kostüm design': 'Costume design', 'costumes': 'Costumes',
            'costume design': 'Costume design',
            'dramaturgie': 'Dramaturgy',
            'dirigat': 'Conductor', 'musikalische leitung': 'Musical direction',
            'komposition': 'Composition', 'libretto': 'Libretto',
            'produktionsleitung': 'Production management',
            'klavier, harmonium': 'Piano, harmonium',
            'director': 'Director', 'screenplay': 'Screenplay', 'producers': 'Producers',
            'music': 'Music', 'sound design': 'Sound design', 'director of photography': 'Director of photography',
            'editor': 'Editor', 'production design': 'Production design', 'executive producer': 'Executive producer',
            'light design & color': 'Light design & color', 'cast': 'Cast',
            'kinder- und jugendchor': 'Children\'s & youth chorus',
            'vermittlung': 'Outreach', 'regieassistenz': 'Assistant director', 'regiehospitanz': 'Directing intern',
            'musikalische assistenz': 'Musical assistant', 'musikalische einstudierung': 'Musical preparation',
            'bühenbildhospitanz': 'Set design intern', 'bühnenbildassistenz': 'Assistant set design',
            'kostümassistenz': 'Assistant costume design', 'orchester': 'Orchestra', 'statisterie': 'Extras'
        },
        de: {
            'regie': 'Regie', 'inszenierung': 'Inszenierung', 'director': 'Regie',
            'bühnenbild': 'Bühnenbild', 'buhnenbild': 'Bühnenbild', 'set design': 'Bühnenbild',
            'bühnen- und kostümbild': 'Bühnen- und Kostümbild',
            'belichtung': 'Belichtung', 'licht': 'Licht', 'licht/video': 'Licht/Video', 'lighting': 'Belichtung',
            'fotos': 'Fotos', 'photos': 'Fotos',
            'requisite': 'Requisite', 'requisiten': 'Requisiten', 'props': 'Requisite',
            'sopran': 'Sopran', 'soprano': 'Sopran', 'sängerin': 'Sängerin',
            'bass-bariton': 'Bass-Bariton', 'bass-baritone': 'Bass-Bariton',
            'tenor': 'Tenor', 'sänger': 'Sänger',
            'instrumentalstudierende': 'Instrumentalstudierende', 'instrumental students': 'Instrumentalstudierende',
            'chor': 'Chor', 'chorus': 'Chor',
            'kostüm': 'Kostüm', 'kostum': 'Kostüm', 'kostüm design': 'Kostümbild', 'costumes': 'Kostüm',
            'costume design': 'Kostümbild',
            'dramaturgie': 'Dramaturgie',
            'dirigat': 'Dirigat', 'musikalische leitung': 'Musikalische Leitung',
            'komposition': 'Komposition', 'libretto': 'Libretto',
            'produktionsleitung': 'Produktionsleitung',
            'klavier, harmonium': 'Klavier, Harmonium',
            'screenplay': 'Drehbuch', 'producers': 'Produzenten',
            'music': 'Musik', 'sound design': 'Sound Design', 'director of photography': 'Kamera',
            'editor': 'Schnitt', 'production design': 'Szenenbild', 'executive producer': 'Executive Producer',
            'light design & color': 'Licht & Farbgestaltung', 'cast': 'Besetzung',
            'kinder- und jugendchor': 'Kinder- und Jugendchor',
            'vermittlung': 'Vermittlung', 'regieassistenz': 'Regieassistenz', 'regiehospitanz': 'Regiehospitanz',
            'musikalische assistenz': 'Musikalische Assistenz', 'musikalische einstudierung': 'Musikalische Einstudierung',
            'bühenbildhospitanz': 'Bühnenbildhospitanz', 'bühnenbildassistenz': 'Bühnenbildassistenz',
            'kostümassistenz': 'Kostümassistenz', 'orchester': 'Orchester', 'statisterie': 'Statisterie'
        }
    };

    function translateCreativeTeamLabels(lang) {
        const map = roleLabels[lang];
        if (!map) return;
        const labels = document.querySelectorAll('.project-team .row .label');
        if (!labels.length) return;
        labels.forEach((el) => {
            const raw = (el.textContent || '').trim();
            if (!raw) return;
            const base = raw.replace(/:\s*$/, '').trim();
            const lower = base.toLowerCase();
            const stripped = lower.normalize('NFD').replace(/[̀-ͯ]/g, '');
            const translated = map[lower] || map[stripped];
            if (translated) el.textContent = translated;
        });
    }

    function applyTranslations(lang) {
        const t = translations[lang] || translations.en;

        document.querySelectorAll('.site-navbar-links a[data-spy], .site-navbar-links a[data-nav]').forEach((a) => {
            const key = (a.getAttribute('data-spy') || a.getAttribute('data-nav') || '').toUpperCase();
            if (t.nav[key]) a.textContent = t.nav[key];
        });

        document.querySelectorAll('.site-navbar-lang').forEach((btn) => { btn.textContent = t.langToggle; });

        Object.keys(t.sectionHeads).forEach((key) => {
            const el = document.querySelector('#' + key.toLowerCase() + ' [data-i18n-head]');
            if (el) el.textContent = t.sectionHeads[key];
        });

        document.querySelectorAll('.site-footer .flinks a').forEach((a) => {
            const href = a.getAttribute('href') || '';
            if (href.includes('imprint')) a.textContent = t.footer.IMPRINT;
            if (href.includes('privacy')) a.textContent = t.footer.PRIVACY;
        });

        const role = document.querySelector('.contact-details .role');
        if (role) role.textContent = t.contact.ROLE;

        const heroEyebrow = document.querySelector('.hero-eyebrow');
        if (heroEyebrow) heroEyebrow.textContent = t.heroEyebrow;

        const bioText = document.querySelector('.bio-text');
        if (bioText && t.long && Array.isArray(t.long.biography)) {
            bioText.innerHTML = t.long.biography.map((p) => `<p>${p}</p>`).join('');
        }

        document.querySelectorAll('.production-meta[data-en][data-de]').forEach((el) => {
            el.textContent = lang === 'de' ? el.dataset.de : el.dataset.en;
        });

        document.querySelectorAll('[data-en][data-de].project-place').forEach((el) => {
            el.textContent = lang === 'de' ? el.dataset.de : el.dataset.en;
        });

        translateCreativeTeamLabels(lang);
    }

    function setLang(lang) {
        try { localStorage.setItem(STORAGE_KEY, lang); } catch (_) { }
        document.documentElement.setAttribute('lang', lang);
        applyTranslations(lang);
    }

    function getLang() {
        try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG; } catch (_) { return DEFAULT_LANG; }
    }

    function init() {
        const current = getLang();
        document.documentElement.setAttribute('lang', current);
        applyTranslations(current);
        document.querySelectorAll('.site-navbar-lang').forEach((btn) => {
            btn.addEventListener('click', () => {
                const now = getLang();
                setLang(now === 'en' ? 'de' : 'en');
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
