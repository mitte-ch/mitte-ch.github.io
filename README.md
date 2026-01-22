# Cloud Consulting Website

A modern, responsive website template inspired by professional cloud consulting services.

## Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean and professional design with smooth animations
- **Easy to Customize**: Well-organized HTML structure and CSS variables for easy customization
- **Multi-language Support**: English and Spanish translations built-in
- **Blog System**: Full-featured blog with article templates
- **Sections Include**:
  - Navigation with dropdown menus
  - Hero section with call-to-action
  - Mitte concept explanation
  - Mission statement and pillars
  - Challenges showcase
  - Services overview
  - Technologies section
  - Blog with filtering
  - About section with stats
  - Contact form
  - Footer

## How to Customize

### 1. Edit Text Content

Open `index.html` and find the sections you want to modify:

- **Company Name**: Search for `Mitte-ch` in the logo section
- **Hero Title**: Look for `<h1 class="hero-title">`
- **Services**: Find the `.service-card` divs in the services section
- **Contact Info**: Update the footer section

### 2. Change Colors

Open `styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #0066cc;     /* Main brand color */
    --secondary-color: #00457c;   /* Secondary brand color */
    --accent: #00a8ff;            /* Accent color */
    /* ... other colors */
}
```

### 3. Add Images

To add background images or photos:

1. Create an `images` folder in the project directory
2. Add your images to this folder
3. Update the CSS or HTML to reference your images:

```css
.hero-background {
    background-image: url('images/your-image.jpg');
}
```

### 4. Customize Badges/Pills

In the hero section, edit the badge content:

```html
<span class="badge">YOUR TEXT HERE</span>
```

### 5. Modify Services

Edit the services in the `services-section`:

```html
<div class="service-card">
    <h3>Your Service Name</h3>
    <p>Your service description here...</p>
</div>
```

### 6. Update Navigation

Modify menu items in the `nav-links` section:

```html
<li><a href="#your-section">YOUR MENU ITEM</a></li>
```

## File Structure

```
├── index.html                    # Main landing page
├── blog.html                     # Blog listing page
├── blog-article-template.html    # Template for writing blog articles
├── styles.css                    # All styling (including blog styles)
├── script.js                     # JavaScript functionality
├── translations.js               # Multi-language support
└── README.md                     # This file
```

## Usage

1. Open `index.html` in a web browser to view the site
2. Edit the files using any text editor or IDE
3. Refresh the browser to see your changes

## Blog System

### Creating a New Blog Article

1. **Copy the Template**
   ```bash
   cp blog-article-template.html my-new-article.html
   ```

2. **Update the Article**
   - Change the `<title>` tag in the `<head>` section
   - Update the `.article-category` (e.g., "Cloud Architecture", "DevOps", "Security")
   - Update the `.article-title` with your article title
   - Update the `.article-meta` with publish date and author
   - Replace the template content with your article
   - Update tags at the bottom

3. **Add to Blog Listing**
   - Open `blog.html`
   - Copy one of the existing `.blog-card` elements
   - Update the content with your article information
   - Set the correct `data-category` attribute for filtering
   - Link to your new article file

### Blog Article Formatting

The template supports these elements:

- **Headings**: Use `<h2>` for main sections, `<h3>` for subsections
- **Paragraphs**: Standard `<p>` tags
- **Lists**: Use `<ul>` or `<ol>` for bullet/numbered lists
- **Code**: Use `<code>` for inline code, `<pre><code>` for code blocks
- **Quotes**: Use `<blockquote>` for important quotes or callouts
- **Images**: Use `<img>` tags (recommended to create an `images/` folder)

### Blog Filtering

The blog page includes category filters:
- All Posts
- Cloud Architecture
- DevOps
- Security
- Kubernetes
- AI & ML

To add new categories, update the filter buttons in `blog.html` and add corresponding `data-category` attributes to articles.

## Form Functionality

The contact form currently shows an alert on submission. To make it functional:

1. Set up a backend server to handle form submissions
2. Or use a service like Formspree, EmailJS, or Netlify Forms
3. Update the form submission handler in `script.js`

## Multi-language Support

The site supports English and Spanish:

1. All text content is in `translations.js`
2. Update translations in both `en` and `es` objects
3. Use `data-i18n` attributes in HTML to reference translation keys
4. Users can switch languages using the language switcher in the navigation

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips for Customization

- Use the browser's developer tools (F12) to experiment with styles
- Keep backups of your files before making major changes
- Test on different screen sizes using responsive design mode
- Optimize images before adding them to keep the site fast

## License

Feel free to use and modify this template for your projects.
