document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Dropdown Menu Toggle for Mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // Only handle dropdown toggle on mobile
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const parent = this.parentElement;
                parent.classList.toggle('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for dropdown toggles on desktop
            if (this.classList.contains('dropdown-toggle') && window.innerWidth > 768) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
                
                // Close any open dropdowns on mobile
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });
    });

    // Basic form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('hovered');
            });
            card.addEventListener('mouseleave', function() {
                this.classList.remove('hovered');
            });
        });
    }
    
    // Scroll reveal animation
    function revealOnScroll() {
        const sections = document.querySelectorAll('.about-intro, .mission-section, .team-section, .partners-section, .contact-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('revealed');
            }
        });
    }
    
    // Stats counter animation
    function animateCounters() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            if (!target) return;
            
            const statsSection = document.querySelector('.stats-container');
            const statsSectionTop = statsSection ? statsSection.getBoundingClientRect().top : 0;
            const windowHeight = window.innerHeight;
            
            if (statsSectionTop < windowHeight * 0.8 && !stat.classList.contains('counted')) {
                stat.classList.add('counted');
                
                let count = 0;
                const duration = 2000; // 2 seconds
                const interval = 50; // Update every 50ms
                const steps = duration / interval;
                const increment = target / steps;
                
                const counter = setInterval(() => {
                    count += increment;
                    if (count >= target) {
                        stat.textContent = target;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(count);
                    }
                }, interval);
            }
        });
    }
    
    // Run on page load
    revealOnScroll();
    animateCounters();
    
    // Run on scroll
    window.addEventListener('scroll', function() {
        revealOnScroll();
        animateCounters();
    });
});