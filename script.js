// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    const menuLinks = document.querySelectorAll('.nav-links a');
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Language Switcher
const languageBtn = document.getElementById('languageBtn');
const languageMenu = document.getElementById('languageMenu');

if (languageBtn && languageMenu) {
    languageBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        languageMenu.classList.toggle('active');
    });

    // Close language menu when clicking outside
    document.addEventListener('click', () => {
        languageMenu.classList.remove('active');
    });

    // Language selection
    languageMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const lang = e.target.getAttribute('data-lang');
            changeLanguage(lang);
            languageMenu.classList.remove('active');
        });
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Here you would typically send the form data to a server
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show success message
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        const successMsg = translations[currentLang].contact.successMessage;
        alert(successMsg);
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.challenge-card, .service-card, .pillar-item, .tech-category, .stat-card, .mitte-point');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-background');
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Dark Mode Toggle - Initialize immediately for instant theme application
(function() {
    const html = document.documentElement;
    
    // Apply saved theme immediately (before page renders)
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', theme);
    
    // Wait for DOM to be ready for button interaction
    document.addEventListener('DOMContentLoaded', () => {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.querySelector('.theme-icon');
        
        // Update icon based on current theme
        if (themeIcon) {
            const currentTheme = html.getAttribute('data-theme');
            themeIcon.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
        }
        
        // Add click handler
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                if (themeIcon) {
                    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
                }
            });
        }
    });
})();

// Password Generator
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const generateBtn = document.getElementById('generatePassword');
        const passwordInput = document.getElementById('generatedPassword');
        const copyBtn = document.getElementById('copyPassword');
        const lengthSlider = document.getElementById('passwordLength');
        const lengthValue = document.getElementById('lengthValue');
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        const includeUppercase = document.getElementById('includeUppercase');
        const includeLowercase = document.getElementById('includeLowercase');
        const includeNumbers = document.getElementById('includeNumbers');
        const includeSymbols = document.getElementById('includeSymbols');
        
        if (!generateBtn) return; // Exit if not on a page with password generator
        
        const charsets = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
        };
        
        // Update length display
        lengthSlider.addEventListener('input', () => {
            lengthValue.textContent = lengthSlider.value;
        });
        
        // Generate password
        function generatePassword() {
            let charset = '';
            if (includeUppercase.checked) charset += charsets.uppercase;
            if (includeLowercase.checked) charset += charsets.lowercase;
            if (includeNumbers.checked) charset += charsets.numbers;
            if (includeSymbols.checked) charset += charsets.symbols;
            
            if (charset === '') {
                passwordInput.value = 'Select at least one option';
                updateStrength(0);
                return;
            }
            
            const length = parseInt(lengthSlider.value);
            let password = '';
            
            // Use crypto API for better randomness
            const array = new Uint32Array(length);
            window.crypto.getRandomValues(array);
            
            for (let i = 0; i < length; i++) {
                password += charset[array[i] % charset.length];
            }
            
            passwordInput.value = password;
            updateStrength(calculateStrength(password, charset));
        }
        
        // Calculate password strength
        function calculateStrength(password, charset) {
            let score = 0;
            const length = password.length;
            
            // Length score
            if (length >= 8) score += 1;
            if (length >= 12) score += 1;
            if (length >= 16) score += 1;
            if (length >= 24) score += 1;
            
            // Charset diversity score
            if (includeUppercase.checked) score += 1;
            if (includeLowercase.checked) score += 1;
            if (includeNumbers.checked) score += 1;
            if (includeSymbols.checked) score += 1;
            
            return Math.min(score, 8);
        }
        
        // Update strength indicator
        function updateStrength(score) {
            strengthFill.className = 'strength-fill';
            strengthText.className = '';
            
            if (score <= 2) {
                strengthFill.classList.add('weak');
                strengthText.classList.add('weak');
                strengthText.textContent = 'Weak';
            } else if (score <= 4) {
                strengthFill.classList.add('medium');
                strengthText.classList.add('medium');
                strengthText.textContent = 'Medium';
            } else if (score <= 6) {
                strengthFill.classList.add('strong');
                strengthText.classList.add('strong');
                strengthText.textContent = 'Strong';
            } else {
                strengthFill.classList.add('very-strong');
                strengthText.classList.add('very-strong');
                strengthText.textContent = 'Very Strong';
            }
        }
        
        // Copy to clipboard
        copyBtn.addEventListener('click', () => {
            if (passwordInput.value && passwordInput.value !== 'Select at least one option') {
                navigator.clipboard.writeText(passwordInput.value).then(() => {
                    copyBtn.textContent = '✓';
                    copyBtn.classList.add('copied');
                    setTimeout(() => {
                        copyBtn.textContent = '📋';
                        copyBtn.classList.remove('copied');
                    }, 2000);
                });
            }
        });
        
        // Generate button click
        generateBtn.addEventListener('click', generatePassword);
        
        // Generate initial password
        generatePassword();
    });
})();
