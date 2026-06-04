# Project: Japan Polar (Polarsteps Clone)

A read-only web application that clones the Polarsteps travel experience using static data extracts.

## Project Overview

- **Purpose:** To display travel data (steps, photos, videos, maps) in an interactive, synchronized web interface.
- **Frontend Stack:** React 18, TypeScript, Vite.
- **UI Framework:** [PicoCSS](https://picocss.com/) for lightweight, semantic styling.
- **Mapping:** Leaflet via `react-leaflet`.
- **Data Source:** Static JSON extracts and media files stored in the `trip/` and `user/` directories at the root, which are copied to `web-app/public/` during deployment.
- **Media Management:** Uses Git LFS for images. A custom script generates a `media-manifest.json` and thumbnails.

## Architecture

- **Static Data Driven:** The application fetches data from `public/trip/` and `public/user/`.
- **Synchronized UI:** The `MapComponent` and `Timeline` are kept in sync via shared state (`activeStepId`) in `App.tsx`.
- **Data Fetching:** Handled by `src/services/dataService.ts`, which normalizes paths and loads the manifest.
- **Responsive Design:** Utilizes PicoCSS and custom CSS for a mobile-friendly layout.

## Building and Running

All commands should be run from the `web-app/` directory.

- **Install Dependencies:**
  ```bash
  npm install
  ```
- **Development Server:**
  ```bash
  npm run dev
  ```
- **Production Build:**
  ```bash
  npm run build
  ```
- **Generate Media Manifest:**
  Generates `public/media-manifest.json` and creates thumbnails for new photos using `sharp`.
  ```bash
  node scripts/generate-manifest.cjs
  ```

## Development Conventions

- **Principles:** Adheres to SOLID, SRP (Single Responsibility Principle), and DRY (Don't Repeat Yourself).
- **TypeScript:** Strict typing is preferred. Interfaces for data models are located in `src/types/polarsteps.ts`.
- **Components:** Functional components with React Hooks.
- **Styles:** Prefer semantic HTML and PicoCSS classes. Custom styles reside in sibling `.css` files.
- **Git LFS:** Image files (`.jpg`) are managed via Git LFS. Ensure `lfs: true` is set in CI/CD workflows (like `.github/workflows/deploy.yml`).
- **Media Extensions:** Standardize on `.jpg` for images and `_thumb.jpg` for thumbnails.

## Deployment

- **Platform:** GitHub Pages (at `https://kugeleis.github.io/japan-polar/`).
- **Workflow:** `.github/workflows/deploy.yml` automates the process:
  1. Checks out code (with LFS).
  2. Copies `trip/` and `user/` to `web-app/public/`.
  3. Runs `generate-manifest.cjs`.
  4. Builds the React app.
  5. Deploys the `dist/` folder to the `gh-pages` branch.
