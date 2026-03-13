# FIGMA PLUGIN GUIDE MANAGER

![FIGMA](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![ESLINT](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![Guide Manager](https://github.com/wildiney/Figma-Plugin-Guide-Manager/blob/master/ui-src/assets/cover/plugin-cover.png)

Add guides to the exact positions you want and perform calculations within the input field.

## Features

- **Add Custom Guides**: Create vertical and horizontal guides at precise positions
- **Add Margin Guides**: Automatically create guides for frame margins
- **Clear Guides**: Remove all guides from selected frames with one click
- **Frame Dimensions**: Query width and height of selected frames
- **Grid Calculations**: Built-in support for 8px grid and golden ratio calculations

## API Limitations

### Guide Color Customization

Currently, the Figma Plugin API (v1.0.0) provides read-only properties for guides:

- `axis`: 'X' (vertical) or 'Y' (horizontal) - **read-only**
- `offset`: position in pixels from frame origin - **read-only**

**There is no `color` property** available in the `Guide` interface. This is a platform limitation, not a plugin limitation. Guide colors cannot be customized through the Figma Plugin API at this time.

If you need guide color customization, you can:

1. Submit a feature request to Figma (<https://figma.com/plugin-feedback>)
2. Use alternative approaches such as creating visual guides with shape layers

## Development

### Installation

```bash
npm install
```

### Commands

```bash
# Development mode (type checking, building, and Vite dev server)
npm run dev

# Production build
npm run build

# Type checking
npm run tsc

# Format code
npm run format
```

### Architecture

- **Plugin**: `plugin-src/code.ts` - Handles Figma API interactions
- **UI**: `ui-src/` - React-based interface with accessibility features
- **Build System**: esbuild (plugin) + Vite (UI)
