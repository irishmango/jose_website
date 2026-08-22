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

// Internationalization (EN/DE) — toggle via menu button and persist
(function () {
    const STORAGE_KEY = 'site_lang';
    const DEFAULT_LANG = (document.documentElement.getAttribute('lang') || 'en').toLowerCase().startsWith('de') ? 'de' : 'en';

    const translations = {
        en: {
            menuLabel: 'MENU',
            close: 'X',
            nav: {
                HOME: 'HOME',
                BIOGRAPHY: 'BIOGRAPHY',
                PROJECTS: 'PROJECTS',
                REVIEWS: 'REVIEWS',
                CONTACT: 'CONTACT'
            },
            sections: {
                BIOGRAPHY: 'BIOGRAPHY',
                PROJECTS: 'PROJECTS',
                REVIEWS: 'REVIEWS',
                CONTACT: 'CONTACT'
            },
            projectLabel: 'PROJECTS',
            footer: {
                IMPRINT: 'imprint',
                PRIVACY: 'privacy policy'
            },
            contact: {
                ROLE: 'Opera Director',
                REPRESENTATION: 'representation:'
            },
            heroSubtitle: 'Opera Director',
            backToTopTitle: 'Go to top',
            nextToggle: 'DE',
            long: {
                biography: [
                    'Born in Puerto Rico, José Cortés completed the Ofelia D’Acosta Acting Academy as well as the Escuela Central de Artes Visuales in San Juan. He studied Spanish literature at the University of Puerto Rico and gained diverse artistic experience in dance, theater, and film.',
                    'His path then led him to Berlin, where he completed a bachelor’s and master’s degree in opera singing. He worked as an assistant director at the Deutsche Oper Berlin, the Staatsoper Berlin, and the Oper Graz, among others. This was followed by seminars and directing workshops with Tatjana Gürbaca, Claus Guth, Hans Neuenfels, Nadja Loschky, and Katharina Wagner.',
                    'His productions include La Bohème, Così fan tutte, Die Fledermaus, La Calisto, the world premiere of Lovelease, as well as the first festival performance at Goetheplatz with the orchestra and soloists of the Bayreuth Festival.',
                    'On March 15, 2025, Cortés makes his debut with Puccini’s Tosca at the Staatstheater Wiesbaden.',
                    'In 2025, Cortés made his debut as a film director with The Answering Machine.'
                ],
                review1: `(<em>translated from german</em>)<br>
                Of all works, it is Giacomo Puccini’s “Tosca” — one of the top ten operas worldwide — with which José Cortés successfully makes his directing debut at the Staatstheater Wiesbaden. The audience celebrates the premiere with rapturous applause and standing ovations. The prime catalysts are Chin Chao Lin and Sinéad Campbell Wallace. The Taiwanese conductor and the Irish soprano share a Tosca history and know how to unleash blazing expressivity with great subtlety. Cortés aligns his concept of a profound psychological portrait with this and accepts that much is sung at the footlights.<br>
                The legendary Tosca with Maria Callas was in the back of his mind as Cortés approached the work. He engaged with Victorien Sardou’s drama La Tosca, which Giuseppe Giacosa and Luigi Illica used as the basis for the libretto, and delved into the psyche of Floria Tosca. His aim is to make the unspoken visible.<br>
                It is complex emotions — love, jealousy, hatred, fear, and despair — that govern Floria Tosca’s thinking and take shape in the music. Puccini captured every facet of human depths in the score. Not enough for Cortés. He wants to depict the turmoil inside Floria Tosca’s head concretely, directing the gaze to superfluous trifles and introducing mute characters that are not provided for in the libretto.<br>
                Right in the first act, Marchesa Attavanti, Angelotti’s sister, appears in the church. In the shadow of a pillar she kisses Mario Cavaradossi passionately, confirming the affair that Tosca only suspects according to the libretto. And because Queen Maria Carolina embodies ruthlessness in Sardou’s play, Cortés places her at Scarpia’s side as if she were the true villain. In the second act, at the emotional and dramatic peak, two further Tosca doubles populate the stage — one pious, the other frivolous — to explain to the audience why the singing Tosca ultimately does not stab in self‑defense but becomes a murderer. Afterwards, Cortés decisively opts for neither a laying‑out, nor remorse — nor a love scene, nor victory.<br>
                Historically, Tosca takes place around 1800 at concrete locations in Rome during a time of political instability. The settings are well‑known buildings: the church of Sant’Andrea della Valle, the Palazzo Farnese, the Castel Sant’Angelo. Set designer Manuel La Caste reduces props to a minimum in order to define the spaces and, together with Martin Siemann, uses the effective means of light and shadow for atmosphere. Artfully arranged and carefully composed, these spaces breathe loneliness, abandonment, hopelessness, and downfall — shot through with a few moments of radiant transfiguration.<br>
                Puccini was a master at intensifying cruelties through the contrast with seemingly harmless ‘spherical’ music, especially when good and evil must come together in ensemble. This is especially true of the second act. As much as Massimo Cavalletti enjoyed himself in the role of Baron Scarpia, he lacked the requisite sense of menace that also requires pushing the voice to its limits. By contrast, Otar Jorjikia poured all his strength into Cavaradossi’s cry of “Vittoria!” — so emotional and powerful that it did not miss its mark. This was all the more surprising because Jorjikia delivered the famous aria “Recondita armonia” in the first act correctly but with economy, faltered vocally at first in the finale, and then, in the duet “O dolci mani,” mustered all his concentration to shape the soft and strong tones with the utmost tenderness.<br>
                Quite different was Sinéad Campbell Wallace. She possesses the technique, power, and instinct for a razor‑sharp characterisation. The cantilenas flow with ease; she shapes with subtly finest shadings and brilliance even into extreme heights, acting with intense expression to render the diva Floria Tosca’s chaos of feeling with all the requisite passion and emotional depth — unreservedly, with seemingly endless breath. With Tosca’s prayer “Vissi d’arte” she electrified all the premiere‑goers. Her interpretation, full of suspenseful expressivity and intimate intensity, is rare. She first celebrated a Tosca success with Chin Chao Lin at the podium in 2019 under the open sky in Regensburg. In 2023, the Irish exceptional soprano was awarded the Olivier Award for this role at English National Opera. Chin Chao Lin, currently First Kapellmeister at Staatstheater Wiesbaden and, from the coming season, General Music Director at Stadttheater Klagenfurt, in turn convinced in the pit. Unafraid of characterising effects and thunderous sonorities, he heightened the impact of bizarre sweetness, applied cruelties, and deep‑psychological readings without neglecting the filigree details. Seldom does this score succeed so uncompromisingly dramatically and compellingly. The Hessisches Staatstheater orchestra performed at the highest level.`
            }
        },
        de: {
            menuLabel: 'MENÜ',
            close: 'X',
            nav: {
                HOME: 'STARTSEITE',
                BIOGRAPHY: 'BIOGRAFIE',
                PROJECTS: 'PROJEKTE',
                REVIEWS: 'REZENSIONEN',
                CONTACT: 'KONTAKT'
            },
            sections: {
                BIOGRAPHY: 'BIOGRAFIE',
                PROJECTS: 'PROJEKTE',
                REVIEWS: 'REZENSIONEN',
                CONTACT: 'KONTAKT'
            },
            projectLabel: 'PROJEKTE',
            footer: {
                IMPRINT: 'impressum',
                PRIVACY: 'datenschutz'
            },
            contact: {
                ROLE: 'Opernregisseur',
                REPRESENTATION: 'Vertretung:'
            },
            heroSubtitle: 'Opernregisseur',
            backToTopTitle: 'Nach oben',
            nextToggle: 'EN',
            long: {
                biography: [
                    'In Puerto Rico geboren, absolvierte José Cortés die Schauspielakademie Ofelia D’Acosta sowie die Escuela Central de Artes Visuales in San Juan. Er studierte spanische Literatur an der Universidad de Puerto Rico und sammelte vielseitige künstlerische Erfahrungen in den Bereichen Tanz, Theater und Film.',
                    'Sein Weg führte ihn anschließend nach Berlin, wo er ein Bachelor- und Masterstudium im Operngesang absolvierte. Als Regieassistent war er unter anderem an der Deutschen Oper Berlin, der Staatsoper Berlin und der Oper Graz tätig. Es folgten Seminare und Regie-Workshops bei Tatjana Gürbaca, Claus Guth, Hans Neuenfels, Nadja Loschky und Katharina Wagner.',
                    'Zu seinen Inszenierungen zählen La Bohème, Così fan tutte, Die Fledermaus, La Calisto, die Uraufführung von Lovelease sowie die erste Festspielarbeit am Goetheplatz mit Orchester und Solisten der Bayreuther Festspiele.',
                    'Am 15. März 2025 debütiert Cortés mit Tosca von Puccini am Staatstheater Wiesbaden.',
                    '2025 feierte Cortés sein Debut als Filmregisseur mit The Answering Machine.'
                ],
                review1: `Ausgerechnet mit Giacomo Puccinis „Tosca“, einer der Top-Ten Opernwerke weltweit, meistert José Cortés sein Regiedebüt am Staatstheater Wiesbaden. Das Publikum feiert die Premiere mit frenetischem Applaus und Standing Ovations. Ursächlicher Auslöser dafür sind Chin Chao Lin und Sinéad Campbell Wallace. Der taiwanische Dirigent und die irische Sopranistin haben eine gemeinsame Tosca-Geschichte und verstehen sich darauf, glühende Expressivität überaus subtil zu entfesseln. José Cortés stimmt sein Konzept einer tiefgreifenden Seelenschau darauf ab und nimmt dabei in Kauf, dass viel an der Rampe gesungen wird.<br>
                Die legendäre Tosca mit Maria Callas saß in seinem Hinterkopf, als sich José Cortés mit dem Stoff auseinandersetzte. Er beschäftigte sich mit dem Drama La Tosca von Victorien Sardou, das Giuseppe Giacosa und Luigi Illica als Grundlage für das Libretto nutzten, und vertiefte sich in die Psyche der Floria Tosca. Das Unausgesprochene sichtbar machen, gilt seine Absicht.<br>
                Es sind komplexe Emotionen wie Liebe, Eifersucht, Hass, Angst und Verzweiflung, die Floria Toscas Denken bestimmen und in der Musik Gestalt annehmen. Puccini packte alle Facetten menschlicher Untiefen in die Partitur. Nicht genug für José Cortés. Er will die Turbulenzen im Kopf der Floria Tosca konkret abbilden, lenkt den Blick auf überflüssige Nebensächlichkeiten und führt stumme Charaktere ein, die nicht im Libretto vorgesehen sind.<br>
                Gleich im ersten Akt taucht in der Kirche die Marchesa Attavanti, Angelottis Schwester auf. Im Schatten einer Kirchensäule küsst sie Mario Cavaradossi voller Leidenschaft und bestätigt damit die Affäre, die Tosca nur laut Libretto vermutet. Und weil die Königin Maria Karolina in Sardous Bühnenstück die personifizierte Skrupellosigkeit verkörpert, stellt José Cortés sie an die Seite von Scarpia, als sei sie die eigentlich Böse. Im zweiten Akt auf dem emotional und dramatisch stärksten Höhepunkt bevölkern zwei weitere Tosca-Double die Szenerie, die eine frömmelnd, die andere frivol, um dem Publikum zu erklären, warum die singende Tosca schließlich nicht aus Notwehr zum Messer greift, sondern zur Mörderin wird. Danach entscheidet sich Cortés schlüssig für kein Aufbahren, keine Reue. Aber auch keine Liebesszene und keinen Sieg.<br>
                Historisch gesehen spielt Tosca um 1800 an konkreten Orten in Rom in einer Zeit politischer Instabilität. Die Spielorte sind bekannte Gebäude, die Kirche Sant´Andrea della Valle, der Palazzo Farnese, die Engelsburg. Bühnenbildner Manuel La Caste reduziert auf ein Minimum an Requisiten, um die Räume zu definieren und nutzt mit Martin Siemann an seiner Seite die effektvollen Mittel aus Licht und Schatten für das Atmosphärische. Kunstvoll arrangiert, sorgsam komponiert atmen diese Räume Einsamkeit, Verlorenheit, Hoffnungslosigkeit und Untergang, durchsetzt von wenigen Momenten lichtdurchfluteter Verklärung.<br>
                Puccini war ein Meister darin, Grausamkeiten durch den Kontrast zu relativ harmloser Sphärenmusik zu verstärken, vor allem wenn Gut und Böse sich im Ensemble zusammenfinden müssen. Das gilt vor allem für den zweiten Akt. Doch so sehr Massimo Cavalletti sich in der Rolle des Baron Scarpia auch gefiel, entbehrte er jenes Maß an Bedrohlichkeit, das auch voraussetzt, bis an die Grenzen der Stimme heranzugehen. Otar Jorjikia als Cavaradossis legte hingegen alle Kraft in seinen Ausruf „Vittoria!“. So emotional und stimmgewaltig, wie es Otar Jorjikia intonierte, verfehlte es seine Wirkung nicht. Dies überraschte um so mehr, da Otar Jorjikia die berühmte Arie „Recondita armonia“ gleich im ersten Akt korrekt, aber kräftesparend zum Besten gab, im Finale zunächst stimmlich einbrach, im Duett „O dolci mani“ alle Konzentration aufbrachte, um die leisen und starken Töne mit aller Zärtlichkeit auszugestalten.<br>
                Ganz anders Sinéad Campbell Wallace. Sie verfügt über die Technik, die Kraft und das Gespür für eine messerscharfe Charakteristik. Fließend gelingen ihr die Kantilenen, souverän gestaltet sie mit subtil feinsten Schattierungen und Strahlkraft bis in extreme Höhen, um darstellerisch intensiv das Gefühlschaos der Diva Floria Tosca mit aller gebotenen Leidenschaftlichkeit und emotionalen Tiefe rückhaltlos auszudrücken. Und das mit fast unendlichem Atem. Mit Toscas Gebet „Vissi d´arte“ elektrisierte sie alle Premierenbesucher. Ihre Interpretation voller spannungsgeladener Expressivität wie intimer Intensität ist selten. Ihren ersten Tosca Erfolg feierte Sinéad Campbell Wallace mit Chin Chao Lin am Dirigentenpult 2019 unter freiem Himmel in Regensburg. 2023 wurde die irische Ausnahme-Sopranistin für diese Partie an der English National Opera mit dem Olivier Award ausgezeichnet. Chin Chao Lin, derzeit erster Kapellmeister am Staatstheater Wiesbaden und ab der kommenden Spielzeit GMD am Stadttheater Klagenfurt, überzeugte seinerseits am Pult im Orchestergraben. Ohne Scheu vor charakterisierenden Effekten und donnernden Klängen verstärkte er die Wirkung bizarrer Süßlichkeit wie angewandter Grausamkeiten und tiefenpsychologischer Deutung, ohne die filigranen Details zu vernachlässigen. Selten gelingt diese Partitur so kompromisslos dramatisch und mitreißend. Das Hessische Staattheaterorchester musizierte in Höchstform.`
            }
        }
    };

    function getLang() {
        try {
            return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
        } catch (_) {
            return DEFAULT_LANG;
        }
    }

    function setLang(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (_) { }
        document.documentElement.setAttribute('lang', lang);
        applyTranslations(lang);
    }

    function findNavLink(hrefEndsWith) {
        if (!drawer) return null;
        // Support both root and project pages (relative vs anchor-only)
        return (
            drawer.querySelector(`.drawer-nav a[href$="${hrefEndsWith}"]`) ||
            drawer.querySelector(`.drawer-nav a[href$="index.html${hrefEndsWith}"]`) ||
            drawer.querySelector(`.drawer-nav a[href$="../index.html${hrefEndsWith}"]`)
        );
    }

    // Creative team role label translations for project pages
    const roleLabels = {
        en: {
            'regie': 'Director',
            'director': 'Director',
            'bühnenbild': 'Set design',
            'buhnenbild': 'Set design',
            'set design': 'Set design',
            'belichtung': 'Lighting',
            'licht': 'Lighting',
            'lighting': 'Lighting',
            'fotos': 'Photos',
            'photos': 'Photos',
            'requisite': 'Props',
            'requisiten': 'Props',
            'props': 'Props',
            'stage props': 'Props',
            'sopran': 'Soprano',
            'soprano': 'Soprano',
            'bass-bariton': 'Bass-baritone',
            'bass bariton': 'Bass-baritone',
            'bass-baritone': 'Bass-baritone',
            'tenor': 'Tenor',
            'instrumentalstudierende': 'Instrumental students',
            'instrumental studierende': 'Instrumental students',
            'instrumental students': 'Instrumental students',
            'chor': 'Chorus',
            'chorus': 'Chorus',
            'kostüm': 'Costumes',
            'kostum': 'Costumes',
            'costumes': 'Costumes'
        },
        de: {
            'regie': 'Regie',
            'director': 'Regie',
            'bühnenbild': 'Bühnenbild',
            'buhnenbild': 'Bühnenbild',
            'set design': 'Bühnenbild',
            'belichtung': 'Belichtung',
            'licht': 'Belichtung',
            'lighting': 'Belichtung',
            'fotos': 'Fotos',
            'photos': 'Fotos',
            'requisite': 'Requisiten',
            'requisiten': 'Requisiten',
            'props': 'Requisiten',
            'stage props': 'Requisiten',
            'sopran': 'Sopran',
            'soprano': 'Sopran',
            'bass-bariton': 'Bass-Bariton',
            'bass bariton': 'Bass-Bariton',
            'bass-baritone': 'Bass-Bariton',
            'tenor': 'Tenor',
            'instrumentalstudierende': 'Instrumentalstudierende',
            'instrumental studierende': 'Instrumentalstudierende',
            'instrumental students': 'Instrumentalstudierende',
            'chor': 'Chor',
            'chorus': 'Chor',
            'kostüm': 'Kostüm',
            'kostum': 'Kostüm',
            'costumes': 'Kostüm'
        }
    };

    function translateCreativeTeamLabels(lang) {
        const map = roleLabels[lang];
        if (!map) return;
        const strongs = document.querySelectorAll('.creative-team p strong');
        if (!strongs.length) return;
        strongs.forEach((el) => {
            const raw = (el.textContent || '').trim();
            const base = raw.replace(/:\s*$/, '').trim();
            const lower = base.toLowerCase();
            const stripped = lower.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
            const candidates = [lower, stripped];
            let translated = null;
            for (const key of candidates) {
                if (map[key]) { translated = map[key]; break; }
            }
            if (translated) {
                el.textContent = translated + ':';
            }
        });
    }

    function applyTranslations(lang) {
        const t = translations[lang] || translations.en;

        // Menu label (hamburger)
        const menuLabel = document.querySelector('.menu-label');
        if (menuLabel) menuLabel.textContent = t.menuLabel;

        // Close button
        const closeButton = document.getElementById('closeDrawer');
        if (closeButton) closeButton.textContent = t.close;

        // Drawer links
        const home = findNavLink('index.html');
        if (home) home.textContent = t.nav.HOME;
        const bio = findNavLink('#biography');
        if (bio) bio.textContent = t.nav.BIOGRAPHY;
        const projects = findNavLink('#projects');
        if (projects) projects.textContent = t.nav.PROJECTS;
        const reviews = findNavLink('#reviews');
        if (reviews) reviews.textContent = t.nav.REVIEWS;
        const contact = findNavLink('#contact');
        if (contact) contact.textContent = t.nav.CONTACT;

        // Section rail labels on index
        const bioLabel = document.querySelector('#biography .section-label');
        if (bioLabel) bioLabel.textContent = t.sections.BIOGRAPHY;
        const projLabel = document.querySelector('#projects .section-label');
        if (projLabel) projLabel.textContent = t.sections.PROJECTS;
        const revLabel = document.querySelector('#reviews .section-label');
        if (revLabel) revLabel.textContent = t.sections.REVIEWS;
        const contactLabel = document.querySelector('#contact .section-label');
        if (contactLabel) contactLabel.textContent = t.sections.CONTACT;

        // Project page left rail label
        const projectRail = document.querySelector('.project-label');
        if (projectRail) projectRail.textContent = t.projectLabel;

        // Footer links
        document.querySelectorAll('.footer .footer-link').forEach((a) => {
            const href = a.getAttribute('href') || '';
            if (href.includes('imprint')) a.textContent = t.footer.IMPRINT;
            if (href.includes('privacy')) a.textContent = t.footer.PRIVACY;
        });

        // Contact role and labels
        const role = document.querySelector('.contact-role');
        if (role) role.textContent = t.contact.ROLE;
        const rep = document.querySelector('.contact-rep-label');
        if (rep) rep.textContent = t.contact.REPRESENTATION;

        // Hero subtitle (index)
        const heroSub = document.querySelector('.subtitle');
        if (heroSub) heroSub.textContent = t.heroSubtitle;

        // Back to top title
        const btt = document.getElementById('backToTop');
        if (btt) btt.setAttribute('title', t.backToTopTitle);

        // Toggle button label
        const toggle = document.getElementById('langToggle');
        if (toggle) toggle.textContent = t.nextToggle;

        // Long-form translations (Biography & Reviews)
        // Biography: replace paragraphs with language-specific content
        const bioText = document.querySelector('.bio-text');
        if (bioText && t.long && Array.isArray(t.long.biography)) {
            bioText.innerHTML = t.long.biography.map(p => `<p>${p}</p>`).join('');
        }

        // Reviews: scope content swap to Tosca review only
        const reviewText = document.getElementById('tosca-review-text');
        if (reviewText && t.long && t.long.review1) {
            reviewText.innerHTML = t.long.review1;
        }

        // Answering Machine reviews: toggle EN/DE blocks visibility based on current lang
        const showDe = lang === 'de';
        const enBlocks = document.querySelectorAll('.reviews .review-text--en');
        const deBlocks = document.querySelectorAll('.reviews .review-text--de');
        enBlocks.forEach((el) => {
            if (showDe) {
                el.style.display = 'none';
                el.setAttribute('aria-hidden', 'true');
            } else {
                el.style.display = '';
                el.setAttribute('aria-hidden', 'false');
            }
        });
        deBlocks.forEach((el) => {
            if (showDe) {
                el.style.display = '';
                el.setAttribute('aria-hidden', 'false');
            } else {
                el.style.display = 'none';
                el.setAttribute('aria-hidden', 'true');
            }
        });

        // Creative team role labels on project pages
        translateCreativeTeamLabels(lang);
    }

    function init() {
        const current = getLang();
        document.documentElement.setAttribute('lang', current);
        applyTranslations(current);

        const toggle = document.getElementById('langToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                const now = getLang();
                const next = now === 'en' ? 'de' : 'en';
                setLang(next);
            });
        }
    }

    // Defer to DOM ready to ensure elements exist
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();