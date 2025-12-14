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

// Founder Navigation Logic
const heroSection = document.querySelector('#hero-section');
const founderCards = document.querySelectorAll('.hero-founder');
const founderDetailSections = document.querySelectorAll('.founder-detail-section');
const backArrows = document.querySelectorAll('.back-arrow');
const scrollContainer = document.querySelector('.scroll-container');

// Click on founder card to show detail
founderCards.forEach(card => {
    card.addEventListener('click', () => {
        const founderId = card.dataset.founder;
        const detailSection = document.querySelector(`#${founderId}-detail`);

        if (detailSection) {
            // Hide hero section
            heroSection.style.display = 'none';

            // Show the selected founder detail section
            detailSection.classList.add('active');
            detailSection.classList.add('visible');

            // Scroll to top of detail section
            scrollContainer.scrollTo({
                top: detailSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Click back arrow to return to hero
backArrows.forEach(arrow => {
    arrow.addEventListener('click', () => {
        // Hide all detail sections
        founderDetailSections.forEach(section => {
            section.classList.remove('active');
            section.classList.remove('visible');
        });

        // Show hero section
        heroSection.style.display = 'flex';

        // Scroll to hero section
        scrollContainer.scrollTo({
            top: 0,
            behavior: 'smooth'
        });

        // Re-trigger visibility animation
        setTimeout(() => {
            heroSection.classList.add('visible');
        }, 100);
    });
});

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

    if (heroSection) {
        headerObserver.observe(heroSection);
    }
});
