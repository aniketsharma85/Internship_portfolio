# Aniket Sharma — 3D Interactive Portfolio

A modern, high-performance personal portfolio website built with semantic HTML5, modern CSS3 (Glassmorphism & Neumorphism), JavaScript (ES6+), and an interactive **Three.js 3D Background Engine**.

---

## 🌟 Highlights & Features

- **Professional 3D WebGL Background (`three-bg.js`)**:
  - Calm, ambient 3D particle constellation with executive color blending.
  - Subtle architectural 3D wave plane providing depth at the bottom horizon.
  - Smooth, serene mouse parallax with gentle inertia.
  - Distraction-free, clean, corporate-grade aesthetic prioritizing content readability.

- **Micro-Interactions & Hover Effects (`style.css`, `script.js`)**:
  - **3D Tilt Physics**: Cards tilt dynamically in 3D perspective (`rotateX` / `rotateY`) based on exact cursor coordinates.
  - **Dynamic Card Spotlight**: Radial light beam illuminates card borders and glass textures on hover.
  - **Magnetic Buttons**: Call-to-action buttons smoothly respond to your cursor.
  - **Clean OS Cursor**: Fast, natural, distraction-free native pointer.
  - **Dynamic Typewriter**: Continuously cycles through skills and titles.
  - **Skill Pills & Badges**: Neon hover transforms and micro-lift physics.

- **Embedded Live Interactive Modals**:
  - 🧮 **Live Interactive Calculator**: Fully functional digital calculator with keyboard support, error handling, and clean arithmetic parsing.
  - 📈 **Zerodha UI Clone Showcase**: Browser mockup previewing the fintech landing page layout.
  - 📄 **Digital Resume Modal**: Clean printable view of your complete CV with one-click "Print / Save PDF" support.

- **Complete Resume Sections**:
  - Hero & Introduction with direct contact badges
  - About Me & Career Objective
  - Categorized Technical Arsenal (Languages, Web, Database, Tools, Soft Skills)
  - Projects & CodSoft Virtual Internship Showcase with category filtering
  - Academic Timeline (B.Tech CSE at CSJMU, Class XII & Class X at HAL Vidyalaya)
  - Awards & Honours (School Rank 3, Brain of Brain State Silver Topper, CodSoft Certificate)
  - Interactive Contact Form & Direct Contact Channels

---

## 📁 File Structure

```text
.portfolio/
├── index.html       # Semantic HTML5 markup, structured resume sections, & modals
├── style.css        # Responsive dark glassmorphism styling, hover effects, & animations
├── three-bg.js      # Three.js 3D constellation & floating wireframe mesh engine
├── script.js        # Micro-interactions, tilt physics, calculator logic, & modals
└── README.md        # Documentation & deployment guide
```

---

## 🚀 How to Run & Preview

1. **Directly in Browser**:
   - Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Firefox, or any modern web browser.

2. **Using VS Code Live Server**:
   - Open this folder in VS Code.
   - Right-click `index.html` and select **"Open with Live Server"**.

3. **Deploy to GitHub Pages (Free)**:
   - Initialize a git repository: `git init`
   - Link to your remote GitHub repo: `git remote add origin https://github.com/aniketsharma85/<your-repo-name>.git`
   - Commit and push to your GitHub repository: `git add . && git commit -m "Initial commit" && git push -u origin main`
   - In GitHub repository settings -> **Pages** -> Set Branch to `main` / `root` -> Click Save.
   - Your portfolio will be live at `https://aniketsharma85.github.io/<your-repo-name>/`.
