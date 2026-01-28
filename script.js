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

// Form submission with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const currentLang = localStorage.getItem('preferredLanguage') || 'en';

        // Check if EmailJS is configured
        if (typeof EMAILJS_CONFIG === 'undefined' ||
            EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY' ||
            EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' ||
            EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
            showFormStatus('error', translations[currentLang].contact.configError || 'EmailJS not configured. Please set up your credentials.');
            return;
        }

        // Get form values
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = translations[currentLang].contact.sending || 'Sending...';
        formStatus.className = 'form-status';
        formStatus.textContent = '';

        try {
            // Send email via EmailJS
            await emailjs.send(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                templateParams
            );

            // Success
            showFormStatus('success', translations[currentLang].contact.successMessage);
            contactForm.reset();

        } catch (error) {
            // Error
            console.error('EmailJS Error:', error);
            showFormStatus('error', translations[currentLang].contact.errorMessage || 'Failed to send message. Please try again.');
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = translations[currentLang].contact.sendButton;
        }
    });

    function showFormStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;

        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                formStatus.className = 'form-status';
                formStatus.textContent = '';
            }, 5000);
        }
    }
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
(function () {
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
(function () {
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

// IP Subnet Calculator
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const calculateBtn = document.getElementById('calculateSubnet');
        const ipInput = document.getElementById('ipAddress');
        const netmaskInput = document.getElementById('netmask');

        if (!calculateBtn) return; // Exit if not on a page with IP calculator

        // Helper function to convert IP to binary string
        function ipToBinary(ip) {
            return ip.split('.').map(octet => {
                return parseInt(octet).toString(2).padStart(8, '0');
            }).join('.');
        }

        // Helper function to convert binary to IP
        function binaryToIp(binary) {
            return binary.split('.').map(octet => {
                return parseInt(octet, 2);
            }).join('.');
        }

        // Helper function to convert CIDR to netmask
        function cidrToNetmask(cidr) {
            const mask = [];
            for (let i = 0; i < 4; i++) {
                const n = Math.min(cidr, 8);
                mask.push(256 - Math.pow(2, 8 - n));
                cidr -= n;
            }
            return mask.join('.');
        }

        // Helper function to convert netmask to CIDR
        function netmaskToCidr(netmask) {
            return netmask.split('.').map(octet => {
                return parseInt(octet).toString(2);
            }).join('').split('1').length - 1;
        }

        // Validate IP address
        function isValidIp(ip) {
            const parts = ip.split('.');
            if (parts.length !== 4) return false;
            return parts.every(part => {
                const num = parseInt(part);
                return num >= 0 && num <= 255 && part === num.toString();
            });
        }

        // Validate netmask
        function isValidNetmask(netmask) {
            if (!isValidIp(netmask)) return false;
            const binary = netmask.split('.').map(octet => {
                return parseInt(octet).toString(2).padStart(8, '0');
            }).join('');
            // Check if it's a valid netmask (all 1s followed by all 0s)
            return /^1*0*$/.test(binary);
        }

        // Get IP class
        function getIpClass(ip) {
            const firstOctet = parseInt(ip.split('.')[0]);
            if (firstOctet >= 1 && firstOctet <= 126) return 'A';
            if (firstOctet >= 128 && firstOctet <= 191) return 'B';
            if (firstOctet >= 192 && firstOctet <= 223) return 'C';
            if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
            if (firstOctet >= 240 && firstOctet <= 255) return 'E (Reserved)';
            return 'Unknown';
        }

        // Check if IP is private
        function isPrivateIp(ip) {
            const parts = ip.split('.').map(p => parseInt(p));
            if (parts[0] === 10) return true;
            if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) return true;
            if (parts[0] === 192 && parts[1] === 168) return true;
            return false;
        }

        // Calculate subnet information
        function calculateSubnet() {
            let ip = ipInput.value.trim();
            let netmaskStr = netmaskInput.value.trim();

            // Validate IP
            if (!isValidIp(ip)) {
                alert('Invalid IP address');
                return;
            }

            // Parse netmask (support both CIDR and dotted decimal)
            let netmask;
            if (netmaskStr.startsWith('/')) {
                const cidr = parseInt(netmaskStr.substring(1));
                if (cidr < 0 || cidr > 32) {
                    alert('Invalid CIDR notation (must be /0 to /32)');
                    return;
                }
                netmask = cidrToNetmask(cidr);
            } else if (netmaskStr.match(/^\d+$/)) {
                const cidr = parseInt(netmaskStr);
                if (cidr < 0 || cidr > 32) {
                    alert('Invalid CIDR notation (must be 0 to 32)');
                    return;
                }
                netmask = cidrToNetmask(cidr);
            } else {
                netmask = netmaskStr;
                if (!isValidNetmask(netmask)) {
                    alert('Invalid netmask');
                    return;
                }
            }

            const cidr = netmaskToCidr(netmask);

            // Convert to binary
            const ipBinary = ipToBinary(ip);
            const netmaskBinary = ipToBinary(netmask);

            // Calculate wildcard
            const wildcardParts = netmask.split('.').map(octet => 255 - parseInt(octet));
            const wildcard = wildcardParts.join('.');
            const wildcardBinary = ipToBinary(wildcard);

            // Calculate network address
            const ipParts = ip.split('.').map(p => parseInt(p));
            const netmaskParts = netmask.split('.').map(p => parseInt(p));
            const networkParts = ipParts.map((part, i) => part & netmaskParts[i]);
            const network = networkParts.join('.');
            const networkBinary = ipToBinary(network);

            // Calculate broadcast address
            const broadcastParts = networkParts.map((part, i) => part | wildcardParts[i]);
            const broadcast = broadcastParts.join('.');
            const broadcastBinary = ipToBinary(broadcast);

            // Calculate host range
            const hostMinParts = [...networkParts];
            hostMinParts[3] += 1;
            const hostMin = hostMinParts.join('.');
            const hostMinBinary = ipToBinary(hostMin);

            const hostMaxParts = [...broadcastParts];
            hostMaxParts[3] -= 1;
            const hostMax = hostMaxParts.join('.');
            const hostMaxBinary = ipToBinary(hostMax);

            // Calculate number of hosts
            const numHosts = Math.pow(2, 32 - cidr) - 2;

            // Get IP class
            const ipClass = getIpClass(ip);
            const isPrivate = isPrivateIp(ip);

            // Display results
            document.getElementById('resultAddress').textContent = ip;
            document.getElementById('resultAddressBinary').textContent = ipBinary;

            document.getElementById('resultNetmask').textContent = `${netmask} = ${cidr}`;
            document.getElementById('resultNetmaskBinary').textContent = netmaskBinary;

            document.getElementById('resultWildcard').textContent = wildcard;
            document.getElementById('resultWildcardBinary').textContent = wildcardBinary;

            document.getElementById('resultNetwork').textContent = `${network}/${cidr}`;
            document.getElementById('resultNetworkBinary').textContent = networkBinary;

            document.getElementById('resultBroadcast').textContent = broadcast;
            document.getElementById('resultBroadcastBinary').textContent = broadcastBinary;

            document.getElementById('resultHostMin').textContent = hostMin;
            document.getElementById('resultHostMinBinary').textContent = hostMinBinary;

            document.getElementById('resultHostMax').textContent = hostMax;
            document.getElementById('resultHostMaxBinary').textContent = hostMaxBinary;

            document.getElementById('resultHostsNet').textContent = numHosts >= 0 ? numHosts : 0;

            const classText = isPrivate ? `${ipClass} (Private Internet)` : ipClass;
            document.getElementById('resultClass').textContent = classText;
        }

        // Calculate button click
        calculateBtn.addEventListener('click', calculateSubnet);

        // Calculate on Enter key
        ipInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') calculateSubnet();
        });
        netmaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') calculateSubnet();
        });

        // Calculate initial values
        calculateSubnet();
    });
})();

