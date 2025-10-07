# The Blog Project: Responsive Multipage Website

## Project Overview

This is a complete, responsive, multi-page blog website built using plain HTML, CSS, and JavaScript. The project demonstrates core web development skills including mobile-first design, fluid responsive layouts, code organization, and client-side interactivity.

The site is built around three core content pillars: **Tech for Beginners**, **Lifestyle Focus**, and **Christian Faith**.

## Project Goals & Key Features

* **Multipage Structure:** Features five distinct HTML pages with a consistent global header and footer.
* **Mobile-First Design:** All layouts, including navigation and content grids, are designed to render flawlessly on small screens first, then scale up.
* **Fluid Responsive Layouts:** Includes two major responsive layouts:
    1.  **Two-Column Article View:** The `single-post.html` page uses media queries to switch from a stacked mobile view to a sidebar/content layout on desktop.
    2.  **Magazine Grid View:** The `index.html` features a responsive grid that adjusts from one to three columns based on screen size.
* **Interactivity (JavaScript):** Implements key client-side functionality without reliance on external libraries.

---

## Technical Details

### Code Organization (Best Practices)

To maximize performance, consistency, and maintainability, the project uses a strict, unified file structure:

| Component | Quantity | Reason |
| :--- | :--- | :--- |
| **HTML Files** | 5 | Required to showcase unique layout templates for each major page (e.g., article vs. form). |
| **CSS Files** | 1 (`css/style.css`) | Centralizes all styles and variables into one HTTP request. All page-specific styles are contained within this file, modularized with clear comments. |
| **JavaScript Files** | 1 (`js/script.js`) | Centralizes all interaction logic (Menu & Form Validation), ensuring fast load times. |

### Implemented Functionality

#### 1. Form Validation (`contact.html`)
* Uses vanilla JavaScript to check for required fields and valid email format on submission.
* Provides clear, immediate **visual feedback** (red borders and error messages via the `.error` CSS class) when validation fails, enhancing user experience.

#### 2. Navigation & Aesthetics
* The mobile hamburger menu uses JavaScript to toggle the active state, triggering **smooth CSS transitions** for a professional slide-out effect and an "X" icon transformation.
* Post cards on the home page utilize `box-shadow` and `transform` transitions to create a subtle **"lift" effect** on hover, improving aesthetic appeal.

### Accessibility (A11y)

The site was developed using semantic HTML5 tags and WAI-ARIA attributes to ensure usability for assistive technologies:

* All primary unique content is wrapped in the **`<main>`** tag.
* All images include descriptive **`alt` attributes**.
* The primary navigation uses **`aria-current="page"`** to semantically indicate the active link to screen readers.
* The hamburger button uses an **`aria-label`** for clear purpose declaration.

---

## 🌐 Project Deployment

The final project is successfully deployed and accessible via Netlify.

- **Live URL:** [https://responsive-blogproject.netlify.app/](https://responsive-blogproject.netlify.app/)
- **Deployment Status:** Active (Continuous Deployment enabled via GitHub)