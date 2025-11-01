# Rami Khalil Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. This portfolio showcases professional experience, skills, projects, and contact information with a beautiful, interactive design.

## ✨ Features

- **Modern React with TypeScript** - Type-safe development with latest React features
- **Dark/Light Theme Toggle** - Seamless theme switching with localStorage persistence
- **Scroll Progress Indicator** - Visual progress bar showing scroll position
- **Back to Top Button** - Smooth scrolling navigation aid
- **Particle Background** - Animated background particles for visual appeal
- **Animated Timeline** - Interactive experience section with timeline animation
- **Responsive Design** - Mobile-first approach with perfect responsiveness
- **Smooth Animations** - Framer Motion powered animations and transitions
- **Professional Sections** - About, Skills, Education, Experience, Projects, Contact
- **Performance Optimized** - Fast loading with Vite bundler

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd "Rami Khalil Portfolio Website"

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

# Rami Khalil Portfolio Website

A modern React TypeScript portfolio website built with Vite, featuring dark/light theme toggle, particle animations, and responsive design.

## Live Website
🚀 [View Live Portfolio](https://ramikhalil1.github.io/Rami-Khalil-Portfolio-Website/)

## Features
- Modern React with TypeScript and hooks
- Dark/light theme toggle with localStorage persistence
- Particle background animation system
- Scroll progress indicator
- Back to top button with smooth scrolling
- Animated timeline for experience section
- Responsive design for all devices
- Professional portfolio sections (About, Skills, Education, Experience, Projects, Contact)

## Tech Stack
- React 18 + TypeScript
- Vite build tool
- CSS modules for styling
- React Icons
- Modern ES6+ features

## Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Deployment
Automatically deployed to GitHub Pages via GitHub Actions on every push to main branch.

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** CSS3 with CSS Variables
- **Icons:** React Icons
- **Animations:** Framer Motion
- **Fonts:** Google Fonts (Inter)

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:

- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎨 Theme System

The portfolio features a dynamic theme system with:

- Dark theme (default)
- Light theme
- Smooth transitions between themes
- CSS custom properties for easy customization
- localStorage persistence

## 📂 Project Structure

```
src/
├── components/          # React components
│   ├── Navigation/      # Navigation bar
│   ├── Hero/           # Hero section
│   ├── ScrollProgress/ # Scroll indicator
│   └── BackToTop/      # Back to top button
├── hooks/              # Custom React hooks
│   ├── useTheme.ts     # Theme management
│   ├── useScrollProgress.ts # Scroll tracking
│   └── useBackToTop.ts # Back to top logic
├── styles/             # Global styles
│   └── globals.css     # CSS variables and utilities
└── App.tsx            # Main application component
```

## 🚧 Development Status

This is the initial setup with core components implemented. Additional sections will be added:

- [ ] Complete About section
- [ ] Skills & Technologies grid
- [ ] Education timeline
- [ ] Experience with animated timeline
- [ ] Projects showcase
- [ ] Contact form with validation
- [ ] Particle background system
- [ ] Advanced animations

## 🤝 Contributing

This is a personal portfolio project. If you'd like to use this as a template for your own portfolio, feel free to fork and customize it!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