// Base64 Encoder/Decoder
(function () {
    document.addEventListener('DOMContentLoaded', () => {
        const encodeTab = document.getElementById('encodeTab');
        const decodeTab = document.getElementById('decodeTab');
        const encodeSection = document.getElementById('encodeSection');
        const decodeSection = document.getElementById('decodeSection');

        const encodeInput = document.getElementById('encodeInput');
        const encodeOutput = document.getElementById('encodeOutput');
        const encodeBtn = document.getElementById('encodeBtn');
        const clearEncodeBtn = document.getElementById('clearEncodeBtn');
        const copyEncodeBtn = document.getElementById('copyEncodeBtn');

        const decodeInput = document.getElementById('decodeInput');
        const decodeOutput = document.getElementById('decodeOutput');
        const decodeBtn = document.getElementById('decodeBtn');
        const clearDecodeBtn = document.getElementById('clearDecodeBtn');
        const copyDecodeBtn = document.getElementById('copyDecodeBtn');

        if (!encodeTab) return; // Exit if not on a page with Base64 tool

        // Tab switching
        encodeTab.addEventListener('click', () => {
            encodeTab.classList.add('active');
            decodeTab.classList.remove('active');
            encodeSection.classList.remove('hidden');
            decodeSection.classList.add('hidden');
        });

        decodeTab.addEventListener('click', () => {
            decodeTab.classList.add('active');
            encodeTab.classList.remove('active');
            decodeSection.classList.remove('hidden');
            encodeSection.classList.add('hidden');
        });

        // Encode function
        function encodeToBase64() {
            const text = encodeInput.value;
            if (!text) {
                encodeOutput.value = '';
                return;
            }

            try {
                // Use btoa for encoding, but handle Unicode properly
                const encoded = btoa(unescape(encodeURIComponent(text)));
                encodeOutput.value = encoded;
            } catch (error) {
                alert('Error encoding text: ' + error.message);
            }
        }

        // Decode function
        function decodeFromBase64() {
            const base64 = decodeInput.value.trim();
            if (!base64) {
                decodeOutput.value = '';
                return;
            }

            try {
                // Use atob for decoding, but handle Unicode properly
                const decoded = decodeURIComponent(escape(atob(base64)));
                decodeOutput.value = decoded;
            } catch (error) {
                alert('Error decoding Base64: Invalid Base64 string');
            }
        }

        // Copy to clipboard function
        function copyToClipboard(text, button) {
            if (!text) return;

            navigator.clipboard.writeText(text).then(() => {
                const originalText = button.textContent;
                button.textContent = '✓';
                button.classList.add('copied');
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                alert('Failed to copy to clipboard');
            });
        }

        // Event listeners
        encodeBtn.addEventListener('click', encodeToBase64);
        decodeBtn.addEventListener('click', decodeFromBase64);

        clearEncodeBtn.addEventListener('click', () => {
            encodeInput.value = '';
            encodeOutput.value = '';
        });

        clearDecodeBtn.addEventListener('click', () => {
            decodeInput.value = '';
            decodeOutput.value = '';
        });

        copyEncodeBtn.addEventListener('click', () => {
            copyToClipboard(encodeOutput.value, copyEncodeBtn);
        });

        copyDecodeBtn.addEventListener('click', () => {
            copyToClipboard(decodeOutput.value, copyDecodeBtn);
        });
    });
})();
