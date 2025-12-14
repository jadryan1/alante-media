// Import shared menu and theme logic
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
        document.body.style.overflow = 'hidden';
    });

    closeMenuBtn.addEventListener('click', () => {
        sideMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Carousel functionality
class Carousel {
    constructor(element) {
        this.element = element;
        this.track = element.querySelector('.carousel-track');
        this.slides = Array.from(element.querySelectorAll('.carousel-slide'));
        this.dots = Array.from(element.parentElement.querySelectorAll('.dot'));
        this.prevBtn = element.querySelector('.prev');
        this.nextBtn = element.querySelector('.next');
        this.currentIndex = 0;

        this.init();
    }

    init() {
        // Button click handlers
        this.prevBtn.addEventListener('click', () => this.prev());
        this.nextBtn.addEventListener('click', () => this.next());

        // Dot click handlers
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        // Auto-play (optional - uncomment if desired)
        // this.startAutoPlay();
    }

    goToSlide(index) {
        // Remove active class from current slide and dot
        this.slides[this.currentIndex].classList.remove('active');
        this.dots[this.currentIndex].classList.remove('active');

        // Update index
        this.currentIndex = index;

        // Add active class to new slide and dot
        this.slides[this.currentIndex].classList.add('active');
        this.dots[this.currentIndex].classList.add('active');

        // Move track
        const offset = -this.currentIndex * 100;
        this.track.style.transform = `translateX(${offset}%)`;
    }

    next() {
        const nextIndex = (this.currentIndex + 1) % this.slides.length;
        this.goToSlide(nextIndex);
    }

    prev() {
        const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
        this.goToSlide(prevIndex);
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => {
            this.next();
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
        }
    }
}

// Initialize all carousels on the page
document.addEventListener('DOMContentLoaded', () => {
    const carouselContainers = document.querySelectorAll('.carousel-container');
    carouselContainers.forEach(container => {
        new Carousel(container);
    });

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

    const heroSection = document.querySelector('.page-hero');
    if (heroSection) {
        headerObserver.observe(heroSection);
    }
});
