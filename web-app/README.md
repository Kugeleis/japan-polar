# Polarsteps Clone

A clean, read-only web application that clones the Polarsteps travel experience using a static data extract. This project allows you to revisit your travels with an interactive map and a synchronized timeline of your steps, including photos, videos, and weather data.

## Features

- **Interactive Map:** A Leaflet-powered map displaying your full route and step markers, with localized (Western) place names.
- **Synchronized Timeline:** A scrollable list of steps that stays in sync with the map. Clicking a marker scrolls the timeline, and vice versa.
- **Media Gallery:** Beautifully displayed photo and video galleries for every step.
- **Static & Fast:** Built as a modern SPA that consumes static JSON and media files, making it easy to host anywhere.

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Map:** Leaflet & React-Leaflet
- **Styling:** CSS Modules (Modern & Clean)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [npm](https://www.npmjs.com/)

### Installation

1. Navigate to the web-app directory:

   ```bash
   cd web-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Data Preparation

This app relies on a `media-manifest.json` file in the `public/` directory to index your photos and videos. If you add new media or change the data extract structure, regenerate the manifest:

```bash
node scripts/generate-manifest.cjs
```

### Development

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

To compile the application for production:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to be served by any static web server (GitHub Pages, Vercel, Netlify, etc.).

## Project Structure

- `src/components/`: Modular React components (Map, Timeline, MediaGallery).
- `src/hooks/`: Custom React hooks for data management.
- `src/services/`: Data fetching and normalization logic.
- `public/`: The static asset folder containing your Polarsteps `trip/` and `user/` data.
- `scripts/`: Build-time utilities like the media manifest generator.

## Principles

This project adheres to **SOLID**, **SRP**, and **DRY** principles to ensure the codebase remains clean, maintainable, and easy to extend.
