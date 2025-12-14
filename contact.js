// Theme Toggle Logic
const body = document.body;
const html = document.documentElement;
const savedTheme = localStorage.getItem('colorTheme') || 'burgundy';
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

// Contact Form Handler

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = form.querySelector('.submit-btn');

    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        try {
            // Send email using FormSubmit.co (free email service)
            const response = await fetch('https://formsubmit.co/ajax/alantemediaconsulting@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Contact Form Message from ${data.name}`,
                    _template: 'table',
                    _captcha: 'false',
                    name: data.name,
                    email: data.email,
                    phone: data.phone || 'Not provided',
                    company: data.company || 'Not provided',
                    message: data.message
                })
            });

            if (response.ok) {
                showStatus('success', 'Thank you for reaching out! We\'ll get back to you within 24-48 hours.');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);

            // Fallback: Open email client with pre-filled content
            const mailtoLink = createMailtoLink(data);
            window.location.href = mailtoLink;

            showStatus('info', 'Opening your email client... Please send the pre-filled email to complete your message.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

    // Create mailto link as fallback
    function createMailtoLink(data) {
        const subject = encodeURIComponent(`Contact from ${data.name}`);
        const body = encodeURIComponent(`
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone || 'Not provided'}
Company: ${data.company || 'Not provided'}

Message:
${data.message}

---
Sent via Alanté Media Consulting website
        `.trim());
        return `mailto:alantemediaconsulting@gmail.com?subject=${subject}&body=${body}`;
    }

    // Show status message
    function showStatus(type, message) {
        formStatus.className = `form-status ${type} show`;
        formStatus.textContent = message;

        // Auto-hide after 8 seconds
        setTimeout(() => {
            formStatus.classList.remove('show');
        }, 8000);
    }

    // Input validation and formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            // Remove non-numeric characters except + and -
            let value = e.target.value.replace(/[^\d+\-() ]/g, '');
            e.target.value = value;
        });
    }

    // Auto-resize textarea
    const textarea = document.getElementById('message');
    if (textarea) {
        textarea.addEventListener('input', function () {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }

    // Form field animations
    const formInputs = form.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });
});
