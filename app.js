// Global Tech HVAC Engineers - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileNav = document.querySelector('.mobile-nav');
    const body = document.body;

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            mobileNav.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileNav.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuBtn.contains(event.target) && !mobileNav.contains(event.target)) {
                mobileNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Smooth Scrolling for Navigation Links (excluding phone and email links)
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href^="tel:"]):not([href^="mailto:"])');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileNav && mobileNav.classList.contains('active')) {
                    mobileNav.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    });

    // Handle CTA buttons properly - phone and email should work directly
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the browser handle the tel: link normally
            // Just add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Let the browser handle the mailto: link normally
            // Just add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Sticky Header Effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Basic form validation
            const requiredFields = ['name', 'phone', 'email', 'service'];
            let isValid = true;
            let errorMessage = '';

            // Remove any existing error/success messages
            const existingMessages = contactForm.querySelectorAll('.form-success, .form-error');
            existingMessages.forEach(msg => msg.remove());

            // Validate required fields
            requiredFields.forEach(field => {
                const input = contactForm.querySelector(`[name="${field}"]`);
                if (!formObject[field] || formObject[field].trim() === '') {
                    isValid = false;
                    input.style.borderColor = '#D32F2F';
                } else {
                    input.style.borderColor = '#F5F5F5';
                }
            });

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (formObject.email && !emailRegex.test(formObject.email)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address.';
                const emailInput = contactForm.querySelector('[name="email"]');
                emailInput.style.borderColor = '#D32F2F';
            }

            // Validate phone number (basic Indian phone number validation)
            const phoneRegex = /^(\+91|91)?[6789]\d{9}$/;
            if (formObject.phone && !phoneRegex.test(formObject.phone.replace(/\s+/g, ''))) {
                isValid = false;
                errorMessage = 'Please enter a valid Indian phone number.';
                const phoneInput = contactForm.querySelector('[name="phone"]');
                phoneInput.style.borderColor = '#D32F2F';
            }

            if (!isValid) {
                showMessage(errorMessage || 'Please fill in all required fields correctly.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;

            // Simulate form submission (since we can't actually send emails)
            setTimeout(() => {
                // Create mailto link with form data
                const subject = `AC Service Request - ${formObject.service}`;
                const body = `
Name: ${formObject.name}
Phone: ${formObject.phone}
Email: ${formObject.email}
Service Required: ${formObject.service}
Message: ${formObject.message || 'No additional message'}

This is an automatic message from the Global Tech HVAC Engineers website contact form.
                `.trim();

                const mailtoLink = `mailto:globaltech249@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                
                // Open email client
                window.location.href = mailtoLink;
                
                // Show success message
                showMessage('Thank you for your request! Your email client should open with the details filled in. If it doesn\'t open automatically, please call us at +91 93913 63783.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Reset field borders
                const inputs = contactForm.querySelectorAll('.form-control');
                inputs.forEach(input => {
                    input.style.borderColor = '#F5F5F5';
                });
                
            }, 1500);
        });
    }

    // Show message function
    function showMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-${type}`;
        messageDiv.textContent = message;
        
        // Insert at the top of the form
        contactForm.insertBefore(messageDiv, contactForm.firstChild);
        
        // Remove message after 8 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 8000);
    }

    // Scroll-triggered animations
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.service-card, .review-card, .project-card, .feature-card');
        
        reveals.forEach(element => {
            const windowHeight = window.innerHeight;
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 50;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('reveal');
            }
        });
    }

    // Add CSS for reveal animation and mobile responsiveness
    const style = document.createElement('style');
    style.textContent = `
        .service-card,
        .review-card,
        .project-card,
        .feature-card {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease-out;
        }
        
        .service-card.reveal,
        .review-card.reveal,
        .project-card.reveal,
        .feature-card.reveal {
            opacity: 1;
            transform: translateY(0);
        }

        .header.scrolled {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }

        .nav-link.active {
            color: #0057B7;
        }
        
        .nav-link.active::after {
            width: 100%;
        }

        /* Enhanced mobile menu styles */
        @media (max-width: 768px) {
            .mobile-nav.active {
                display: flex !important;
                animation: slideDown 0.3s ease-out;
            }

            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(7px, 7px);
            }
            
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -7px);
            }
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Initial reveal check
    revealOnScroll();
    
    // Scroll event for animations
    window.addEventListener('scroll', revealOnScroll, { passive: true });

    // Active navigation highlighting
    function highlightActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link[href^="#"], .mobile-nav-link[href^="#"]');
        
        let current = '';
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink, { passive: true });
    highlightActiveNavLink(); // Initial call

    // Image lazy loading enhancement
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // Set initial opacity for smooth fade-in
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
    });

    // CTA Button click effects (excluding phone/email buttons)
    const ctaButtons = document.querySelectorAll('.btn--primary:not([href^="tel:"]):not([href^="mailto:"]), .btn--secondary:not([href^="tel:"]):not([href^="mailto:"])');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = '#0057B7';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = '#F5F5F5';
        });
    });

    // Auto-scroll to contact form if URL has #contact
    if (window.location.hash === '#contact') {
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = contactSection.offsetTop - headerHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }

    // Keyboard navigation accessibility
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu on escape
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    });

    // Performance optimization: Throttle scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Apply throttling to scroll events
    const throttledScroll = throttle(() => {
        handleScroll();
        revealOnScroll();
        highlightActiveNavLink();
    }, 16); // ~60fps

    window.removeEventListener('scroll', handleScroll);
    window.removeEventListener('scroll', revealOnScroll);
    window.removeEventListener('scroll', highlightActiveNavLink);
    window.addEventListener('scroll', throttledScroll, { passive: true });

    // Ensure proper initial state
    setTimeout(() => {
        revealOnScroll();
        highlightActiveNavLink();
    }, 100);

    console.log('Global Tech HVAC Engineers website initialized successfully!');
});