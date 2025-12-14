// Theme Selector Logic
const body = document.body;
const savedTheme = localStorage.getItem('colorTheme') || 'black';
body.className = savedTheme === 'black' ? 'light-mode' : `${savedTheme}-theme`;

// Theme selector buttons
const themeButtons = document.querySelectorAll('.theme-btn');

// Set initial active state
const setActiveTheme = (theme) => {
    themeButtons.forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
};

setActiveTheme(savedTheme);

// Add click handlers
themeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;

        // Update body class
        if (theme === 'black') {
            body.className = 'light-mode';
        } else {
            body.className = `${theme}-theme`;
        }

        // Save to localStorage
        localStorage.setItem('colorTheme', theme);

        // Update active state
        setActiveTheme(theme);
    });
});

// Menu Toggle Logic
const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.getElementById('side-menu');
const closeMenuBtn = document.querySelector('.close-menu-btn');

if (menuBtn && sideMenu && closeMenuBtn) {
    menuBtn.addEventListener('click', () => {
        sideMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock text scroll (if needed)
    });

    closeMenuBtn.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Intersection Observer for scroll snap fade-ins
const observerOptions = {
    threshold: 0.5 // Trigger when 50% visible (snapped)
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

const sections = document.querySelectorAll('.scroll-section');
sections.forEach(section => {
    observer.observe(section);
});

// Dedicated Observer for Header State (Monitors Hero Section)
const headerObserver = new IntersectionObserver((entries) => {
    const header = document.querySelector('.header');
    entries.forEach(entry => {
        // When hero is NOT intersecting (or ratio is low), set scanned state
        if (!entry.isIntersecting) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of hero is out/in

const heroSection = document.querySelector('.hero');
if (heroSection) {
    headerObserver.observe(heroSection);
}

// Auto-snap scroll behavior - smooth snapping in both directions
const scrollContainer = document.querySelector('.scroll-container');
let isScrolling = false;

if (scrollContainer) {
    scrollContainer.addEventListener('scroll', () => {
        if (isScrolling) return;

        const scrollTop = scrollContainer.scrollTop;
        const viewportHeight = window.innerHeight;

        // If we're in the transition zone between first and second page
        if (scrollTop > 0 && scrollTop < viewportHeight) {
            isScrolling = true;

            // Determine direction: if more than halfway, go to second page, otherwise go to first
            const targetScroll = scrollTop > viewportHeight * 0.3 ? viewportHeight : 0;

            scrollContainer.scrollTo({
                top: targetScroll,
                behavior: 'smooth'
            });

            setTimeout(() => {
                isScrolling = false;
            }, 400);
        }
    });
}

