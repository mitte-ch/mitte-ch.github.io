// EmailJS Configuration
// Get your credentials from https://www.emailjs.com/
// 1. Create an account at EmailJS
// 2. Add an Email Service (e.g., Gmail, Outlook)
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{subject}}, {{message}}
// 4. Copy your Public Key from Account > API Keys

const EMAILJS_CONFIG = {
    // Replace these with your actual EmailJS credentials
    PUBLIC_KEY: 'qyOb-GxYxN8STC9J9',      // Found in: Account > API Keys
    SERVICE_ID: 'service_4e21pmj',      // Found in: Email Services > Service ID
    TEMPLATE_ID: 'template_p4qmtkj'     // Found in: Email Templates > Template ID
};

// Initialize EmailJS
(function() {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
})();
