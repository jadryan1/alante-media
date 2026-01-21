// Theme Toggle Logic
const body = document.body;
const html = document.documentElement;
const savedTheme = localStorage.getItem('colorTheme') || 'burgundy'; // Default to burgundy
// Apply theme immediately to both html and body
body.className = `${savedTheme}-theme`;
html.className = `${savedTheme}-theme`;

// Theme toggle button
const themeToggle = document.querySelector('.theme-toggle');

// Set initial toggle state
const updateToggleState = (theme) => {
    if (theme === 'cream') {
        themeToggle.classList.add('light');
    } else {
        themeToggle.classList.remove('light');
    }
};

updateToggleState(savedTheme);

// Add click handler
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.className.replace('-theme', '');
        const newTheme = currentTheme === 'burgundy' ? 'cream' : 'burgundy';

        // Update body and html class
        body.className = `${newTheme}-theme`;
        html.className = `${newTheme}-theme`;

        // Save to localStorage
        localStorage.setItem('colorTheme', newTheme);

        // Update toggle state
        updateToggleState(newTheme);
    });
}

// Menu Toggle Logic
const menuBtn = document.querySelector('.menu-btn');
const sideMenu = document.getElementById('side-menu');
const closeMenuBtn = document.querySelector('.close-menu-btn');

if (menuBtn && sideMenu && closeMenuBtn) {
    menuBtn.addEventListener('click', () => {
        sideMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeMenuBtn.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Intersection Observer and Header Logic
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('#hero-section');

    // Intersection Observer for scroll snap fade-ins (matching home page)
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

    // Header Observer (Monitors Hero Section)
    const headerObserver = new IntersectionObserver((entries) => {
        const header = document.querySelector('.header');
        entries.forEach(entry => {
            // When hero is NOT intersecting, keep scrolled state
            if (!entry.isIntersecting) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }, { threshold: 0.5 });

    if (heroSection) {
        headerObserver.observe(heroSection);
    }
});
