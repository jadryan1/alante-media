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

// Book Consultation Form Handler


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('consultation-form');
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

        // Prepare email content
        const emailContent = formatEmailContent(data);

        try {
            // Send email using FormSubmit.co (free email service)
            const response = await fetch('https://formsubmit.co/ajax/alantemediaconsulting@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `New Consultation Request from ${data.firstName} ${data.lastName}`,
                    _template: 'table',
                    _captcha: 'false',
                    firstName: data.firstName,
                    lastName: data.lastName,
                    company: data.company,
                    position: data.position,
                    phone: data.phone,
                    email: data.email,
                    businessProfile: data.businessProfile || 'Not provided',
                    interest: data.interest,
                    bestTime: data.bestTime
                })
            });

            if (response.ok) {
                showStatus('success', 'Thank you! Your consultation request has been submitted successfully. We\'ll be in touch soon.');
                form.reset();
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);

            // Fallback: Open email client with pre-filled content
            const mailtoLink = createMailtoLink(data);
            window.location.href = mailtoLink;

            showStatus('info', 'Opening your email client... Please send the pre-filled email to complete your consultation request.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });

    // Format email content for display
    function formatEmailContent(data) {
        return `
New Consultation Request

Contact Information:
- Name: ${data.firstName} ${data.lastName}
- Company: ${data.company}
- Position: ${data.position}
- Phone: ${data.phone}
- Email: ${data.email}
- Business Profile: ${data.businessProfile || 'Not provided'}

Message:
${data.interest}

Best Time to Reach:
${data.bestTime}

---
Submitted via Alanté Media Consulting website
        `.trim();
    }

    // Create mailto link as fallback
    function createMailtoLink(data) {
        const subject = encodeURIComponent(`Consultation Request from ${data.firstName} ${data.lastName}`);
        const body = encodeURIComponent(formatEmailContent(data));
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
    phoneInput.addEventListener('input', (e) => {
        // Remove non-numeric characters except + and -
        let value = e.target.value.replace(/[^\d+\-() ]/g, '');
        e.target.value = value;
    });

    // Auto-resize textarea
    const textarea = document.getElementById('interest');
    textarea.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });

    // Form field animations
    const formInputs = form.querySelectorAll('input, select, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            this.parentElement.classList.remove('focused');
        });
    });
});
