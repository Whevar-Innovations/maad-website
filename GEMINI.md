# MAAD Website

This project is a modern web application built with **React 19**, **TypeScript**, and **Vite 8**. It serves as a foundation for the MAAD website.

## Project Overview

- **Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite 8](https://vite.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** Vanilla CSS (located in `src/App.css` and `src/index.css`)
- **Linting:** [ESLint](https://eslint.org/) with TypeScript and React Hooks support.

## Project Structure

- `src/`: Main source directory.
  - `main.tsx`: Entry point of the application.
  - `App.tsx`: Main application component.
  - `assets/`: Static assets like images and logos.
- `public/`: Public assets served directly (e.g., `favicon.svg`, `icons.svg`).
- `index.html`: Main HTML template.
- `vite.config.ts`: Vite configuration.
- `tsconfig.json`: TypeScript configuration.

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

### Preview

Preview the production build locally:

```bash
npm run preview
```

## Development Conventions

- **Type Safety:** Always use TypeScript for new files and components.
- **Styling:** Prefer keeping styles in `App.css` or component-specific CSS files.
- **Icons:** The project uses an SVG sprite system. Icons are defined in `public/icons.svg` and used via the `<use>` tag in components.
- **Component Structure:** Follow the functional component pattern with React Hooks.
