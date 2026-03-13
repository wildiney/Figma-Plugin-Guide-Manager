# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Figma plugin for managing guides on design frames. It has two main components:

- **Plugin code** (`plugin-src/code.ts`): Handles Figma API interactions and frame guide operations
- **UI** (`ui-src/`): React-based UI that communicates with the plugin via postMessage

## Build and Development Commands

```bash
# Development mode - runs type checking, building, and Vite dev server concurrently
npm run dev

# Production build
npm run build

# Watch mode for development
npm run build:watch

# Type checking
npm run tsc                # Check both plugin and UI
npm run tsc:main          # Check only plugin code
npm run tsc:ui            # Check only UI code
npm run tsc:watch         # Watch mode for type checking

# Code formatting
npm run format            # Format all files with Prettier

# Individual build commands
npm run build:main        # Build plugin code only
npm run build:ui          # Build UI only
```

## Architecture

### Directory Structure

- `plugin-src/` - Figma plugin code (TypeScript, compiled to dist/code.js)
- `ui-src/` - React UI application (compiled to dist/index.html via Vite)
- `dist/` - Output directory for both plugin code and UI
- `ui-src/_components/` - React components (Buttons, Alerts, Footer, Titles)
- `ui-src/assets/` - SVG icons and images

### Communication Flow

1. User interacts with React UI in `ui-src/App.tsx`
2. UI sends messages via `parent.postMessage()` with `pluginMessage` structure
3. Plugin code listens for messages via `figma.ui.onmessage`
4. Plugin modifies frames/guides via Figma API
5. Plugin sends feedback to UI via `figma.ui.postMessage()`

### Key Message Types (plugin-src/code.ts)

- `add-guide`: Add a guide at specified axis/offset
- `add-margins`: Create guides for frame margins
- `clearAllGuides`: Remove all guides from selected frames
- `frameWidth`/`frameHeight`: Query frame dimensions
- `selectionchange`: Notification when selection changes

### Build Output

- `dist/code.js` - Compiled plugin code (via esbuild)
- `dist/index.html` - Single-file bundled UI (via Vite with vite-plugin-singlefile)

The Vite config uses `viteSingleFile` to inline all assets and CSS into a single HTML file, which is required by Figma's plugin format.

## Technology Stack

- **Plugin**: TypeScript, esbuild
- **UI**: React 18, Vite, CSS Modules
- **Development**: TypeScript compiler, Prettier, concurrently
- **Icons**: Custom React components (SVG)
