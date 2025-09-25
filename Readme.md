# FlavorFusion: A Multi-Page Food Brand Website

## Project Purpose
This project is a multi-page, responsive website developed for a fictional food brand named "FlavorFusion." The primary goal was to create a clean, modern, and accessible online presence that clearly showcases the brand's identity, menu offerings, and contact information.

## Project Structure and Files

The project follows best practices for file organization and separation of concerns:

| Folder/File | Purpose |
| :--- | :--- |
| `/css/style.css` | **S**tyling. All custom CSS, including responsive design rules (media queries). |
| `/js/main.js` | **J**ava**S**cript. All dynamic client-side scripting. |
| `/images/` | All images (logo, hero, etc.) use **relative paths** like `../images/hero.jpg`. |
| `index.html` | The main **Home Page**. Includes the hero section and brand highlights. |
| `menu.html` | The **Menu Page**. Structured layout for food items and pricing. |
| `contact.html` | The **Contact Page**. Features a contact form and location information. |
| `README.md` | This documentation file. |

## Key Features & Best Practices

1.  **Clean & Modular Code:** HTML, CSS, and JavaScript are separated and well-commented for easy maintenance and readability.
2.  **Meaningful Naming:** Files (`style.css`, `main.js`, `index.html`) and CSS classes (`.main-header`, `.hero-section`) use clear, descriptive names.
3.  **Responsive Design:** Uses a **mobile-first approach** with a major media query at `768px` in `style.css` to ensure perfect display on phones, tablets, and desktops.
4.  **Relative Paths:** All links (navigation, CSS, JS, and image sources) use relative paths (e.g., `href="css/style.css"`) to ensure the site works correctly regardless of the domain name or deployment location.
5.  **Accessibility:** Semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) are used to improve screen reader compatibility.

## Live URL

[**INSERT YOUR DEPLOYED GITHUB PAGES / NETLIFY / VERCEL LINK HERE**]