# MAAD Website

This project is a modern web application built with **React 19**, **TypeScript**, **Vite 8**, **GSAP**, and **Lenis**. It features a premium, animated user experience based on the MAAD McCann design.

## Project Overview

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Animations:** [GSAP](https://greensock.com/gsap/) with ScrollTrigger for smooth, scroll-driven transitions.
- **Scrolling:** [Lenis](https://lenis.darkroom.engineering/) for high-performance kinetic smooth scrolling.
- **Styling:** Vanilla CSS with CSS Modules for scoped, performant styling.

## Project Structure

- `src/`: Main source directory.
  - `components/`: Modular UI components.
    - `Layout/`: Main application wrapper with scroll initialization.
    - `Header/`: Fixed navigation bar.
    - `Sidebar/`: Animated slide-out menus (Left & Right).
    - `Sections/`: Page content blocks (Hero, Value, Services, Footer).
  - `hooks/`: Custom React hooks (e.g., `useSmoothScroll`).
  - `assets/`: Static assets like the MAAD logo.
- `public/`: Public assets served directly.
- `index.html`: Main HTML template.

## Development Conventions

- **Type Safety:** Always use TypeScript for new files and components.
- **Styling:** Use CSS Modules (`*.module.css`) for component-specific styles to avoid global namespace pollution.
- **Animations:** Prefer GSAP for complex transitions and ScrollTrigger for scroll-linked animations.
- **Smooth Scroll:** Lenis is initialized in the `Layout` component via the `useSmoothScroll` hook.
- **Commits:** All commits must follow the convention defined in [COMMIT_STYLE.md](./COMMIT_STYLE.md).

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed.

### Installation

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

### Building

Build the project for production:

```bash
npm run build
```
The output will be in the `dist/` directory.

### Linting

Run ESLint to check for code quality:

```bash
npm run lint
```
