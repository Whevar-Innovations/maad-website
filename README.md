# MAAD McCann Website

A premium, highly animated web experience for MAAD McCann Uganda, built with React 19, GSAP, and Lenis.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Animations:** [GSAP](https://greensock.com/gsap/) with the `@gsap/react` hook.
- **Smooth Scrolling:** [Lenis](https://lenis.darkroom.engineering/) for kinetic scrolling.
- **Styling:** Vanilla CSS with CSS Modules.
- **Language:** TypeScript.

## 📁 Project Structure

- `src/components/Layout`: Core wrapper managing GSAP/Lenis initialization and global UI (sidebars).
- `src/components/Sections`: Modular page sections (Hero, Value, Services, Footer).
- `src/components/Header`: Fixed navigation with interactive hamburger and contact triggers.
- `src/components/Sidebar`: Animated slide-out menus for navigation and lead generation.
- `src/hooks/useSmoothScroll.ts`: Centralized Lenis initialization logic.

## 🎨 Key Features

- **Split-Screen Layout:** High-impact visual hierarchy matching the MAAD branding.
- **Interactive Sidebars:** GSAP-powered navigation drawers for an immersive experience.
- **Scroll-Triggered Reveals:** Dynamic content loading using GSAP `ScrollTrigger`.
- **Kinetic Smooth Scroll:** Fluid user experience powered by Lenis.

## 🛠️ Development

### Installation

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## 📜 Development Conventions

1. **Animations:** Always use the `useGSAP` hook from `@gsap/react` for better performance and lifecycle management.
2. **Scoping:** Use the `scope` property in `useGSAP` to target elements within component refs.
3. **Styling:** Prefer CSS Modules for component-specific styles and global CSS variables in `src/index.css` for design tokens.
4. **Icons:** Use the SVG sprite system in `public/icons.svg` or high-quality vector paths directly in components.
